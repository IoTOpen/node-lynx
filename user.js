import querystring from "querystring";
import {Endpoints, request} from "./util";

export const GetMe = () => request(Endpoints.User + '/me', {});

export const GetUser = (id) => request(Endpoints.User + '/' + id, {});

export const GetUsers = (filter) => {
    let qs = filter ? '?' + querystring.stringify(filter) : '';
    return request(Endpoints.User + qs, {});
}

