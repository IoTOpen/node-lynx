import {connectionOptions, Endpoints, request} from './util';
import {OKResponse, RequestResponse} from './types';

export type LoginResult = {
    token: string
    next_step?: string
}

export const Login = (username: string, password: string): Promise<RequestResponse<LoginResult>> => {
    const headers = {
        'Authorization': 'Basic ' + btoa (username + ':' + password)
    };
    const config = {
        method: 'POST', headers: headers
    };
    return fetch(connectionOptions.baseURL + Endpoints.Auth, config)
        .then(async res => {
            if (res.status !== 200) {
                const error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
};

export const Logout = () => request<RequestResponse<OKResponse>>(Endpoints.Auth, {method: 'DELETE'});

export const Login2FA = (token: string, challenge: string): Promise<RequestResponse<LoginResult>> => {
    const data = {
        challenge: challenge
    };
    const config = {
        method: 'PUT', body: JSON.stringify(data), headers: {
            'X-API-Key': token
        }
    };

    return fetch(connectionOptions.baseURL + Endpoints.Auth, config)
        .then(async res => {
            if (res.status !== 200) {
                const error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
};

export const ResetPassword = (email: string): Promise<RequestResponse<OKResponse>> => {
    const data = {
        email: email
    };
    const config = {
        method: 'POST', body: JSON.stringify(data)
    };
    return fetch(Endpoints.Auth + '/reset_password', config)
        .then(async res => {
            if (res.status !== 200) {
                const error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
};

export const ResetPasswordUpdate = (token: string, password: string): Promise<RequestResponse<OKResponse>> => {
    const data = {
        password: password
    };
    const config = {
        method: 'PUT', body: JSON.stringify(data), headers: {
            'X-API-Key': token
        }
    };
    return fetch(Endpoints.Auth + '/reset_password', config)
        .then(async res => {
            if (res.status !== 200) {
                const error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
};
