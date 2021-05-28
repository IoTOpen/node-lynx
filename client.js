const fetch = require("node-fetch");
const querystring = require("querystring");

const Endpoints = {
    FunctionX: '/api/v2/functionx/',
    Status: '/api/v2/status/',
    InstallationInfo: '/api/v2/installationinfo',
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

                throw new Error(res.status + ":" + res.statusText);
            });
    };

    getFunctions = (installationId, filter) => {
        let qs = filter ? "?" + querystring.stringify(filter) : "";
        let url = Endpoints.FunctionX + installationId + qs;
        return this.request(url, {})
    };

    getFunction = (installationId, functionId) => {
        let url = Endpoints.FunctionX + installationId + "/" + functionId;
        return this.request(url, {});
    };

    getInstallations = () => this.request(Endpoints.InstallationInfo, {});

    getStatus = (installationId, topicFilter) => {
        let qs = topicFilter ? "?" + topicFilter.reduce((prev, cur, id) => {
            if (id !== 0) {
                prev += "&"
            }
            return prev + "topics=" + cur
        }, "") : ""
        let url = Endpoints.Status + installationId + qs
        return this.request(url, {})
    }
}

module.exports.LynxClient = LynxClient;
