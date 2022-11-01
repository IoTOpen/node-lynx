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

export const GetEdgeApps = () => request<EdgeApp[]>(Endpoints.EdgeApp, {});

export const GetEdgeApp = (id: number) => request<EdgeApp>(Endpoints.EdgeApp + '/' + id, {});

export const GetEdgeAppVersions = (appId: number, untagged?: boolean) => {
    const qs = untagged ? '?untagged=' + untagged : '';
    return request(Endpoints.EdgeApp + '/' + appId + '/version' + qs, {});
};

export const GetEdgeAppConfigOptions = (id: number, version: string) => {
    const qs = '?version=' + version;
    return request<any>(Endpoints.EdgeApp + '/' + id + '/configure' + qs, {});
};

export const GetConfiguredEdgeApps = (installationId: number) => request(Endpoints.EdgeApp + '/configured/' + installationId, {});

export const GetEdgeAppInstance = (installationId: number, instanceId: number) => request(Endpoints.EdgeApp + '/configured/' + installationId + '/' + instanceId, {});

export type EmptyEdgeAppInstance = {
    app_id: number
    installation_id: number
    version: string
    config: { [key: string]: any }
    name: string
}

export type EdgeAppInstance = EmptyEdgeAppInstance & Identifier & CreationDate

export const CreateEdgeAppInstance = (instanceData: EmptyEdgeAppInstance) => request(
    Endpoints.EdgeApp + '/configured/' + instanceData.installation_id, {
        method: 'POST', body: JSON.stringify(instanceData)
    });

export const UpdateEdgeAppInstance = (instanceData: EdgeAppInstance) => request(
    Endpoints.EdgeApp + '/configured/' + instanceData.installation_id + '/' + instanceData.id, {
        method: 'PUT', body: JSON.stringify(instanceData)
    });

export const RemoveEdgeAppInstance = (installationId: number, instanceId: number) => request<OKResponse>(
    Endpoints.EdgeApp + '/configured/' + installationId + '/' + instanceId, {
        method: 'DELETE'
    }
);