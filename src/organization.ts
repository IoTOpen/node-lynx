import {Endpoints} from './util';
import {Address, Identifier, Metadata, MetaLike, OKResponse} from './types';
import {LynxClient} from './client';

export type OrganizationChild = {
    id: number
    name: string
}

export type OrganizationSimple = {
    id: number
    name: string
    parent: string
}

export type EmptyOrganization = MetaLike & {
    name: string
    address: Address
    email: string
    phone: string
    force_sms_login: boolean
    parent: number
    children: OrganizationChild[]
    notes: string
}

export type Organization = EmptyOrganization & Identifier

export function GetOrganizations(this: LynxClient, minimal?: boolean) {
    if (minimal) {
        const qs = `?minimal=${minimal}`;
        return this.requestJson<OrganizationSimple[]>(`${Endpoints.Organization}${qs}`);
    }
    return this.requestJson<Organization[]>(Endpoints.Organization);
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
