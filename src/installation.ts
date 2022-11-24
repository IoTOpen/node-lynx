import {Endpoints} from './util';
import {Identifier, Metadata, OKResponse} from './types';
import {LynxClient} from './client';

export type InstallationInfo = {
    id: number
    name: string
    client_id: number
    organization_id: number
    capabilities: string[]
    assigned: boolean
};

export type EmptyInstallation = {
    name: string
    organization_id: number
    notes: string
    users: number[]
    meta: Metadata
    protected_meta: Metadata
}

export type Installation = EmptyInstallation & Identifier & { client_id: number, created: number }

export function GetInstallations(this: LynxClient, assignedOnly?: boolean) {
    const qs = assignedOnly ? `?assigned=${assignedOnly}` : '';
    return this.requestJson<InstallationInfo[]>(`${Endpoints.InstallationInfo}${qs}`);
}

export function GetInstallationRow(this: LynxClient, installationId: number) {
    return this.requestJson<Installation>(
        `${Endpoints.Installation}/${installationId}`);
}

export function ListInstallations(this: LynxClient, filter?: Metadata) {
    const qs = filter ? `?${new URLSearchParams(filter).toString()}` : '';
    return this.requestJson<Installation[]>(`${Endpoints.Installation}${qs}`);
}

export function GetInstallation(this: LynxClient, id: number) {
    return this.requestJson<InstallationInfo[]>(`${Endpoints.InstallationInfo}?assigned=false`)
        .then((res) => {
            const installations = res as InstallationInfo[];
            for (const installation of installations) {
                if (installation.id === id) {
                    return installation;
                }
            }
            return null;
        });
}

export function GetInstallationByClientId(this: LynxClient, clientId: number, assignedOnly?: boolean) {
    const qs = assignedOnly ? `?assigned=${assignedOnly}` : '';
    return this.requestJson<InstallationInfo>(`${Endpoints.InstallationInfo}/${clientId}${qs}`);
}

export function CreateInstallation(this: LynxClient, installation: EmptyInstallation) {
    return this.requestJson<Installation>(
        Endpoints.Installation, {
            method: 'POST', body: JSON.stringify(installation)
        });
}

export function UpdateInstallation(this: LynxClient, installation: Installation) {
    return this.requestJson<Installation>(
        `${Endpoints.Installation}/${installation.id}`, {
            method: 'PUT', body: JSON.stringify(installation)
        });
}

export function DeleteInstallation(this: LynxClient, installation: Installation) {
    return this.requestJson<OKResponse>(
        `${Endpoints.Installation}/${installation.id}`, {
            method: 'DELETE'
        });
}
