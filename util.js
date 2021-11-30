import fetch from "node-fetch";

export const Endpoints = {
    Auth: '/api/v2/auth',
    FunctionX: '/api/v2/functionx',
    DeviceX: '/api/v2/devicex',
    Status: '/api/v2/status',
    LogV3: '/api/v3beta/log/',
    InstallationInfo: '/api/v2/installationinfo',
    Installation: '/api/v2/installation',
    Notification: '/api/v2/notification',
    Organization: '/api/v2/organization',
    Schedule: '/api/v2/schedule',
    User: '/api/v2/user',
    EdgeApp: '/api/v2/edge/app',
    Role: '/api/v2/role',
    Permission: '/api/v2/permission'
}

export let connectionOptions = {
    apiKey: '',
    baseURL: ''
}

export const request = (endpoint, options) => {
    let url = connectionOptions.baseURL + endpoint;
    let headers = {
        'Content-Type': 'application/json',
        'X-API-Key': connectionOptions.apiKey
    }

    let config = {
        ...options,
        headers: headers
    }

    return fetch(url, config)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(res.status + ':' + res.statusText);
        });
};
