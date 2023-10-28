import {Endpoints} from './util';
import {LynxClient} from './client';
import {OKResponse} from './types';
import {User} from './user';

export type EmptyOAuth2Client = {
    name: string
    trusted: boolean
    allowed_scopes: string[]
    icon_uri: string
    tos_uri: string
    policy_uri: string
    redirect_uris: string[]
    id_token_alg: string
    kid: string
}

export type OAuth2Client = EmptyOAuth2Client & {
    id: string
    client_secret?: string
    created: number
    updated: number
}

export type OAuth2Scope = {
    scope: string
    description: string
}

export type OAuth2Consent = {
    id: string
    oauth2_client_id: string
    scopes: string[]
}

export type ConsentAcceptResponse = {
    redirect_to: string
}

export function GetOAuth2Clients(this: LynxClient) {
    return this.requestJson<OAuth2Client[]>(`${Endpoints.OAuth2Admin}/client`);
}

export function DeleteOAuth2Client(this: LynxClient, client: OAuth2Client) {
    return this.requestJson<OKResponse>(
        `${Endpoints.OAuth2Admin}/client/${client.id}`, {
            method: 'DELETE',
        });
}

export function GetIDTokenAlgorithms(this: LynxClient) {
    return this.requestJson<string[]>(`${Endpoints.OAuth2}/algs`);
}

export function GetOAuth2Client(this: LynxClient, id: string) {
    return this.requestJson<OAuth2Client>(
        `${Endpoints.OAuth2Admin}/client/${id}`);
}

export function CreateOAuth2Client(this: LynxClient, client: EmptyOAuth2Client) {
    return this.requestJson<OAuth2Client>(
        `${Endpoints.OAuth2Admin}/client`, {
            method: 'POST',
            body: JSON.stringify(client),
        });
}

export function UpdateOAuth2Client(this: LynxClient, client: OAuth2Client) {
    return this.requestJson<OAuth2Client>(
        `${Endpoints.OAuth2Admin}/client/${client.id}`, {
            method: 'PUT',
            body: JSON.stringify(client),
        });
}

export function ConsentOauth2Authorization(this: LynxClient, request: { [p: string]: string }) {
    return this.requestJson<ConsentAcceptResponse>(
        `${Endpoints.OAuth2}/consent`, {
            method: 'POST',
            body: JSON.stringify(request),
        });
}

export function GetUserOAuth2Consents(this: LynxClient, user: User) {
    return this.requestJson<OAuth2Consent[]>(`${Endpoints.User}/${user.id}/security/consent`);
}

export function DeleteUserOAuth2Consent(this: LynxClient, user: User, consent: OAuth2Consent) {
    return this.requestJson<OKResponse>(
        `${Endpoints.User}/${user.id}/security/consent/${consent.id}`, {
            method: 'DELETE',
        });
}

export function GetOAuth2Scopes(this: LynxClient) {
    return this.requestJson<OAuth2Scope[]>(`${Endpoints.OAuth2Admin}/scope`);
}
