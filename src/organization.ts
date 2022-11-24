import {Endpoints} from './util';
import {Address, Identifier, Metadata, OKResponse} from './types';
import {LynxClient} from './client';

type OrganizationChild = {
    id: number
    name: string
}

export type OrganizationSimple = {
    id: number
    name: string
    parent: string
}

export type EmptyOrganization = {
    name: string
    address: Address
    email: string
    phone: string
    force_sms_login: boolean
    parent: number
    children: OrganizationChild[]
    notes: string
    meta: Metadata
    protected_meta: Metadata
}

export type Organization = EmptyOrganization & Identifier

export function GetOrganizations(this: LynxClient, minimal?: boolean) {
    if (minimal) {
        const qs = `?minimal=${minimal}`;
        return this.request<OrganizationSimple[]>(`${Endpoints.Organization}${qs}`, {});
    }
    return this.request<Organization[]>(Endpoints.Organization, {});
}

export function GetOrganization(this: LynxClient, id: number) {
    return this.request<Organization>(
        `${Endpoints.Organization}/${id}`, {});
}

export function CreateOrganization(this: LynxClient, org: EmptyOrganization) {
    return this.request<Organization>(
        Endpoints.Organization, {
            method: 'POST', body: JSON.stringify(org)
        });
}

export function UpdateOrganization(this: LynxClient, org: Organization) {
    return this.request<Organization>(
        `${Endpoints.Organization}/${org.id}`, {
            method: 'PUT', body: JSON.stringify(org)
        });
}

export function DeleteOrganization(this: LynxClient, org: Organization) {
    return this.request<OKResponse>(
        `${Endpoints.Organization}/${org.id}`, {
            method: 'DELETE'
        });
}
