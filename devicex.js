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

