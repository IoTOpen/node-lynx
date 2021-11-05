import {Endpoints, request} from "./util";

export const GetEdgeApps = () => request(Endpoints.EdgeApp, {});

export const GetEdgeApp = (id) => request(Endpoints.EdgeApp + '/' + id, {});

export const GetEdgeAppVersions = (appId, untagged) => {
    let qs = untagged ? '?untagged=' + untagged : '';
    return request(Endpoints.EdgeApp + '/' + appId + '/versions', {});
}

export const GetEdgeAppConfigOptions = (id, version) => {
    let qs = '?version=' + version;
    return request(Endpoints.EdgeApp + '/' + id + '/configure' + qs, {});
}

export const GetConfiguredEdgeApps = (installationId) => request(Endpoints.EdgeApp + '/configured/' + installationId, {});

export const GetEdgeAppInstance = (installationId, instanceId) => request(Endpoints.EdgeApp + '/configured/' + installationId + '/' + instanceId, {})
