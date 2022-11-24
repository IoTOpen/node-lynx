import {Endpoints, request} from './util';
import {CreationDate, Identifier, Metadata, MetaObject, OKResponse} from './types';

export type EmptyFunctionx = {
    installation_id: number
    type: string
    meta: Metadata
    protected_meta: Metadata
}

type Functionx = EmptyFunctionx & Identifier & CreationDate

export function GetFunctions(installationId: number, filter?: Metadata) {
    const qs = filter ? `?${new URLSearchParams(filter).toString()}` : '';
    const url = `${Endpoints.FunctionX}/${installationId}${qs}`;
    return request<Functionx[]>(url, {});
}

export function GetFunction(installationId: number, id: number) {
    return request<Functionx>(
        `${Endpoints.FunctionX}/${installationId}/${id}`, {});
}

export function CreateFunction(func: EmptyFunctionx) {
    return request<Functionx>(
        `${Endpoints.FunctionX}/${func.installation_id}`, {
            method: 'POST', body: JSON.stringify(func)
        });
}

export function UpdateFunction(func: Functionx) {
    return request<Functionx>(
        `${Endpoints.FunctionX}/${func.installation_id}/${func.id}`, {
            method: 'PUT', body: JSON.stringify(func)
        });
}

export function DeleteFunction(func: Functionx) {
    return request<OKResponse>(
        `${Endpoints.FunctionX}/${func.installation_id}/${func.id}`, {
            method: 'DELETE'
        });
}

export function GetFunctionMeta(installationID: number, functionID: number, key: string) {
    return request<MetaObject>(
        `${Endpoints.FunctionX}/${installationID}/${functionID}/meta/${encodeURIComponent(key)}`, {});
}

export function CreateFunctionMeta(installationID: number, functionID: number, key: string, data: MetaObject, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    const path = `${Endpoints.FunctionX}/${installationID}/${functionID}/meta/${encodeURIComponent(key)}${qs}`;
    return request<MetaObject>(path, {
        method: 'POST', body: JSON.stringify(data)
    });
}

export function UpdateFunctionMeta(installationID: number, functionID: number, key: string, data: MetaObject, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    const path = `${Endpoints.FunctionX}/${installationID}/${functionID}/meta/${encodeURIComponent(key)}${qs}`;
    return request<MetaObject>(path, {
        method: 'PUT', body: JSON.stringify(data)
    });
}

export function DeleteFunctionMeta(installationID: number, functionID: number, key: string, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    const path = `${Endpoints.FunctionX}/${installationID}/${functionID}/meta/${encodeURIComponent(key)}${qs}`;
    return request<MetaObject>(path, {
        method: 'DELETE'
    });
}
