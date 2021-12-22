import fetch from "node-fetch";
import { connectionOptions, Endpoints, request } from "./util";
import base64 from 'base-64';

export const Login = (username, password) => {
    let headers = {
        'Authorization': 'Basic ' + base64.encode(username + ':' + password)
    };
    let config = {
        method: 'POST',
        headers: headers
    };
    return fetch(connectionOptions.baseURL + Endpoints.Auth, config)
        .then(async res => {
            if (res.status !== 200) {
                let error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
};

export const Logout = () => request(Endpoints.Auth, {method: 'DELETE'});

export const Login2FA = (token, challenge) => {
    let data = {
        challenge: challenge
    };
    let config = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-Key': token
        }
    };

    return fetch(connectionOptions.baseURL + Endpoints.Auth, config)
        .then(async res => {
            if (res.status !== 200) {
                let error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
};

export const ResetPassword = (email) => {
    let data = {
        email: email
    };
    let config = {
        method: 'POST',
        body: JSON.stringify(data)
    };
    return fetch(Endpoints.Auth + '/reset_password', config)
        .then(async res => {
            if (res.status !== 200) {
                let error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
};

export const ResetPasswordUpdate = (token, password) => {
    let data = {
        password: password
    };
    let config = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-Key': token
        }
    };
    return fetch(Endpoints.Auth + '/reset_password', config)
        .then(async res => {
            if (res.status !== 200) {
                let error = await res.json();
                error.status = res.status;
                return Promise.reject(error);
            }
            return res.json();
        });
};