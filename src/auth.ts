import type { LynxClient } from './client';
import type { OKResponse } from './types';
import { Endpoints } from './util';

export interface LoginResult {
    token: string;
    next_step?: 'challenge' | 'reset_password';
    method?: 'totp' | 'sms';
}

export interface TOTPEnrollmentResponse {
    secret: string;
    url: string;
    qrCode: string;
}

export interface TOTPEnrollmentConfirmation {
    backupCodes: string[];
}

/**
 * Encodes credentials into a Base64 Basic Auth string.
 */
const encodeBasic = (username: string, password: string): string =>
    globalThis.btoa(Array.from(new TextEncoder().encode(`${username}:${password}`), (byte) => String.fromCharCode(byte)).join(''));

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

export function EnrollTOTP(this: LynxClient, password: string): Promise<TOTPEnrollmentResponse> {
    return this.requestJson<TOTPEnrollmentResponse>(`${Endpoints.Auth}/totp/enroll`, {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function ConfirmTOTPEnrollment(this: LynxClient, code: string): Promise<TOTPEnrollmentConfirmation> {
    return this.requestJson<TOTPEnrollmentConfirmation>(`${Endpoints.Auth}/totp/enroll`, {
        method: 'PUT',
        body: JSON.stringify({ code }),
        headers: {
            'Content-Type': 'application/json',
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
