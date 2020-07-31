'use strict';

const fetch = require("node-fetch");
const querystring = require("querystring")

const Endpoints = {
    FunctionX: '/api/v2/functionx/',
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

                throw new Error(res);
            });
    };

    getFunctions = (installationID, filter) => {
        let qs = filter ? "?" + querystring.stringify(filter) : "";
        let url = Endpoints.FunctionX + installationID + qs;
        return this.request(url, {})
    };

    getInstallations = () => this.request(Endpoints.InstallationInfo, {});
}

module.exports.LynxClient = LynxClient;