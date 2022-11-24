import {Endpoints} from './util';
import {Identifier, OKResponse} from './types';
import {LynxClient} from './client';

export type EmptyRole = {
    name: string
    priority: number
    permissions: { [key: string]: boolean }
}

export type Role = EmptyRole & Identifier

export function GetRoles(this: LynxClient) {
    return this.request<Role[]>(Endpoints.Role, {});
}

export function GetRole(this: LynxClient, id: number) {
    return this.request<Role>(`${Endpoints.Role}/${id}`, {});
}

export function CreateRole(this: LynxClient, role: EmptyRole) {
    return this.request<Role>(Endpoints.Role, {
        method: 'POST', body: JSON.stringify(role)
    });
}

export function UpdateRole(this: LynxClient, role: Role) {
    return this.request<Role>(`${Endpoints.Role}/${role.id}`, {
        method: 'PUT', body: JSON.stringify(role)
    });
}

export function DeleteRole(this: LynxClient, role: Role) {
    return this.request<OKResponse>(`${Endpoints.Role}/${role.id}`, {
        method: 'DELETE'
    });
}
