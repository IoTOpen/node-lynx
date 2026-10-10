import type { TOTPStatus } from './auth';
import type { LynxClient } from './client';
import type { Token } from './token';
import type { Address, Identifier, Metadata, MetaObject, OKResponse, WithMeta } from './types';
import { Endpoints } from './util';

export type EmptyUser = WithMeta & {
    email: string
    password?: string
    first_name: string
    last_name: string
    role: number
    sms_login: boolean
    mobile: string
    note: string
    organisations: number[]
    assigned_installations?: number[]
    address: Address
    expire_at: number
}

export type User = EmptyUser & Identifier

export function GetMe(this: LynxClient) {
    return this.requestJson<User>(`${Endpoints.User}/me`);
}

export function GetUser(this: LynxClient, id: number) {
    return this.requestJson<User>(`${Endpoints.User}/${id}`);
}

export function GetUsers(this: LynxClient, filter?: Metadata) {
    const qs = filter ? `?${new URLSearchParams(filter).toString()}` : '';
    return this.requestJson<User[]>(`${Endpoints.User}${qs}`);
}

export function GetUserTokens(this: LynxClient, id: number | 'me') {
    return this.requestJson<Token[]>(`${Endpoints.User}/${id}/security/token`);
}

/**
 * Administrator view of another user's TOTP status. Users checking their own status use getTOTPStatus.
 */
export function GetUserTOTPStatus(this: LynxClient, id: number): Promise<TOTPStatus> {
    return this.requestJson<TOTPStatus>(`${Endpoints.User}/${id}/security/totp`, { method: 'GET' });
}

/**
 * Administrator reset of another user's TOTP factor, for users locked out of a lost device.
 * The server rejects self-targeting; use disableTOTP for the caller's own account.
 */
export function ResetUserTOTP(this: LynxClient, id: number): Promise<null> {
    return this.requestNull<null>(`${Endpoints.User}/${id}/security/totp`, { method: 'DELETE' });
}

export function CreateUser(this: LynxClient, user: EmptyUser) {
    return this.requestJson<User>(Endpoints.User, {
        method: 'POST', body: JSON.stringify(user)
    });
}

export function UpdateUser(this: LynxClient, user: User) {
    return this.requestJson<User>(`${Endpoints.User}/${user.id}`, {
        method: 'PUT', body: JSON.stringify(user)
    });
}

export function DeleteUser(this: LynxClient, user: User) {
    return this.requestJson<OKResponse>(`${Endpoints.User}/${user.id}`, {
        method: 'DELETE'
    });
}

export interface ChangePasswordData {
    current_password: string
    new_password: string
}

export function ChangePassword(this: LynxClient, passwordData: ChangePasswordData) {
    return this.requestJson<OKResponse>(`${Endpoints.User}/me/password`, {
        method: 'PUT',
        body: JSON.stringify(passwordData),
    });
}

export function ChangePasswordOther(this: LynxClient, userid: number, newPassword: string) {
    return this.requestJson<OKResponse>(`${Endpoints.User}/${userid}/password`, {
        method: 'PUT',
        body: JSON.stringify({ new_password: newPassword }),
    });
}

export function GetUserMeta(this: LynxClient, userID: number, key: string) {
    return this.requestJson<MetaObject>(`${Endpoints.User}/${userID}/meta/${encodeURIComponent(key)}`);
}

export function CreateUserMeta(this: LynxClient, userID: number, key: string, data: MetaObject, silent = false) {
    const qs = `?${new URLSearchParams({ silent: String(silent) }).toString()}`;
    const path = `${Endpoints.User}/${userID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'POST', body: JSON.stringify(data)
    });
}

export function UpdateUserMeta(this: LynxClient, userID: number, key: string, data: MetaObject, silent = false, createMissing = false) {
    const qs = `?${new URLSearchParams({ silent: String(silent), create_missing: String(createMissing) }).toString()}`;
    const path = `${Endpoints.User}/${userID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'PUT', body: JSON.stringify(data)
    });
}

export function DeleteUserMeta(this: LynxClient, userID: number, key: string, silent = false) {
    const qs = `?${new URLSearchParams({ silent: String(silent) }).toString()}`;
    const path = `${Endpoints.User}/${userID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'DELETE'
    });
}
