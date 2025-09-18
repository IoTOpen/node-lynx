import type {LynxClient} from './client';
import type {Identifier, OKResponse, PermissionMap} from './types';
import {Endpoints} from './util';

export interface EmptyRole {
    name: string
    priority: number
    permissions: PermissionMap
}

export type Role = EmptyRole & Identifier

export function GetRoles(this: LynxClient) {
    return this.requestJson<Role[]>(Endpoints.Role);
}

export function GetRole(this: LynxClient, id: number) {
    return this.requestJson<Role>(`${Endpoints.Role}/${id}`);
}

export function CreateRole(this: LynxClient, role: EmptyRole) {
    return this.requestJson<Role>(Endpoints.Role, {
        method: 'POST', body: JSON.stringify(role)
    });
}

export function UpdateRole(this: LynxClient, role: Role) {
    return this.requestJson<Role>(`${Endpoints.Role}/${role.id}`, {
        method: 'PUT', body: JSON.stringify(role)
    });
}

export function DeleteRole(this: LynxClient, role: Role) {
    return this.requestJson<OKResponse>(`${Endpoints.Role}/${role.id}`, {
        method: 'DELETE'
    });
}
