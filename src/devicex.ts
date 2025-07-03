import type { LynxClient } from './client';
import type { CreationDate, Identifier, Metadata, MetaObject, OKResponse,WithMeta } from './types';
import { Endpoints } from './util';

export type EmptyDevicex = WithMeta & {
    installation_id: number
    type: string
}

export type Devicex = EmptyDevicex & Identifier & CreationDate

export function GetDevices (this: LynxClient, installationId: number, filter?: Metadata) {
    const qs = filter ? `?${new URLSearchParams(filter).toString()}` : '';
    return this.requestJson<Devicex[]>(`${Endpoints.DeviceX}/${installationId}${qs}`);
}

export function GetDevice (this: LynxClient, installationId: number, id: number) {
    return this.requestJson<Devicex>(`${Endpoints.DeviceX}/${installationId}/${id}`);
}

export function CreateDevice (this: LynxClient, dev: EmptyDevicex, silent = false) {
    const qs = silent ? `?${new URLSearchParams({ silent: String(silent) })}` : '';
    return this.requestJson<Devicex>(
        `${Endpoints.DeviceX}/${dev.installation_id}${qs}`, {
            method: 'POST',
            body: JSON.stringify(dev)
        });
}

export function UpdateDevice (this: LynxClient, dev: Devicex, silent = false) {
    const qs = silent ? `?${new URLSearchParams({ silent: String(silent) })}` : '';
    return this.requestJson<Devicex>(
        `${Endpoints.DeviceX}/${dev.installation_id}/${dev.id}${qs}`, {
            method: 'PUT',
            body: JSON.stringify(dev)
        });
}

export function DeleteDevice (this: LynxClient, dev: Devicex, silent = false) {
    const qs = silent ? `?${new URLSearchParams({ silent: String(silent) })}` : '';
    return this.requestJson<OKResponse>(
        `${Endpoints.DeviceX}/${dev.installation_id}/${dev.id}${qs}`, {
            method: 'DELETE'
        });
}

export function GetDeviceMeta (this: LynxClient, installationID: number, deviceID: number, key: string) {
    return this.requestJson<MetaObject>(`${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}`);
}

export function CreateDeviceMeta (this: LynxClient, installationID: number, deviceID: number, key: string, data: MetaObject, silent = false) {
    const qs = `?${new URLSearchParams({ silent: String(silent) })}`;
    const path = `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'POST', body: JSON.stringify(data)
    });
}

export function UpdateDeviceMeta (this: LynxClient, installationID: number, deviceID: number, key: string, data: MetaObject, silent = false, createMissing = false) {
    const qs = `?${new URLSearchParams({ silent: String(silent), create_missing: String(createMissing) })}`;
    const path = `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'PUT', body: JSON.stringify(data)
    });
}

export function DeleteDeviceMeta (this: LynxClient, installationID: number, deviceID: number, key: string, silent = false) {
    const qs = `?${new URLSearchParams({ silent: String(silent) })}`;
    const path = `${Endpoints.DeviceX}/${installationID}/${deviceID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'DELETE'
    });
}
