import {Endpoints, request} from './util';
import {CreationDate, Identifier, Metadata, OKResponse} from './types';

export type EmptyDevicex = {
    installation_id: number
    type: string
    meta: Metadata
    protected_meta: Metadata
}

export type Devicex = EmptyDevicex & Identifier & CreationDate

export const GetDevices = (installationId: number, filter?: Metadata) => {
    const qs = filter ? '?' + new URLSearchParams(filter).toString() : '';
    const url = Endpoints.DeviceX + '/' + installationId + qs;
    return request<Devicex[]>(url, {});
};

export const GetDevice = (installationId: number, id: number) => request<Devicex>(
    Endpoints.DeviceX + '/' + installationId + '/' + id, {});

export const CreateDevice = (dev: EmptyDevicex) => request<Devicex>(
    Endpoints.DeviceX + '/' + dev.installation_id, {
        method: 'POST', body: JSON.stringify(dev)
    });

export const UpdateDevice = (dev: Devicex) => request<Devicex>(
    Endpoints.DeviceX + '/' + dev.installation_id + '/' + dev.id, {
        method: 'PUT', body: JSON.stringify(dev)
    });

export const DeleteDevice = (dev: Devicex) => request<OKResponse>(
    Endpoints.DeviceX + '/' + dev.installation_id + '/' + dev.id, {
        method: 'DELETE'
    });
