import {Endpoints, request} from './util';
import {Identifier, OKResponse} from './types';

export type EmptyUserRegistrationPolicy = {
    email_pattern: string
    role_id: number
    parent_organization?: number
    organization_id?: number
}

export type UserRegistrationPolicy = EmptyUserRegistrationPolicy & Identifier

export const CreateUserRegistrationPolicy = (policy: UserRegistrationPolicy) => request<UserRegistrationPolicy>(
    Endpoints.UserRegistrationPolicy, {
        method: 'POST', body: JSON.stringify(policy),
    });

export const DeleteUserRegistrationPolicy = (policy: UserRegistrationPolicy) => request<OKResponse>(
    Endpoints.UserRegistrationPolicy + '/' + policy.id, {
        method: 'DELETE',
    });

export const GetUserRegistrationPolicies = () => request<UserRegistrationPolicy[]>(
    Endpoints.UserRegistrationPolicy, {});

export const GetUserRegistrationPolicy = (id: number) => request<UserRegistrationPolicy>(
    Endpoints.UserRegistrationPolicy + '/' + id, {});

export const UpdateUserRegistrationPolicy = (policy: UserRegistrationPolicy) => request<UserRegistrationPolicy>(
    Endpoints.UserRegistrationPolicy + '/' + policy.id, {
        method: 'PUT', body: JSON.stringify(policy),
    });

