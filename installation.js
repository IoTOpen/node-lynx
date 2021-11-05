import querystring from "querystring";
import {Endpoints, request} from "./util";

export const GetInstallations = (assignedOnly) => {
    let qs = assignedOnly ? '?assigned=' + assignedOnly : '';
    return request(Endpoints.InstallationInfo + qs, {});
}

export const GetInstallationRow = (installationId) => request(Endpoints.Installation + '/' + installationId, {});

export const ListInstallations = (filter) => {
    let qs = filter ? '?' + querystring.stringify(filter) : '';
    let url = Endpoints.Installation + qs;
    return request(url, {});
}

export const GetInstallation = (id) => {
    return request(Endpoints.InstallationInfo + '?assigned=false', {})
        .then((res) => {
            for (let installation of res) {
                if (installation.id === id) {
                    return installation;
                }
            }
            return null;
        })
}

export const GetInstallationByClientId = (clientId, assignedOnly) => {
    let qs = assignedOnly ? '?assigned=' + assignedOnly : '';
    return request(Endpoints.InstallationInfo + '/' + clientId + qs, {});
}