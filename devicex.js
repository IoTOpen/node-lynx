import {Endpoints, request} from "./util";

export const GetDevices = (installationId, filter) => {
    let qs = filter ? '?' + new URLSearchParams(filter).toString() : '';
    let url = Endpoints.DeviceX + '/' + installationId + qs;
    return request(url, {});
};

export const GetDevice = (installationId, id) => request(Endpoints.DeviceX + '/' + installationId + '/' + id, {});

export const CreateDevice = (dev) => request(Endpoints.DeviceX + '/' + dev.installation_id, {
    method: 'POST', body: JSON.stringify(dev)
});

export const UpdateDevice = (dev) => request(Endpoints.DeviceX + '/' + dev.installation_id + '/' + dev.id, {
    method: 'PUT', body: JSON.stringify(dev)
});

export const DeleteDevice = (dev) => request(Endpoints.DeviceX + '/' + dev.installation_id + '/' + dev.id, {
    method: 'DELETE'
});
