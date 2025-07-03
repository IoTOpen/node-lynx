import type {LynxClient} from './client';
import type {Address, OKResponse} from './types';
import {Endpoints} from './util';

export interface UserRegistration {
    first_name: string
    last_name: string
    email: string
    address?: Address
}

export function Register(this: LynxClient, registrationData: UserRegistration) {
    return this.requestJson<OKResponse>(
        `${Endpoints.User}/register`, {
            method: 'POST', body: JSON.stringify(registrationData)
        });
}
