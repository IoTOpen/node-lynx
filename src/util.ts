import type { LynxClient } from './client';
import type { ErrorResponse } from './types';

import 'cross-fetch/polyfill';

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
    EdgePublisher = '/api/v2/edge/publisher',
    Role = '/api/v2/role',
    Permission = '/api/v2/permission',
    Token = '/api/v2/user/me/security/token',
    Gateway = '/api/v2/gateway',
    UserRegistrationPolicy = '/api/v2/user/registration/policy',
    File = '/api/v2/file',
    Trace = '/api/v2/trace',
    TopicBlacklist = '/api/v2/blacklist/topic',
    OAuth2 = '/api/v2/oauth2',
    OAuth2Admin = '/api/v2/admin/oauth2',
}

export function request (this: LynxClient, info: RequestInfo, init?: RequestInit) {
    const conf = {
        ...init,
    } as RequestInit;
    if (this.apiKey && this.apiKey !== '') {
        conf.headers ??= {};
        if (this.bearer) {
            (conf.headers as Record<string, string>).Authorization = `Bearer ${this.apiKey}`;
        } else {
            (conf.headers as Record<string, string>)['X-API-Key'] = this.apiKey;
        }
    }
    return fetch(info, conf);
}

export function requestJson<T> (this: LynxClient, endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    return this.request(url, options).then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
            return await res.json() as T;
        }

        const err = await res.json() as ErrorResponse;
        err.status = res.status;
        throw new Error('API error: ' + err.status + ' - ' + (err.message || 'Unknown error'));
    });
}

export function requestBlob (this: LynxClient, endpoint: string, options?: RequestInit) {
    const url = `${this.baseURL}${endpoint}`;
    return this.request(url, options).then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
            return await res.blob();
        }

        const err = await res.json() as ErrorResponse;
        err.status = res.status;
        throw new Error('API error: ' + err.status + ' - ' + (err.message || 'Unknown error'));
    });
}

export function requestNull<T> (this: LynxClient, endpoint: string, options?: RequestInit): Promise<T | null> {
    const url = `${this.baseURL}${endpoint}`;
    return this.request(url, options).then(async (res) => {
        if (res.status === 204) {
            return null;
        }
        if (res.status !== 200) {
            const err = await res.json() as ErrorResponse;
            err.status = res.status;
            throw new Error('API error: ' + err.status + ' - ' + (err.message || 'Unknown error'));
        }
        return await res.json() as T;
    });
}
