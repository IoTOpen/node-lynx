import {Endpoints, request} from './util';
import {Identifier, OKResponse} from './types';

export type EmptyRole = {
    name: string
    priority: number
    permissions: { [key: string]: boolean }
}

export type Role = EmptyRole & Identifier

export function GetRoles() {
    return request<Role[]>(Endpoints.Role, {});
}

export function GetRole(id: number) {
    return request<Role>(`${Endpoints.Role}/${id}`, {});
}

export function CreateRole(role: EmptyRole) {
    return request<Role>(Endpoints.Role, {
        method: 'POST', body: JSON.stringify(role)
    });
}

export function UpdateRole(role: Role) {
    return request<Role>(`${Endpoints.Role}/${role.id}`, {
        method: 'PUT', body: JSON.stringify(role)
    });
}

export function DeleteRole(role: Role) {
    return request<OKResponse>(`${Endpoints.Role}/${role.id}`, {
        method: 'DELETE'
    });
}
