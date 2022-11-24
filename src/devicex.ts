import {Endpoints, request} from './util';
import {CreationDate, Identifier, Metadata, MetaObject, OKResponse} from './types';

export type EmptyDevicex = {
    installation_id: number
    type: string
    meta: Metadata
    protected_meta: Metadata
}

export type Devicex = EmptyDevicex & Identifier & CreationDate

export function GetDevices(installationId: number, filter?: Metadata) {
    const qs = filter ? '?' + new URLSearchParams(filter).toString() : '';
    return request<Devicex[]>(`${Endpoints.DeviceX}/${installationId}${qs}`, {});
}

export function GetDevice(installationId: number, id: number) {
    return request<Devicex>(`${Endpoints.DeviceX}/${installationId}/${id}`, {});
}

export function CreateDevice(dev: EmptyDevicex) {
    return request<Devicex>(
        `${Endpoints.DeviceX}/${dev.installation_id}`, {
            method: 'POST', body: JSON.stringify(dev)
        });
}

export function UpdateDevice(dev: Devicex) {
    return request<Devicex>(
        `${Endpoints.DeviceX}/${dev.installation_id}/${dev.id}`, {
            method: 'PUT', body: JSON.stringify(dev)
        });
}

export function DeleteDevice(dev: Devicex) {
    return request<OKResponse>(
        `${Endpoints.DeviceX}/${dev.installation_id}/${dev.id}`, {
            method: 'DELETE'
        });
}

export function GetDeviceMeta(installationID: number, deviceID: number, key: string) {
    return request<MetaObject>(
        `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}`, {});
}

export function CreateDeviceMeta(installationID: number, deviceID: number, key: string, data: MetaObject, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}`: '';
    const path = `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}${qs}`;
    return request<MetaObject>(path, {
        method: 'POST', body: JSON.stringify(data)
    });
}

export function UpdateDeviceMeta (installationID: number, deviceID: number, key: string, data: MetaObject, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}`: '';
    const path = `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}${qs}`;
    return request<MetaObject>(path, {
        method: 'PUT', body: JSON.stringify(data)
    });
}

export function DeleteDeviceMeta(installationID: number, deviceID: number, key: string, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}`: '';
    const path = `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}${qs}`;
    return request<MetaObject>(path, {
        method: 'DELETE'
    });
}
