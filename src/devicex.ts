import {Endpoints} from './util';
import {CreationDate, Identifier, Metadata, MetaObject, OKResponse} from './types';
import {LynxClient} from './client';

export type EmptyDevicex = {
    installation_id: number
    type: string
    meta: Metadata
    protected_meta: Metadata
}

export type Devicex = EmptyDevicex & Identifier & CreationDate

export function GetDevices(this: LynxClient, installationId: number, filter?: Metadata) {
    const qs = filter ? '?' + new URLSearchParams(filter).toString() : '';
    return this.request<Devicex[]>(`${Endpoints.DeviceX}/${installationId}${qs}`, {});
}

export function GetDevice(this: LynxClient, installationId: number, id: number) {
    return this.request<Devicex>(`${Endpoints.DeviceX}/${installationId}/${id}`, {});
}

export function CreateDevice(this: LynxClient, dev: EmptyDevicex) {
    return this.request<Devicex>(
        `${Endpoints.DeviceX}/${dev.installation_id}`, {
            method: 'POST', body: JSON.stringify(dev)
        });
}

export function UpdateDevice(this: LynxClient, dev: Devicex) {
    return this.request<Devicex>(
        `${Endpoints.DeviceX}/${dev.installation_id}/${dev.id}`, {
            method: 'PUT', body: JSON.stringify(dev)
        });
}

export function DeleteDevice(this: LynxClient, dev: Devicex) {
    return this.request<OKResponse>(
        `${Endpoints.DeviceX}/${dev.installation_id}/${dev.id}`, {
            method: 'DELETE'
        });
}

export function GetDeviceMeta(this: LynxClient, installationID: number, deviceID: number, key: string) {
    return this.request<MetaObject>(
        `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}`, {});
}

export function CreateDeviceMeta(this: LynxClient, installationID: number, deviceID: number, key: string, data: MetaObject, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    const path = `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.request<MetaObject>(path, {
        method: 'POST', body: JSON.stringify(data)
    });
}

export function UpdateDeviceMeta(this: LynxClient, installationID: number, deviceID: number, key: string, data: MetaObject, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    const path = `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.request<MetaObject>(path, {
        method: 'PUT', body: JSON.stringify(data)
    });
}

export function DeleteDeviceMeta(this: LynxClient, installationID: number, deviceID: number, key: string, silent = false) {
    const qs = silent ? `?${new URLSearchParams({silent: String(silent)})}` : '';
    const path = `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.request<MetaObject>(path, {
        method: 'DELETE'
    });
}
