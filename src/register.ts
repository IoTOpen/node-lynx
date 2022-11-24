import {Address, OKResponse} from './types';
import {Endpoints, request} from './util';

export type UserRegistration = {
    first_name: string
    last_name: string
    email: string
    address?: Address
}

export function Register(registrationData: UserRegistration) {
    return request<OKResponse>(
        `${Endpoints.User}/register`, {
            method: 'POST', body: JSON.stringify(registrationData)
        });
}
