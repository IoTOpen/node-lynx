import {Endpoints, request} from "./util";

export const GetInstallations = (assignedOnly) => {
    let qs = assignedOnly ? '?assigned=' + assignedOnly : '';
    return request(Endpoints.InstallationInfo + qs, {});
}

export const GetInstallationRow = (installationId) => request(Endpoints.Installation + '/' + installationId, {});

export const ListInstallations = (filter) => {
    let qs = filter ? '?' + new URLSearchParams(filter).toString() : '';
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

export const CreateInstallation = (installation) => request(Endpoints.Installation, {
    method: 'POST', body: JSON.stringify(installation)
});

export const UpdateInstallation = (installation) => request(Endpoints.Installation + '/' + installation.id, {
    method: 'PUT', body: JSON.stringify(installation)
});

export const DeleteInstallation = (installation) => request(Endpoints.Installation + '/' + installation.id, {
    method: 'DELETE'
});
