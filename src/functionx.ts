import {Endpoints} from './util';
import {CreationDate, Identifier, Metadata, WithMeta, MetaObject, OKResponse} from './types';
import {LynxClient} from './client';

export type EmptyFunctionx = WithMeta & {
    installation_id: number
    type: string
}

export type Functionx = EmptyFunctionx & Identifier & CreationDate

export function GetFunctions(this: LynxClient, installationId: number, filter?: Metadata) {
    const qs = filter ? `?${new URLSearchParams(filter).toString()}` : '';
    const url = `${Endpoints.FunctionX}/${installationId}${qs}`;
    return this.requestJson<Functionx[]>(url);
}

export function GetFunction(this: LynxClient, installationId: number, id: number) {
    return this.requestJson<Functionx>(
        `${Endpoints.FunctionX}/${installationId}/${id}`);
}

export function CreateFunction(this: LynxClient, func: EmptyFunctionx, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    return this.requestJson<Functionx>(
        `${Endpoints.FunctionX}/${func.installation_id}${qs}`, {
            method: 'POST', body: JSON.stringify(func)
        });
}

export function UpdateFunction(this: LynxClient, func: Functionx, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    return this.requestJson<Functionx>(
        `${Endpoints.FunctionX}/${func.installation_id}/${func.id}${qs}`, {
            method: 'PUT', body: JSON.stringify(func)
        });
}

export function DeleteFunction(this: LynxClient, func: Functionx, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    return this.requestJson<OKResponse>(
        `${Endpoints.FunctionX}/${func.installation_id}/${func.id}${qs}`, {
            method: 'DELETE'
        });
}

export function GetFunctionMeta(this: LynxClient, installationID: number, functionID: number, key: string) {
    return this.requestJson<MetaObject>(
        `${Endpoints.FunctionX}/${installationID}/${functionID}/meta/${encodeURIComponent(key)}`);
}

export function CreateFunctionMeta(this: LynxClient, installationID: number, functionID: number, key: string, data: MetaObject, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    const path = `${Endpoints.FunctionX}/${installationID}/${functionID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'POST', body: JSON.stringify(data)
    });
}

export function UpdateFunctionMeta(this: LynxClient, installationID: number, functionID: number, key: string, data: MetaObject, silent = false, createMissing = false) {
    const qs = `?${new URLSearchParams({silent: String(silent), create_missing: String(createMissing)})}`;
    const path = `${Endpoints.FunctionX}/${installationID}/${functionID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'PUT', body: JSON.stringify(data)
    });
}

export function DeleteFunctionMeta(this: LynxClient, installationID: number, functionID: number, key: string, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    const path = `${Endpoints.FunctionX}/${installationID}/${functionID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'DELETE'
    });
}
