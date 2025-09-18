import type {LynxClient} from './client';
import type {OKResponse} from './types';
import {Endpoints} from './util';

export interface GatewayInformation {
    client_id: number
    installation_id: number
    api: string
    aam: string
    mqtt_broker: string
    mqtt_username: string
    mqtt_password: string
    mqtt_client_id: string
    timezone: string
}

export interface GatewayRegistrationPolicy {
    allow_unregistered: boolean
    default_organization_id: 10
}

export function GetGatewayRegistrationPolicy(this: LynxClient) {
    return this.requestJson<GatewayRegistrationPolicy>(
        `${Endpoints.Gateway}/registration/policy`);
}

export function SetGatewayRegistrationPolicy(this: LynxClient, policy: GatewayRegistrationPolicy) {
    return this.requestJson<GatewayRegistrationPolicy>(
        `${Endpoints.Gateway}/registration/policy`, {
            method: 'PUT',
            body: JSON.stringify(policy),
        });
}

export function ResetGatewayPassword(this: LynxClient, installationId: number) {
    return this.requestJson<OKResponse>(
        `${Endpoints.Gateway}/reset/${installationId}`, {
            method: 'POST',
        });
}

export function CreateGatewayCredentials(this: LynxClient, installationId: number) {
    return this.requestJson<GatewayInformation>(
        `${Endpoints.Gateway}/credentials/${installationId}`, {
            method: 'POST'
        });
}
