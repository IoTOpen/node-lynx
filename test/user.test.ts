import { afterEach, describe, expect, it, vi } from 'vitest';

import { LynxClient } from '../src/client';
import { HTTPError } from '../src/util';

const baseUrl = 'https://lynx.example.com';

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('ResetUserTOTP', () => {
    it('deletes the target user TOTP and resolves null on 204', async () => {
        const fetchMock = vi.fn(async (_input: RequestInfo | URL, _options?: RequestInit) => new Response(null, { status: 204 }));
        vi.stubGlobal('fetch', fetchMock);
        const client = new LynxClient(baseUrl, 'api-token');

        await expect(client.resetUserTOTP(7)).resolves.toBeNull();

        const [input, options] = fetchMock.mock.calls[0] ?? [];
        expect(input).toBe(`${baseUrl}/api/v2/user/7/security/totp`);
        expect(options?.method).toBe('DELETE');
        expect(new Headers(options?.headers).get('X-API-Key')).toBe('api-token');
    });

    it('throws HTTPError when the caller lacks permission', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => new Response(JSON.stringify({ message: 'forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })),
        );
        const client = new LynxClient(baseUrl, 'api-token');

        const error = await client.resetUserTOTP(7).then(
            () => undefined,
            (e: unknown) => e,
        );

        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toMatchObject({ status: 403 });
    });
});

describe('GetUserTOTPStatus', () => {
    it('gets the target user TOTP status', async () => {
        const status = { enabled: true, enrolled_at: '2026-01-02T03:04:05Z' };
        const fetchMock = vi.fn(async (_input: RequestInfo | URL, _options?: RequestInit) => new Response(JSON.stringify(status), { status: 200, headers: { 'Content-Type': 'application/json' } }));
        vi.stubGlobal('fetch', fetchMock);
        const client = new LynxClient(baseUrl, 'api-token');

        await expect(client.getUserTOTPStatus(7)).resolves.toEqual(status);

        const [input, options] = fetchMock.mock.calls[0] ?? [];
        expect(input).toBe(`${baseUrl}/api/v2/user/7/security/totp`);
        expect(options?.method).toBe('GET');
    });
});
