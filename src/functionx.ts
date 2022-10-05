import {Endpoints, request} from './util';
import {CreationDate, Identifier, Metadata, OKResponse} from './types';

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
