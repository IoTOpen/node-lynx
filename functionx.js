import querystring from "querystring";
import {Endpoints, request} from "./util";

export const GetFunctions = (installationId, filter) => {
    let qs = filter ? '?' + querystring.stringify(filter) : '';
    let url = Endpoints.FunctionX + installationId + qs;
    return request(url, {});
};

export const GetFunction = (installationId, id) => {
    let url = Endpoints.FunctionX + installationId + '/' + id;
    return request(url, {});
};

