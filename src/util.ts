import {ErrorResponse} from './types';
import {LynxClient} from './client';

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

export function request(this: LynxClient, info: RequestInfo | URL, init?: RequestInit) {
    const conf = {
        ...init,
    } as RequestInit;
    if (this.apiKey && this.apiKey !== '') {
        if (!conf.headers) conf.headers = {};
        (conf.headers as any)['X-API-Key'] = this.apiKey;
    }
    return fetch(info, conf);
}

export function requestJson<T>(this: LynxClient, endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    return this.request(url, options).then(async (res) => {
        if (res.status !== 200) {
            const err = await res.json() as ErrorResponse;
            err.status = res.status;
            throw err;
        }
        return await res.json() as T;
    });
}

export function requestBlob(this: LynxClient, endpoint: string, options?: RequestInit) {
    const url = `${this.baseURL}${endpoint}`;
    return this.request(url, options).then(async (res) => {
        if (res.status !== 200) {
            const err = await res.json() as ErrorResponse;
            err.status = res.status;
            throw err;
        }
        return await res.blob();
    });
}

export function requestNull<T>(this: LynxClient, endpoint: string, options?: RequestInit): Promise<T | null> {
    const url = `${this.baseURL}${endpoint}`;
    return this.request(url, options).then(async (res) => {
        if (res.status === 204) {
            return null;
        }
        if (res.status !== 200) {
            throw await res.json() as ErrorResponse;
        }
        return await res.json() as T;
    });
}
