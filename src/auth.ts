import { Base64 } from 'js-base64';

import type { LynxClient } from './client';
import type { OKResponse } from './types';
import { Endpoints } from './util';

export interface LoginResult {
    token: string;
    next_step?: string;
}

/**
 * Encodes credentials into a Base64 Basic Auth string.
 */
const encodeBasic = (u: string, p: string): string => Base64.encode(`${u}:${p}`);

export function Login(this: LynxClient, username: string, password: string): Promise<LoginResult> {
    return this.requestJson<LoginResult>(Endpoints.Auth, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodeBasic(username, password)}`,
        },
    });
}

export function Logout(this: LynxClient): Promise<OKResponse> {
    return this.requestJson<OKResponse>(Endpoints.Auth, { method: 'DELETE' });
}

export function Login2FA(this: LynxClient, token: string, challenge: string): Promise<LoginResult> {
    return this.requestJson<LoginResult>(Endpoints.Auth, {
        method: 'PUT',
        body: JSON.stringify({ challenge }),
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': token,
        },
    });
}

export function ResetPassword(this: LynxClient, email: string): Promise<OKResponse> {
    return this.requestJson<OKResponse>(`${Endpoints.Auth}/reset_password`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function ResetPasswordUpdate(this: LynxClient, token: string, password: string): Promise<OKResponse> {
    return this.requestJson<OKResponse>(`${Endpoints.Auth}/reset_password`, {
        method: 'PUT',
        body: JSON.stringify({ password }),
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': token,
        },
    });
}
