import {Endpoints} from './util';
import {CreationDate, Identifier, Metadata, OKResponse} from './types';
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

export type EdgeAppVersion = {
    name: string
    hash: string
    timestamp: number
}

export function GetEdgeAppPublisher(this: LynxClient, organizationId: number) {
    return this.requestJson<Publisher>(`${Endpoints.EdgePublisher}/${organizationId}`);
}

export function GetEdgeAppOrganization(this: LynxClient, organizationId: number, available?: boolean) {
    const qs = available ? `?${new URLSearchParams({available: String(available)})}` : '';
    const path = `${Endpoints.EdgeApp}/organization/${organizationId}${qs}`;
    return this.requestJson<EdgeApp[]>(path);
}

export function GetEdgeApps(this: LynxClient) {
    return this.requestJson<EdgeApp[]>(Endpoints.EdgeApp);
}

export function GetEdgeApp(this: LynxClient, id: number) {
    return this.requestJson<EdgeApp>(`${Endpoints.EdgeApp}/${id}`);
}


export function CreateEdgeApp(this: LynxClient, app: EmptyEdgeApp) {
    return this.requestJson<EdgeApp>(`${Endpoints.EdgeApp}`, {
        method: 'POST',
        body: JSON.stringify(app)
    });
}

export function UpdateEdgeApp(this: LynxClient, app: EdgeApp) {
    return this.requestJson<EdgeApp>(`${Endpoints.EdgeApp}/${app.id}`, {
        method: 'PUT',
        body: JSON.stringify(app)
    });
}

export function GetEdgeAppVersions(this: LynxClient, id: number, untagged?: boolean) {
    const qs = untagged ? `?untagged=${untagged}` : '';
    return this.requestJson<EdgeAppVersion[]>(`${Endpoints.EdgeApp}/${id}/version${qs}`);
}

export function NameEdgeAppVersion(this: LynxClient, id: number, name: string, hash: string) {
    return this.requestJson<EdgeAppVersion>(`${Endpoints.EdgeApp}/${id}/publish`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            hash,
        })
    });
}

export function CreateEdgeAppVersion(this: LynxClient, id: number, appJson?: object | string | Blob, appLua?: string | Blob) {
    const data = new FormData();
    let appData: Blob;
    if (appJson !== undefined) {
        if (appJson instanceof Blob) {
            appData = appJson;
        } else if (typeof appJson === 'string') {
            appData = new Blob([appJson]);
        } else {
            appData = new Blob([JSON.stringify(appJson, null, 2)]);
        }
        data.append('app_json', appData, 'app.json');
    }
    if (appLua !== undefined) {
        if (typeof appLua === 'string') {
            appLua = new Blob([appLua]);
        }
        data.append('app_lua', appLua, 'app.lua');
    }
    return this.requestNull<EdgeAppVersion>(`${Endpoints.EdgeApp}/${id}/version`, {
        method: 'POST',
        body: data
    });
}

export function DownloadEdgeApp(this: LynxClient, id: number, version: string) {
    return this.requestBlob(`${Endpoints.EdgeApp}/${id}/download?version=${encodeURIComponent(version)}`);
}

export type EdgeAppInput = {
    type: string
    name: string
    description: string
    required?: boolean
    value?: boolean
    values?: {
        [key: string]: any
    }
    default?: any
    filter?: Metadata
    allow_add?: boolean
    validator?: RegExp
    on_error?: string
    min?: number
    max?: number
    false_value?: any
    true_value?: any
    input_fields?: string[]
    [key: string]: any
}

export type Guide = {
    id: string
    title: string
    description: string
    input_fields: string[],
    [key: string]: any
};

export type EdgeAppOptions = {
    author: string
    license: string
    input: {
        [key: string]: EdgeAppInput
    }
    guide: Guide[]
    [key: string]: any
};

export function GetEdgeAppConfigOptions(this: LynxClient, id: number, version: string) {
    const qs = `?version=${version}`;
    return this.requestJson<EdgeAppOptions>(`${Endpoints.EdgeApp}/${id}/configure${qs}`);
}

export function GetConfiguredEdgeApps(this: LynxClient, installationId: number) {
    return this.requestJson<EdgeAppInstance[]>(`${Endpoints.EdgeApp}/configured/${installationId}`);
}

export function GetEdgeAppInstance(this: LynxClient, installationId: number, instanceId: number) {
    return this.requestJson<EdgeAppInstance>(`${Endpoints.EdgeApp}/configured/${installationId}/${instanceId}`);
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
    return this.requestJson<EdgeAppInstance>(
        `${Endpoints.EdgeApp}/configured/${instanceData.installation_id}`, {
            method: 'POST', body: JSON.stringify(instanceData)
        });
}

export function UpdateEdgeAppInstance(this: LynxClient, instanceData: EdgeAppInstance) {
    return this.requestJson<EdgeAppInstance>(
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
