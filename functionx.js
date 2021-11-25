import querystring from "querystring";
import {Endpoints, request} from "./util";

export const GetFunctions = (installationId, filter) => {
    let qs = filter ? '?' + querystring.stringify(filter) : '';
    let url = Endpoints.FunctionX + '/' + installationId + qs;
    return request(url, {});
};

export const GetFunction = (installationId, id) => request(Endpoints.FunctionX + '/' + installationId + '/' + id, {});

export const CreateFunction = (func) => request(Endpoints.FunctionX + '/' + func.installation_id, {
    method: 'POST', body: JSON.stringify(func)
});

export const UpdateFunction = (func) => request(Endpoints.FunctionX + '/' + func.installation_id + '/' + func.id, {
    method: 'PUT', body: JSON.stringify(func)
});

export const DeleteFunction = (func) => request(Endpoints.FunctionX + '/' + func.installation_id + '/' + func.id, {
    method: 'DELETE'
});