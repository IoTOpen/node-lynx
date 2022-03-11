import {Endpoints, request} from "./util";

export const GetGatewayRegistrationPolicy = () => request(Endpoints.GatewayRegistrationPolicy, {});
export const SetGatewayRegistrationPolicy = (policy) => request(Endpoints.GatewayRegistrationPolicy, {
    method: 'PUT',
    body: JSON.stringify(policy),
});