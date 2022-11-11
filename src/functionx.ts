import {Endpoints, request} from './util';
import {CreationDate, Identifier, Metadata, MetaObject, OKResponse} from './types';

export type EmptyFunctionx = {
    installation_id: number
    type: string
    meta: Metadata
    protected_meta: Metadata
}

type Functionx = EmptyFunctionx & Identifier & CreationDate

export const GetFunctions = (installationId: number, filter?: Metadata) => {
    const qs = filter ? '?' + new URLSearchParams(filter).toString() : '';
    const url = Endpoints.FunctionX + '/' + installationId + qs;
    return request<Functionx[]>(url, {});
};

export const GetFunction = (installationId: number, id: number) => request<Functionx>(
    Endpoints.FunctionX + '/' + installationId + '/' + id, {});

export const CreateFunction = (func: EmptyFunctionx) => request<Functionx>(
    Endpoints.FunctionX + '/' + func.installation_id, {
        method: 'POST', body: JSON.stringify(func)
    });

export const UpdateFunction = (func: Functionx) => request<Functionx>(
    Endpoints.FunctionX + '/' + func.installation_id + '/' + func.id, {
        method: 'PUT', body: JSON.stringify(func)
    });

export const DeleteFunction = (func: Functionx) => request<OKResponse>(
    Endpoints.FunctionX + '/' + func.installation_id + '/' + func.id, {
        method: 'DELETE'
    });

export const GetFunctionMeta = (installationID: number, functionID: number, key: string) => request<MetaObject>(
    Endpoints.FunctionX + '/' + installationID + '/' + functionID + '/meta/' + key, {});

export const CreateFunctionMeta = (installationID: number, functionID: number, key: string, data: MetaObject, silent = false) => {
    const params: { [key: string]: string } = {silent: String(silent)};
    const qs = '?' + new URLSearchParams(params).toString();
    const path = Endpoints.FunctionX + '/' + installationID + '/' + functionID + '/meta/' + key + qs;

    return request<MetaObject>(path, {
        method: 'POST', body: JSON.stringify(data)
    });
};

export const UpdateFunctionMeta = (installationID: number, functionID: number, key: string, data: MetaObject, silent = false) => {
    const params: { [key: string]: string } = {silent: String(silent)};
    const qs = '?' + new URLSearchParams(params).toString();
    const path = Endpoints.FunctionX + '/' + installationID + '/' + functionID + '/meta/' + key + qs;

    return request<MetaObject>(path, {
        method: 'PUT', body: JSON.stringify(data)
    });
};

export const DeleteFunctionMeta = (installationID: number, functionID: number, key: string, silent = false) => {
    const params: { [key: string]: string } = {silent: String(silent)};
    const qs = '?' + new URLSearchParams(params).toString();
    const path = Endpoints.FunctionX + '/' + installationID + '/' + functionID + '/meta/' + key + qs;

    return request<MetaObject>(path, {
        method: 'DELETE'
    });
};
