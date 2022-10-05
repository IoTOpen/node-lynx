import {ErrorResponse, RequestResponse} from './types';

export enum Endpoints {
    Auth = '/api/v2/auth',
    FunctionX = '/api/v2/functionx',
    DeviceX = '/api/v2/devicex',
    Status = '/api/v2/status',
    LogV3 = '/api/v3beta/log',
    InstallationInfo = '/api/v2/installationinfo',
    Installation = '/api/v2/installation',
    Notification = '/api/v2/notification',
    NotificationExecutorAdmin = '/api/v2/admin/notification/executor',
    Organization = '/api/v2/organization',
    Schedule = '/api/v2/schedule',
    User = '/api/v2/user',
    EdgeApp = '/api/v2/edge/app',
    Role = '/api/v2/role',
    Permission = '/api/v2/permission',
    Token = '/api/v2/user/me/security/token',
    Gateway = '/api/v2/gateway',
    UserRegistrationPolicy = '/api/v2/user/registration/policy',
    File = '/api/v2/file',
    Trace = '/api/v2/trace'
}

export const connectionOptions = {
    apiKey: '', baseURL: '', mqttOpts: {}
};

export const request = <T>(endpoint: string, options: RequestInit): Promise<RequestResponse<T>> => {
    const url = connectionOptions.baseURL + endpoint;
    let headers = {
        'X-API-Key': connectionOptions.apiKey
    };
    if (options.headers) {
        headers = {...headers, ...options.headers};
    }

    const config = {
        ...options, headers: headers
    };

    return fetch(url, config).then(async res => {
        if (res.status !== 200) {
            const error: ErrorResponse = await res.json();
            error.status = res.status;
            return Promise.reject(error);
        }
        try {
            return await res.clone().json();
        } catch (e) {
            return res;
        }
    });
};
