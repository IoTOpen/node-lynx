import { Base64 } from 'js-base64';

import type { LynxClient } from './client';
import type { OKResponse } from './types';
import { Endpoints } from './util';

export interface LoginResult {
    token: string
    next_step?: string
}

export function Login(this: LynxClient, username: string, password: string): Promise<LoginResult> {
    const encodeBasic = (u: string, p: string): string => {
        const creds = `${u}:${p}`;
        // Try Node Buffer (server/node environments) with a typed narrow
        const globalWithBuffer = globalThis as unknown as { Buffer?: { from: (input: string, enc?: string) => { toString: (enc?: string) => string } } };
        const nodeBuf = globalWithBuffer.Buffer;
        if (nodeBuf && typeof nodeBuf.from === 'function') {
            try {
                return nodeBuf.from(creds, 'utf8').toString('base64');
            } catch (_) {
                // fallthrough to other methods
            }
        }
        // Try browser btoa with proper UTF-8 handling using TextEncoder
        if (typeof btoa === 'function' && typeof TextEncoder !== 'undefined') {
            try {
                const encoder = new TextEncoder();
                const bytes = encoder.encode(creds);
                let binary = '';
                for (const b of bytes) {
                    binary += String.fromCharCode(b);
                }
                return btoa(binary);
            } catch (_) {
                // fallthrough
            }
        }
        // Fallback to js-base64
        return Base64.encode(creds);
    };

    return this.requestJson(Endpoints.Auth, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodeBasic(username, password)}`
        }
    });
}

export function Logout(this: LynxClient) {
    return this.requestJson<OKResponse>(Endpoints.Auth, { method: 'DELETE' });
}

export function Login2FA(this: LynxClient, token: string, challenge: string): Promise<LoginResult> {
    return this.requestJson(Endpoints.Auth, {
        method: 'PUT',
        body: JSON.stringify({ challenge }),
        headers: {
            'X-API-Key': token
        }
    });
}

export function ResetPassword(this: LynxClient, email: string): Promise<OKResponse> {
    return this.requestJson(`${Endpoints.Auth}/reset_password`, {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
}

export function ResetPasswordUpdate(this: LynxClient, token: string, password: string): Promise<OKResponse> {
    return this.requestJson(`${Endpoints.Auth}/reset_password`, {
        method: 'PUT',
        body: JSON.stringify({ password }),
        headers: {
            'X-API-Key': token
        }
    });
}
