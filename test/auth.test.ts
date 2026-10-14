import { afterEach, describe, expect, it, vi } from 'vitest';

import { Login } from '../src/auth';
import { LynxClient } from '../src/client';
import { HTTPError } from '../src/util';

const baseUrl = 'https://lynx.example.com';

afterEach(() => {
    vi.unstubAllGlobals();
});

function stubFetch(status: number, body: unknown) {
    const captured: { input?: RequestInfo | URL; options?: RequestInit } = {};
    vi.stubGlobal(
        'fetch',
        vi.fn(async (input: RequestInfo | URL, options?: RequestInit) => {
            captured.input = input;
            captured.options = options;
            return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
        }),
    );
    return captured;
}

describe('Login', () => {
    it('encodes UTF-8 credentials in the Basic Auth header', async () => {
        let requestOptions: RequestInit | undefined;
        const requestJson = vi.fn(async (_endpoint: string, options?: RequestInit) => {
            requestOptions = options;
            return { token: 'token' };
        });
        const client = { requestJson } as unknown as LynxClient;

        await Login.call(client, 'å', 'päss');

        expect(requestOptions?.headers).toEqual({
            Authorization: 'Basic w6U6cMOkc3M=',
        });
    });
});

describe('Login challenge', () => {
    it('returns the challenge step when TOTP is required', async () => {
        stubFetch(200, { token: 'challenge-token', next_step: 'challenge', method: 'totp' });
        const client = new LynxClient(baseUrl);

        await expect(client.login('user', 'password')).resolves.toEqual({
            token: 'challenge-token',
            next_step: 'challenge',
            method: 'totp',
        });
    });

    it('sends the TOTP or backup code with the challenge token', async () => {
        const captured = stubFetch(200, { token: 'session-token' });
        const client = new LynxClient(baseUrl);

        await expect(client.login2fa('challenge-token', '012345')).resolves.toEqual({ token: 'session-token' });

        expect(captured.input).toBe(`${baseUrl}/api/v2/auth`);
        expect(captured.options?.method).toBe('PUT');
        expect(captured.options?.body).toBe(JSON.stringify({ challenge: '012345' }));
        expect(new Headers(captured.options?.headers).get('X-API-Key')).toBe('challenge-token');
    });
});

