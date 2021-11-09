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

export const CreateFunction = (func) => {
    return fetch(Endpoints.FunctionX + '/'
        + func.installation_id, {
        method: 'POST',
        body: JSON.stringify(func)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.status + ':' + res.statusText);
    });
}

export const UpdateFunction = (func) => {
    return fetch(Endpoints.FunctionX + '/'
        + func.installation_id + '/' + func.id, {
        method: 'PUT',
        body: JSON.stringify(func)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.status + ':' + res.statusText);
    });
}

export const DeleteFunction = (func) => {
    return fetch(Endpoints.FunctionX + '/'
        + func.installation_id + '/' + func.id, {
        method: 'DELETE'
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.status + ':' + res.statusText);
    });
}