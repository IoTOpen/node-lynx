import {Endpoints} from './util';
import {Address, Identifier, Metadata, WithMeta, OKResponse, MetaObject} from './types';
import {LynxClient} from './client';

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

export type ChangePasswordData = {
    current_password: string
    new_password: string
}

export function ChangePassword(this: LynxClient, passwordData: ChangePasswordData) {
    return this.requestJson<OKResponse>(`${Endpoints.User}/password`, {
        method: 'PUT',
        body: JSON.stringify(passwordData),
    });
}

export function GetUserMeta(this: LynxClient, userID: number, key: string) {
    return this.requestJson<MetaObject>(`${Endpoints.User}/${userID}/meta/${encodeURIComponent(key)}`);
}

export function CreateUserMeta(this: LynxClient, userID: number, key: string, data: MetaObject, silent = false) {
    const qs = `?${new URLSearchParams({silent: String(silent)})}`;
    const path = `${Endpoints.User}/${userID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'POST', body: JSON.stringify(data)
    });
}

export function UpdateUserMeta(this: LynxClient, userID: number, key: string, data: MetaObject, silent = false, createMissing = false) {
    const qs = `?${new URLSearchParams({silent: String(silent), create_missing: String(createMissing)})}`;
    const path = `${Endpoints.User}/${userID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'PUT', body: JSON.stringify(data)
    });
}

export function DeleteUserMeta(this: LynxClient, userID: number, key: string, silent = false) {
    const qs = `?${new URLSearchParams({silent: String(silent)})}`;
    const path = `${Endpoints.User}/${userID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'DELETE'
    });
}