describe('TOTP', () => {
    const enrollUrl = `${baseUrl}/api/v2/auth/totp/enroll`;

    it('starts enrollment with the current password', async () => {
        const response = { secret: 'secret', url: 'otpauth://totp/account' };
        const captured = stubFetch(200, response);
        const client = new LynxClient(baseUrl, 'api-token');

        await expect(client.enrollTOTP('current-password')).resolves.toEqual(response);

        expect(captured.input).toBe(enrollUrl);
        expect(captured.options?.method).toBe('POST');
        expect(captured.options?.body).toBe(JSON.stringify({ password: 'current-password' }));
        expect(new Headers(captured.options?.headers).get('Content-Type')).toBe('application/json');
        expect(new Headers(captured.options?.headers).get('X-API-Key')).toBe('api-token');
    });

    it('confirms enrollment with the authenticator code', async () => {
        const response = { backupCodes: ['backup-code'] };
        const captured = stubFetch(200, response);
        const client = new LynxClient(baseUrl, 'api-token');

        await expect(client.confirmTOTPEnrollment('012345')).resolves.toEqual(response);

        expect(captured.input).toBe(enrollUrl);
        expect(captured.options?.method).toBe('PUT');
        expect(captured.options?.body).toBe(JSON.stringify({ code: '012345' }));
        expect(new Headers(captured.options?.headers).get('Content-Type')).toBe('application/json');
        expect(new Headers(captured.options?.headers).get('X-API-Key')).toBe('api-token');
    });

    it.each([
        ['totp_setup_expired', 'totp enrollment expired'],
        ['totp_no_pending_setup', 'no pending totp enrollment'],
        ['totp_invalid_code', 'invalid totp code'],
    ])('throws HTTPError carrying %s when confirmation fails', async (reason, message) => {
        stubFetch(400, { message, reason });
        const client = new LynxClient(baseUrl, 'api-token');

        const error = await client.confirmTOTPEnrollment('000000').then(
            () => undefined,
            (e: unknown) => e,
        );

        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toMatchObject({ status: 400, body: { reason } });
    });

    it('throws HTTPError when enrollment password is rejected', async () => {
        stubFetch(401, { message: 'unauthorized' });
        const client = new LynxClient(baseUrl, 'api-token');

        const error = await client.enrollTOTP('wrong-password').then(
            () => undefined,
            (e: unknown) => e,
        );

        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toMatchObject({ status: 401 });
    });

    it('throws HTTPError when enrolling while TOTP is already enabled', async () => {
        stubFetch(409, { message: 'totp already enabled' });
        const client = new LynxClient(baseUrl, 'api-token');

        const error = await client.enrollTOTP('current-password').then(
            () => undefined,
            (e: unknown) => e,
        );

        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toMatchObject({ status: 409 });
    });

    it('throws HTTPError when confirming while TOTP is already enabled', async () => {
        stubFetch(409, { message: 'totp already enabled' });
        const client = new LynxClient(baseUrl, 'api-token');

        const error = await client.confirmTOTPEnrollment('012345').then(
            () => undefined,
            (e: unknown) => e,
        );

        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toMatchObject({ status: 409 });
    });

    it('reads status from the status endpoint', async () => {
        const response = { enabled: true, enrolled_at: '2026-10-01T12:00:00Z' };
        const captured = stubFetch(200, response);
        const client = new LynxClient(baseUrl, 'api-token');

        await expect(client.getTOTPStatus()).resolves.toEqual(response);

        expect(captured.input).toBe(`${baseUrl}/api/v2/auth/totp/status`);
        expect(captured.options?.method).toBe('GET');
        expect(new Headers(captured.options?.headers).get('X-API-Key')).toBe('api-token');
    });

    it('disables TOTP with password and second factor and resolves null on 204', async () => {
        const fetchMock = vi.fn(async (_input: RequestInfo | URL, _options?: RequestInit) => new Response(null, { status: 204 }));
        vi.stubGlobal('fetch', fetchMock);
        const client = new LynxClient(baseUrl, 'api-token');

        await expect(client.disableTOTP('current-password', '012345')).resolves.toBeNull();

        const [input, options] = fetchMock.mock.calls[0] ?? [];
        expect(input).toBe(`${baseUrl}/api/v2/auth/totp`);
        expect(options?.method).toBe('DELETE');
        expect(options?.body).toBe(JSON.stringify({ password: 'current-password', code: '012345' }));
        expect(new Headers(options?.headers).get('Content-Type')).toBe('application/json');
        expect(new Headers(options?.headers).get('X-API-Key')).toBe('api-token');
    });

    it('throws HTTPError when the password or second factor is rejected', async () => {
        stubFetch(401, { message: 'unauthorized' });
        const client = new LynxClient(baseUrl, 'api-token');

        const error = await client.disableTOTP('wrong-password', '000000').then(
            () => undefined,
            (e: unknown) => e,
        );

        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toMatchObject({ status: 401 });
    });

    it('returns enabled false when TOTP is not enabled', async () => {
        stubFetch(200, { enabled: false });
        const client = new LynxClient(baseUrl, 'api-token');

        await expect(client.getTOTPStatus()).resolves.toEqual({ enabled: false });
    });

    it('throws HTTPError when disabling TOTP that is not enabled', async () => {
        stubFetch(404, { message: 'not found' });
        const client = new LynxClient(baseUrl, 'api-token');

        const error = await client.disableTOTP('current-password', '012345').then(
            () => undefined,
            (e: unknown) => e,
        );

        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toMatchObject({ status: 404 });
    });
});
