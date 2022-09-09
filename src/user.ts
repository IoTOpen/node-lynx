import {Endpoints, request} from './util';
import {Address, Identifier, Metadata, OKResponse} from './types';

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

export const GetMe = () => request<User>(Endpoints.User + '/me', {});

export const GetUser = (id: number) => request<User>(Endpoints.User + '/' + id, {});

export const GetUsers = (filter?: Metadata) => {
    const qs = filter ? '?' + new URLSearchParams(filter).toString() : '';
    return request<User[]>(Endpoints.User + qs, {});
};

export const CreateUser = (user: EmptyUser) => request<User>(Endpoints.User, {
    method: 'POST', body: JSON.stringify(user)
});

export const UpdateUser = (user: User) => request<User>(Endpoints.User + '/' + user.id, {
    method: 'PUT', body: JSON.stringify(user)
});

export const DeleteUser = (user: User) => request<OKResponse>(Endpoints.User + '/' + user.id, {
    method: 'DELETE'
});

export type ChangePasswordData = {
    current_password: string
    new_password: string
}

export const ChangePassword = (passwordData: ChangePasswordData) => request<OKResponse>(Endpoints.User + '/password', {
    method: 'PUT',
    body: JSON.stringify(passwordData),
});
