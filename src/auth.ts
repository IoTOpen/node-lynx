import {Endpoints} from './util';
import {OKResponse, RequestResponse} from './types';
import {LynxClient} from './client';

export type LoginResult = {
    token: string
    next_step?: string
}

export function Login (this: LynxClient, username: string, password: string): Promise<RequestResponse<LoginResult>> {
    const headers = {
        'Authorization': `Basic ${btoa (`${username}:${password}`)}`
    };
    const config = {
        method: 'POST', headers: headers
    };
    return fetch(`${this.baseURL}${Endpoints.Auth}`, config)
        .then(async res => {
            if (res.status !== 200) {
                const error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
}

export function Logout (this: LynxClient) {
    return this.request<RequestResponse<OKResponse>>(Endpoints.Auth, {method: 'DELETE'});
}

export function Login2FA (this: LynxClient, token: string, challenge: string): Promise<RequestResponse<LoginResult>> {
    const data = {
        challenge: challenge
    };
    const config = {
        method: 'PUT', body: JSON.stringify(data), headers: {
            'X-API-Key': token
        }
    };

    return fetch(`${this.baseURL}${Endpoints.Auth}`, config)
        .then(async res => {
            if (res.status !== 200) {
                const error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
}

export function ResetPassword(this: LynxClient, email: string): Promise<RequestResponse<OKResponse>> {
    const data = {
        email: email
    };
    const config = {
        method: 'POST', body: JSON.stringify(data)
    };
    return fetch(`${this.baseURL}${Endpoints.Auth}/reset_password`, config)
        .then(async res => {
            if (res.status !== 200) {
                const error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
}

export function ResetPasswordUpdate(this: LynxClient, token: string, password: string): Promise<RequestResponse<OKResponse>> {
    const data = {
        password: password
    };
    const config = {
        method: 'PUT', body: JSON.stringify(data), headers: {
            'X-API-Key': token
        }
    };
    return fetch(`${this.baseURL}${Endpoints.Auth}/reset_password`, config)
        .then(async res => {
            if (res.status !== 200) {
                const error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
}
