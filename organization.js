import {Endpoints, request} from "./util";

export const GetOrganizations = (minimal) => {
    let qs = minimal ? '?minimal=' + minimal : '';
    return request(Endpoints.Organization + qs, {});
}

export const GetOrganization = (id) => request(Endpoints.Organization + '/' + id, {})
