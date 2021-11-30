import {Endpoints, request} from "./util";

export const GetRoles = () => request(Endpoints.Role, {});

export const GetRole = (id) => request(Endpoints.Role + '/' + id, {});

export const CreateRole = (role) => request(Endpoints.Role, {
    method: 'POST', body: JSON.stringify(role)
});

export const UpdateRole = (role) => request(Endpoints.Role + '/' + role.id, {
    method: 'PUT', body: JSON.stringify(role)
});

export const DeleteRole = (role) => request(Endpoints.Role + '/' + role.id, {
    method: 'DELETE'
});