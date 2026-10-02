import { afterEach, describe, expect, it, vi } from 'vitest';

import { Login } from '../src/auth';
import { LynxClient } from '../src/client';

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('auth.ts', () => {
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

    it('starts TOTP enrollment with the current password', async () => {
        let capturedInput: RequestInfo | URL | undefined;
        let capturedOptions: RequestInit | undefined;
        const response = { secret: 'secret', url: 'otpauth://totp/account', qrCode: 'png' };
        const fetchMock = vi.fn(async (input: RequestInfo | URL, options?: RequestInit) => {
            capturedInput = input;
            capturedOptions = options;
            return new Response(JSON.stringify(response), { headers: { 'Content-Type': 'application/json' } });
        });
        vi.stubGlobal('fetch', fetchMock);
        const client = new LynxClient('https://lynx.example.com', 'api-token');

        await expect(client.enrollTOTP('current-password')).resolves.toEqual(response);

        expect(capturedInput).toBe('https://lynx.example.com/api/v2/auth/totp/enroll');
        expect(capturedOptions?.method).toBe('POST');
        expect(capturedOptions?.body).toBe(JSON.stringify({ password: 'current-password' }));
        expect(new Headers(capturedOptions?.headers).get('Content-Type')).toBe('application/json');
        expect(new Headers(capturedOptions?.headers).get('X-API-Key')).toBe('api-token');
    });

    it('confirms TOTP enrollment with the authenticator code', async () => {
        let capturedInput: RequestInfo | URL | undefined;
        let capturedOptions: RequestInit | undefined;
        const response = { backupCodes: ['backup-code'] };
        const fetchMock = vi.fn(async (input: RequestInfo | URL, options?: RequestInit) => {
            capturedInput = input;
            capturedOptions = options;
            return new Response(JSON.stringify(response), { headers: { 'Content-Type': 'application/json' } });
        });
        vi.stubGlobal('fetch', fetchMock);
        const client = new LynxClient('https://lynx.example.com', 'api-token');

        await expect(client.confirmTOTPEnrollment('012345')).resolves.toEqual(response);

        expect(capturedInput).toBe('https://lynx.example.com/api/v2/auth/totp/enroll');
        expect(capturedOptions?.method).toBe('PUT');
        expect(capturedOptions?.body).toBe(JSON.stringify({ code: '012345' }));
        expect(new Headers(capturedOptions?.headers).get('Content-Type')).toBe('application/json');
        expect(new Headers(capturedOptions?.headers).get('X-API-Key')).toBe('api-token');
    });
});
