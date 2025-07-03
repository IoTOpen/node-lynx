import type {LynxClient} from './client';
import type {Address, Identifier, MetaObject,OKResponse, WithMeta} from './types';
import {Endpoints} from './util';

export interface OrganizationChild {
    id: number
    name: string
}

export interface OrganizationSimple {
    id: number
    name: string
    parent: string
}

export type EmptyOrganization = WithMeta & {
    name: string
    address: Address
    email: string
    phone: string
    force_sms_login: boolean
    parent: number
    children: OrganizationChild[]
    notes: string
    password_valid_days: number
}

export type Organization = EmptyOrganization & Identifier

export type MinimalOrg<T extends boolean> = T extends true ? OrganizationSimple : Organization;
export function GetOrganizations<T extends boolean = false>(this: LynxClient, minimal?: T) {
    if (minimal) {
        const qs = `?minimal=${minimal}`;
        return this.requestJson<OrganizationSimple[]>(`${Endpoints.Organization}${qs}`) as Promise<MinimalOrg<T>[]>;
    }
    return this.requestJson<Organization[]>(Endpoints.Organization) as Promise<MinimalOrg<T>[]>;
}

export function GetOrganization(this: LynxClient, id: number) {
    return this.requestJson<Organization>(
        `${Endpoints.Organization}/${id}`);
}

export function CreateOrganization(this: LynxClient, org: EmptyOrganization) {
    return this.requestJson<Organization>(
        Endpoints.Organization, {
            method: 'POST', body: JSON.stringify(org)
        });
}

export function UpdateOrganization(this: LynxClient, org: Organization) {
    return this.requestJson<Organization>(
        `${Endpoints.Organization}/${org.id}`, {
            method: 'PUT', body: JSON.stringify(org)
        });
}

export function DeleteOrganization(this: LynxClient, org: Organization) {
    return this.requestJson<OKResponse>(
        `${Endpoints.Organization}/${org.id}`, {
            method: 'DELETE'
        });
}

export function GetOrganizationMeta(this: LynxClient, userID: number, key: string) {
    return this.requestJson<MetaObject>(`${Endpoints.Organization}/${userID}/meta/${encodeURIComponent(key)}`);
}

export function CreateOrganizationMeta(this: LynxClient, orgID: number, key: string, data: MetaObject, silent = false) {
    const qs = `?${new URLSearchParams({silent: String(silent)})}`;
    const path = `${Endpoints.Organization}/${orgID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'POST', body: JSON.stringify(data)
    });
}

export function UpdateOrganizationMeta(this: LynxClient, orgID: number, key: string, data: MetaObject, silent = false, createMissing = false) {
    const qs = `?${new URLSearchParams({silent: String(silent), create_missing: String(createMissing)})}`;
    const path = `${Endpoints.Organization}/${orgID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'PUT', body: JSON.stringify(data)
    });
}

export function DeleteOrganizationMeta(this: LynxClient, orgID: number, key: string, silent = false) {
    const qs = `?${new URLSearchParams({silent: String(silent)})}`;
    const path = `${Endpoints.Organization}/${orgID}/meta/${encodeURIComponent(key)}${qs}`;
    return this.requestJson<MetaObject>(path, {
        method: 'DELETE'
    });
}
