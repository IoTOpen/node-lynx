import {Endpoints} from './util';
import {CreationDate, Identifier, OKResponse} from './types';
import {LynxClient} from './client';

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

export function GetEdgeApps(this: LynxClient) {
    return this.requestJson<EdgeApp[]>(Endpoints.EdgeApp);
}

export function GetEdgeApp(this: LynxClient, id: number) {
    return this.requestJson<EdgeApp>(`${Endpoints.EdgeApp}/${id}`);
}

export function GetEdgeAppVersions(this: LynxClient, appId: number, untagged?: boolean) {
    const qs = untagged ? `?untagged=${untagged}` : '';
    return this.requestJson(`${Endpoints.EdgeApp}/${appId}/version${qs}`);
}

export function GetEdgeAppConfigOptions(this: LynxClient, id: number, version: string) {
    const qs = `?version=${version}`;
    return this.requestJson<any>(`${Endpoints.EdgeApp}/${id}/configure${qs}`);
}

export function GetConfiguredEdgeApps(this: LynxClient, installationId: number) {
    return this.requestJson(`${Endpoints.EdgeApp}/configured/${installationId}`);
}

export function GetEdgeAppInstance(this: LynxClient, installationId: number, instanceId: number) {
    return this.requestJson(`${Endpoints.EdgeApp}/configured/${installationId}/${instanceId}`);
}

export type EmptyEdgeAppInstance = {
    app_id: number
    installation_id: number
    version: string
    config: { [key: string]: any }
    name: string
}

export type EdgeAppInstance = EmptyEdgeAppInstance & Identifier & CreationDate

export function CreateEdgeAppInstance(this: LynxClient, instanceData: EmptyEdgeAppInstance) {
    return this.requestJson(
        `${Endpoints.EdgeApp}/configured/${instanceData.installation_id}`, {
            method: 'POST', body: JSON.stringify(instanceData)
        });
}

export function UpdateEdgeAppInstance(this: LynxClient, instanceData: EdgeAppInstance) {
    return this.requestJson(
        `${Endpoints.EdgeApp}/configured/${instanceData.installation_id}/${instanceData.id}`, {
            method: 'PUT', body: JSON.stringify(instanceData)
        });
}

export function RemoveEdgeAppInstance(this: LynxClient, installationId: number, instanceId: number) {
    return this.requestJson<OKResponse>(
        `${Endpoints.EdgeApp}/configured/${installationId}/${instanceId}`, {
            method: 'DELETE'
        }
    );
}
