import {Endpoints, request} from "./util";

export const GetOrganizations = (minimal) => {
    let qs = minimal ? '?minimal=' + minimal : '';
    return request(Endpoints.Organization + qs, {});
}

export const GetOrganization = (id) => request(Endpoints.Organization + '/' + id, {});

export const CreateOrganization = (org) => request(Endpoints.Organization, {
    method: 'POST', body: JSON.stringify(org)
});

export const UpdateOrganization = (org) => request(Endpoints.Organization + '/' + org.id, {
    method: 'PUT', body: JSON.stringify(org)
});

export const DeleteOrganization = (org) => request(Endpoints.Organization + '/' + org.id, {
    method: 'DELETE'
});