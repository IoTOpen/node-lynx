import {Endpoints, request} from './util';
import {Identifier, OKResponse} from './types';

export type EmptyRole = {
    name: string
    priority: number
    permissions: { [key: string]: boolean }
}

export type Role = EmptyRole & Identifier

export const GetRoles = () => request<Role[]>(Endpoints.Role, {});

export const GetRole = (id: number) => request<Role>(Endpoints.Role + '/' + id, {});

export const CreateRole = (role: EmptyRole) => request<Role>(Endpoints.Role, {
    method: 'POST', body: JSON.stringify(role)
});

export const UpdateRole = (role: Role) => request<Role>(Endpoints.Role + '/' + role.id, {
    method: 'PUT', body: JSON.stringify(role)
});

export const DeleteRole = (role: Role) => request<OKResponse>(Endpoints.Role + '/' + role.id, {
    method: 'DELETE'
});
