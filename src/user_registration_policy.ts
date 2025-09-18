import type {LynxClient} from './client';
import type {Identifier, OKResponse} from './types';
import {Endpoints} from './util';

export interface EmptyUserRegistrationPolicy {
    email_pattern: string
    role_id: number
    parent_organization?: number
    organization_id?: number
}

export type UserRegistrationPolicy = EmptyUserRegistrationPolicy & Identifier

export function CreateUserRegistrationPolicy(this: LynxClient, policy: UserRegistrationPolicy) {
    return this.requestJson<UserRegistrationPolicy>(
        Endpoints.UserRegistrationPolicy, {
            method: 'POST', body: JSON.stringify(policy),
        });
}

export function DeleteUserRegistrationPolicy(this: LynxClient, policy: UserRegistrationPolicy) {
    return this.requestJson<OKResponse>(
        `${Endpoints.UserRegistrationPolicy}/${policy.id}`, {
            method: 'DELETE',
        });
}

export function GetUserRegistrationPolicies(this: LynxClient) {
    return this.requestJson<UserRegistrationPolicy[]>(
        Endpoints.UserRegistrationPolicy);
}

export function GetUserRegistrationPolicy(this: LynxClient, id: number) {
    return this.requestJson<UserRegistrationPolicy>(
        `${Endpoints.UserRegistrationPolicy}/${id}`);
}

export function UpdateUserRegistrationPolicy(this: LynxClient, policy: UserRegistrationPolicy) {
    return this.requestJson<UserRegistrationPolicy>(
        `${Endpoints.UserRegistrationPolicy}/${policy.id}`, {
            method: 'PUT', body: JSON.stringify(policy),
        });
}
