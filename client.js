const fetch = require("node-fetch");
const querystring = require("querystring");

const Endpoints = {
    FunctionX: '/api/v2/functionx/',
    DeviceX: '/api/v2/devicex/',
    Status: '/api/v2/status/',
    LogV3: '/api/v3beta/log/',
    InstallationInfo: '/api/v2/installationinfo',
    Installation: '/api/v2/installation',
    Notification: '/api/v2/notification/',
    Organization: '/api/v2/organization',
    Schedule: '/api/v2/schedule/',
    User: '/api/v2/user',
    EdgeApp: '/api/v2/edge/app',


}

export const LogOrder = {
    Desc: 'desc',
    Asc: 'asc'
}

class LynxClient {
    constructor(baseURL, apiKey) {
        this.baseURL = baseURL.replace(/\/$/, "");
        this.apiKey = apiKey;
    }

    request = (endpoint, options) => {
        let url = this.baseURL + endpoint;
        let headers = {
            'Content-Type': 'application/json',
            'X-API-Key': this.apiKey
        }

        let config = {
            ...options,
            headers: headers
        }

        return fetch(url, config)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error(res.status + ':' + res.statusText);
            });
    };

    getFunctions = (installationId, filter) => {
        let qs = filter ? '?' + querystring.stringify(filter) : '';
        let url = Endpoints.FunctionX + installationId + qs;
        return this.request(url, {});
    };

    getFunction = (installationId, id) => {
        let url = Endpoints.FunctionX + installationId + '/' + id;
        return this.request(url, {});
    };

    getDevices = (installationId, filter) => {
        let qs = filter ? '?' + querystring.stringify(filter) : '';
        let url = Endpoints.DeviceX + installationId + qs;
        return this.request(url, {});
    };

    getDevice = (installationId, id) => {
        let url = Endpoints.DeviceX + installationId + '/' + id;
        return this.request(url, {});
    };

    getInstallations = (assignedOnly) => {
        let qs = assignedOnly ? '?assigned=' + assignedOnly : '';
        return this.request(Endpoints.InstallationInfo + qs, {});
    }

    getInstallationRow = (installationId) => this.request(Endpoints.Installation + '/' + installationId, {});

    listInstallations = (filter) => {
        let qs = filter ? '?' + querystring.stringify(filter) : '';
        let url = Endpoints.Installation + qs;
        return this.request(url, {});
    }

    getInstallation = (id) => {
        this.request(Endpoints.InstallationInfo + '?assigned=false', {})
            .then((res) => {
                for (let installation of res) {
                    if (installation.id === id) {
                        return installation;
                    }
                }
                return null;
            })
    }

    getInstallationByClientId = (clientId, assignedOnly) => {
        let qs = assignedOnly ? '?assigned=' + assignedOnly : '';
        return this.request(Endpoints.InstallationInfo + '/' + clientId + qs, {});
    }


    getStatus = (installationId, topicFilter) => {
        let qs = topicFilter ? '?' + topicFilter.reduce((prev, cur, id) => {
            if (id !== 0) {
                prev += '&';
            }
            return prev + 'topics=' + cur;
        }, '') : '';
        return this.request(Endpoints.Status + installationId + qs, {});
    }

    getLog = (installationId, from, to, limit, offset, order, topics) => {
        let now = new Date().getTime() / 1000;
        from = from ? from : now - (60 * 60 * 24);
        to = to ? to : now;
        limit = limit ? limit : 500;
        offset = offset ? offset : 0;
        order = order ? order : LogOrder.Desc;
        topics = topics ? topics : '';

        let params = {
            from: from,
            to: to,
            limit: limit,
            offset: offset,
            order: order,
            topics: topics
        };
        let qs = '?' + querystring.stringify(params);
        return this.request(Endpoints.LogV3 + installationId + qs, {});
    }

    getNotificationMessage = (installationId, id) => this.request(Endpoints.Notification + installationId + '/message/' + id, {});

    getNotificationOutput = (installationId, id) => this.request(Endpoints.Notification + installationId + '/output/' + id, {});

    getNotificationOutputExecutors = (installationId) => this.request(Endpoints.Notification + installationId + '/executor', {});

    getNotificationOutputExecutor = (installationId, id) => this.request(Endpoints.Notification + installationId + '/executor/' + id, {});

    listOrganizations = (minimal) => {
        let qs = minimal ? '?minimal=' + minimal : '';
        return this.request(Endpoints.Organization + qs, {});
    }

    getOrganization = (id) => this.request(Endpoints.Organization + '/' + id, {})

    getSchedules = (installationId, executor) => {
        let qs = executor ? '?executor=' + executor : '';
        return this.request(Endpoints.Schedule + installationId + qs);
    }

    getSchedule = (installationId, id) => this.request(Endpoints.Schedule + installationId + '/' + id, {});

    getMe = () => this.request(Endpoints.User + '/me', {});

    getUser = (id) => this.request(Endpoints.User + '/' + id, {});

    getUsers = (filter) => {
        let qs = filter ? '?' + querystring.stringify(filter) : '';
        return this.request(Endpoints.User + qs, {});
    }

    getEdgeApps = () => this.request(Endpoints.EdgeApp, {});

    getEdgeApp = (id) => this.request(Endpoints.EdgeApp + '/' + id, {});

    getEdgeAppVersions = (appId, untagged) => {
        let qs = untagged ? '?untagged=' + untagged : '';
        return this.request(Endpoints.EdgeApp + '/' + appId + '/versions', {});
    }

    getEdgeAppConfigOptions = (id, version) => {
        let qs = '?version=' + version;
        return this.request(Endpoints.EdgeApp + '/' + id + '/configure' + qs, {});
    }

    getConfiguredEdgeApps = (installationId) => this.request(Endpoints.EdgeApp + '/configured/' + installationId, {});

    getEdgeAppInstance = (installationId, instanceId) => this.request(Endpoints.EdgeApp + '/configured/' + installationId + '/' + instanceId, {})
}

module.exports.LynxClient = LynxClient;
