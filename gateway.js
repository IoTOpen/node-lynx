import {Endpoints, request} from "./util";

export const GetGatewayRegistrationPolicy = () => request(`${Endpoints.Gateway}/registration/policy`, {});
export const SetGatewayRegistrationPolicy = (policy) => request(`${Endpoints.Gateway}/registration/policy`, {
    method: 'PUT',
    body: JSON.stringify(policy),
});

export const ResetGatewayPassword = (installationId) => request(`${Endpoints.Gateway}/reset/${installationId}`, {
    method: 'POST',
});

export const CreateGatewayCredentials = (installationId) => request(`${Endpoints.Gateway}/credentials/${installationId}`, {
   method: 'POST'
});
