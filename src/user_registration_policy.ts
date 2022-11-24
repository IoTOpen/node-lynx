import {Endpoints, request} from './util';
import {Identifier, OKResponse} from './types';

export type EmptyUserRegistrationPolicy = {
    email_pattern: string
    role_id: number
    parent_organization?: number
    organization_id?: number
}

export type UserRegistrationPolicy = EmptyUserRegistrationPolicy & Identifier

export function CreateUserRegistrationPolicy (policy: UserRegistrationPolicy) {
    return request<UserRegistrationPolicy>(
        Endpoints.UserRegistrationPolicy, {
            method: 'POST', body: JSON.stringify(policy),
        });
}

export function DeleteUserRegistrationPolicy(policy: UserRegistrationPolicy) {
    return request<OKResponse>(
        `${Endpoints.UserRegistrationPolicy}/${policy.id}`, {
            method: 'DELETE',
        });
}

export function GetUserRegistrationPolicies() {
    return request<UserRegistrationPolicy[]>(
        Endpoints.UserRegistrationPolicy, {});
}

export function GetUserRegistrationPolicy(id: number) {
    return request<UserRegistrationPolicy>(
        `${Endpoints.UserRegistrationPolicy}/${id}`, {});
}

export function UpdateUserRegistrationPolicy (policy: UserRegistrationPolicy) {
    return request<UserRegistrationPolicy>(
        `${Endpoints.UserRegistrationPolicy}/${policy.id}`, {
            method: 'PUT', body: JSON.stringify(policy),
        });
}
