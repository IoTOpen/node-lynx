import {Endpoints, request} from './util';
import {OKResponse} from './types';

export type GatewayInformation = {
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

export type GatewayRegistrationPolicy = {
    allow_unregistered: boolean
    default_organization_id: 10
}

export const GetGatewayRegistrationPolicy = () => request<GatewayRegistrationPolicy>(
    `${Endpoints.Gateway}/registration/policy`, {});
export const SetGatewayRegistrationPolicy = (policy: GatewayRegistrationPolicy) => request<GatewayRegistrationPolicy>(
    `${Endpoints.Gateway}/registration/policy`, {
        method: 'PUT',
        body: JSON.stringify(policy),
    });

export const ResetGatewayPassword = (installationId: number) => request<OKResponse>(
    `${Endpoints.Gateway}/reset/${installationId}`, {
        method: 'POST',
    });

export const CreateGatewayCredentials = (installationId: number) => request<GatewayInformation>(
    `${Endpoints.Gateway}/credentials/${installationId}`, {
        method: 'POST'
    });
