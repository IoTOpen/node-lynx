import {Endpoints, request} from './util';
import {Identifier, Metadata, OKResponse} from './types';

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

export const GetInstallations = (assignedOnly?: boolean) => {
    const qs = assignedOnly ? '?assigned=' + assignedOnly : '';
    return request<InstallationInfo>(Endpoints.InstallationInfo + qs, {});
};

export const GetInstallationRow = (installationId: number) => request<Installation>(
    Endpoints.Installation + '/' + installationId, {});

export const ListInstallations = (filter?: Metadata) => {
    const qs = filter ? '?' + new URLSearchParams(filter).toString() : '';
    const url = Endpoints.Installation + qs;
    return request<Installation[]>(url, {});
};

export const GetInstallation = (id: number) => {
    return request<InstallationInfo[]>(Endpoints.InstallationInfo + '?assigned=false', {})
        .then((res) => {
            const installations = res as InstallationInfo[];
            for (const installation of installations) {
                if (installation.id === id) {
                    return installation;
                }
            }
            return null;
        });
};

export const GetInstallationByClientId = (clientId: number, assignedOnly?: boolean) => {
    const qs = assignedOnly ? '?assigned=' + assignedOnly : '';
    return request<InstallationInfo>(Endpoints.InstallationInfo + '/' + clientId + qs, {});
};

export const CreateInstallation = (installation: EmptyInstallation) => request<Installation>(
    Endpoints.Installation, {
        method: 'POST', body: JSON.stringify(installation)
    });

export const UpdateInstallation = (installation: Installation) => request<Installation>(
    Endpoints.Installation + '/' + installation.id, {
        method: 'PUT', body: JSON.stringify(installation)
    });

export const DeleteInstallation = (installation: Installation) => request<OKResponse>(
    Endpoints.Installation + '/' + installation.id, {
        method: 'DELETE'
    });
