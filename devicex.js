import querystring from "querystring";
import {Endpoints, request} from "./util";

export const GetDevices = (installationId, filter) => {
    let qs = filter ? '?' + querystring.stringify(filter) : '';
    let url = Endpoints.DeviceX + installationId + qs;
    return request(url, {});
};

export const GetDevice = (installationId, id) => {
    let url = Endpoints.DeviceX + installationId + '/' + id;
    return request(url, {});
};

export const CreateDevice = (dev) => {
    return fetch(Endpoints.DeviceX + '/'
        + dev.installation_id, {
        method: 'POST',
        body: JSON.stringify(dev)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.status + ':' + res.statusText);
    });
}

export const UpdateDevice = (dev) => {
    return fetch(Endpoints.DeviceX + '/'
        + dev.installation_id + '/' + dev.id, {
        method: 'PUT',
        body: JSON.stringify(dev)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.status + ':' + res.statusText);
    });
}

export const DeleteDevice = (dev) => {
    return fetch(Endpoints.DeviceX + '/'
        + dev.installation_id + '/' + dev.id, {
        method: 'DELETE'
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.status + ':' + res.statusText);
    });
}