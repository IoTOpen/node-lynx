import {Endpoints} from './util';
import {Address, Identifier, Metadata, OKResponse} from './types';
import {LynxClient} from './client';

export type EmptyUser = {
    email: number
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
    meta: Metadata
    protected_meta: Metadata
}

export type User = EmptyUser & Identifier

export function GetMe(this: LynxClient) {
    return this.request<User>(`${Endpoints.User}/me`, {});
}

export function GetUser(this: LynxClient, id: number) {
    return this.request<User>(`${Endpoints.User}/${id}`, {});
}

export function GetUsers(this: LynxClient, filter?: Metadata) {
    const qs = filter ? `?${new URLSearchParams(filter).toString()}` : '';
    return this.request<User[]>(`${Endpoints.User}${qs}`, {});
}

export function CreateUser(this: LynxClient, user: EmptyUser) {
    return this.request<User>(Endpoints.User, {
        method: 'POST', body: JSON.stringify(user)
    });
}

export function UpdateUser(this: LynxClient, user: User) {
    return this.request<User>(`${Endpoints.User}/${user.id}`, {
        method: 'PUT', body: JSON.stringify(user)
    });
}

export function DeleteUser(this: LynxClient, user: User) {
    return this.request<OKResponse>(`${Endpoints.User}/${user.id}`, {
        method: 'DELETE'
    });
}

export type ChangePasswordData = {
    current_password: string
    new_password: string
}

export function ChangePassword(this: LynxClient, passwordData: ChangePasswordData) {
    return this.request<OKResponse>(`${Endpoints.User}/password`, {
        method: 'PUT',
        body: JSON.stringify(passwordData),
    });
}
