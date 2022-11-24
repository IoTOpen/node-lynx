import {Endpoints, request} from './util';
import {Address, Identifier, Metadata, OKResponse} from './types';

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

export function GetOrganizations(minimal?: boolean) {
    if (minimal) {
        const qs = `?minimal=${minimal}`;
        return request<OrganizationSimple[]>(`${Endpoints.Organization}${qs}`, {});
    }
    return request<Organization[]>(Endpoints.Organization, {});
}

export function GetOrganization(id: number) {
    return request<Organization>(
        `${Endpoints.Organization}/${id}`, {});
}

export function CreateOrganization(org: EmptyOrganization) {
    return request<Organization>(
        Endpoints.Organization, {
            method: 'POST', body: JSON.stringify(org)
        });
}

export function UpdateOrganization(org: Organization) {
    return request<Organization>(
        `${Endpoints.Organization}/${org.id}`, {
            method: 'PUT', body: JSON.stringify(org)
        });
}

export function DeleteOrganization(org: Organization) {
    return request<OKResponse>(
        `${Endpoints.Organization}/${org.id}`, {
            method: 'DELETE'
        });
}
