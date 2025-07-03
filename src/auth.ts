import {Base64} from 'js-base64';

import type {LynxClient} from './client';
import type {OKResponse} from './types';
import {Endpoints} from './util';

export interface LoginResult {
    token: string
    next_step?: string
}

export function Login(this: LynxClient, username: string, password: string): Promise<LoginResult> {
    return this.requestJson(Endpoints.Auth, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Base64.encode(`${username}:${password}`)}`
        }
    });
}

export function Logout(this: LynxClient) {
    return this.requestJson<OKResponse>(Endpoints.Auth, {method: 'DELETE'});
}

export function Login2FA(this: LynxClient, token: string, challenge: string): Promise<LoginResult> {
    return this.requestJson(Endpoints.Auth, {
        method: 'PUT',
        body: JSON.stringify({challenge: challenge}),
        headers: {
            'X-API-Key': token
        }
    });
}

export function ResetPassword(this: LynxClient, email: string): Promise<OKResponse> {
    return this.requestJson(`${Endpoints.Auth}/reset_password`, {
        method: 'POST',
        body: JSON.stringify({email: email}),
    });
}

export function ResetPasswordUpdate(this: LynxClient, token: string, password: string): Promise<OKResponse> {
    return this.requestJson(`${Endpoints.Auth}/reset_password`, {
        method: 'PUT',
        body: JSON.stringify({password: password}),
        headers: {
            'X-API-Key': token
        }
    });
}
