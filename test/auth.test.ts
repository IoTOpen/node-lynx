import { describe, expect, it, vi } from 'vitest';

import { Login } from '../src/auth';
import type { LynxClient } from '../src/client';

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
});
