import type { LynxClient } from './client';

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

export function buildQuery(params?: Record<string, unknown> | URLSearchParams): string {
    if (!params) {
        return '';
    }

    if (params instanceof URLSearchParams) {
        const s = params.toString();
        return s ? `?${s}` : '';
    }

    const search = new URLSearchParams();

    function normalize(v: unknown): string {
        if (v === undefined || v === null) {
            return '';
        }

        const t = typeof v;
        switch (t) {
            case 'string': {
                return v as string;
            }
            case 'number': {
                return (v as number).toString();
            }
            case 'bigint': {
                return (v as bigint).toString();
            }
            case 'boolean': {
                return (v as boolean).toString();
            }
            case 'symbol': {
                return (v as symbol).toString();
            }
            case 'function': {
                return (v as (...args: unknown[]) => unknown).toString();
            }
            case 'undefined': {
                return '';
            }
            case 'object': {
                if (v instanceof Date) {
                    return v.toISOString();
                }
                return JSON.stringify(v);
            }
            default: {
                return '';
            }
        }
    }

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) {
            continue;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                if (item === undefined || item === null) {continue;}
                search.append(key, normalize(item));
            }
            continue;
        }

        search.append(key, normalize(value));
    }

    const qs = search.toString();
    return qs ? `?${qs}` : '';
}

export class HTTPError extends Error {
    status: number;
    body?: unknown;
    constructor(message: string, status: number, body?: unknown) {
        super(message);
        this.status = status;
        this.body = body;
        Object.setPrototypeOf(this, HTTPError.prototype);
    }
}

export function request(this: LynxClient, info: string, init?: RequestInit) {
    const conf: RequestInit = {
        ...init,
        headers: new Headers(init?.headers),
    };
    const headers = conf.headers as Headers;
    if (this.apiKey && this.apiKey !== '') {
        if (this.bearer) {
            if (!headers.has('Authorization')) {
                headers.set('Authorization', `Bearer ${this.apiKey}`);
            }
        } else {
            if (!headers.has('X-API-Key')) {
                headers.set('X-API-Key', this.apiKey);
            }
        }
    }
    return fetch(info, conf);
}

function jsonRequestInit(options?: RequestInit): RequestInit {
    const headers = new Headers(options?.headers);
    if (typeof options?.body === 'string' && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    return {
        ...options,
        headers,
    };
}

async function readErrorBody(res: Response): Promise<unknown> {
    const cloned = res.clone();

    try {
        return await res.json();
    } catch {
        try {
            const text = await cloned.text();
            return text === '' ? undefined : text;
        } catch {
            return undefined;
        }
    }
}

function getErrorMessage(body: unknown, status: number, statusText: string): string {
    if (typeof body === 'string') {
        const trimmed = body.trim();
        if (trimmed !== '') {
            return trimmed;
        }
    }

    if (body && typeof body === 'object') {
        const message = (body as { message?: unknown }).message;
        if (typeof message === 'string' && message.trim() !== '') {
            return message;
        }
    }

    return statusText || `HTTP ${status}`;
}

export function requestJson<T>(this: LynxClient, endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    return this.request(url, jsonRequestInit(options)).then(async(res) => {
        if (res.status >= 200 && res.status < 300) {
            return await res.json() as T;
        }

        const err = await readErrorBody(res);
        throw new HTTPError(getErrorMessage(err, res.status, res.statusText), res.status, err);
    });
}

export function requestBlob(this: LynxClient, endpoint: string, options?: RequestInit) {
    const url = `${this.baseURL}${endpoint}`;
    return this.request(url, options).then(async(res) => {
        if (res.status >= 200 && res.status < 300) {
            return await res.blob();
        }

        const err = await readErrorBody(res);
        throw new HTTPError(getErrorMessage(err, res.status, res.statusText), res.status, err);
    });
}

export function requestNull<T>(this: LynxClient, endpoint: string, options?: RequestInit): Promise<T | null> {
    const url = `${this.baseURL}${endpoint}`;
    return this.request(url, jsonRequestInit(options)).then(async(res) => {
        if (res.status === 204) {
            return null;
        }
        if (res.status !== 200) {
            const err = await readErrorBody(res);
            throw new HTTPError(getErrorMessage(err, res.status, res.statusText), res.status, err);
        }
        return await res.json() as T;
    });
}
