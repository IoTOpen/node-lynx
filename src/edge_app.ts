import {Endpoints, request} from './util';
import {CreationDate, Identifier, OKResponse} from './types';

export type Publisher = {
    id: number
    name?: string
    apps?: EdgeApp[]
}

export type EmptyEdgeApp = {
    name: string
    category: string
    tags: string[]
    short_description: string
    description: string
    publisher: Publisher
    official?: boolean
    public: boolean
    source_url: string
}

export type EdgeApp = EmptyEdgeApp & Identifier & CreationDate

export function GetEdgeApps() {
    return request<EdgeApp[]>(Endpoints.EdgeApp, {});
}

export function GetEdgeApp(id: number) {
    return request<EdgeApp>(`${Endpoints.EdgeApp}/${id}`, {});
}

export function GetEdgeAppVersions(appId: number, untagged?: boolean) {
    const qs = untagged ? `?untagged=${untagged}` : '';
    return request(`${Endpoints.EdgeApp}/${appId}/version${qs}`, {});
}

export function GetEdgeAppConfigOptions(id: number, version: string) {
    const qs = `?version=${version}`;
    return request<any>(`${Endpoints.EdgeApp}/${id}/configure${qs}`, {});
}

export function GetConfiguredEdgeApps(installationId: number) {
    return request(`${Endpoints.EdgeApp}/configured/${installationId}`, {});
}

export function GetEdgeAppInstance(installationId: number, instanceId: number) {
    return request(`${Endpoints.EdgeApp}/configured/${installationId}/${instanceId}`, {});
}

export type EmptyEdgeAppInstance = {
    app_id: number
    installation_id: number
    version: string
    config: { [key: string]: any }
    name: string
}

export type EdgeAppInstance = EmptyEdgeAppInstance & Identifier & CreationDate

export function CreateEdgeAppInstance(instanceData: EmptyEdgeAppInstance) {
    return request(
        `${Endpoints.EdgeApp}/configured/${instanceData.installation_id}`, {
            method: 'POST', body: JSON.stringify(instanceData)
        });
}

export function UpdateEdgeAppInstance(instanceData: EdgeAppInstance) {
    return request(
        `${Endpoints.EdgeApp}/configured/${instanceData.installation_id}/${instanceData.id}`, {
            method: 'PUT', body: JSON.stringify(instanceData)
        });
}

export function RemoveEdgeAppInstance(installationId: number, instanceId: number) {
    return request<OKResponse>(
        `${Endpoints.EdgeApp}/configured/${installationId}/${instanceId}`, {
            method: 'DELETE'
        }
    );
}
