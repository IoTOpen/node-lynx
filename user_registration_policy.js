import {Endpoints, request} from "./util";

export const CreateUserRegistrationPolicy = (policy) => request(Endpoints.UserRegistrationPolicy, {
    method: 'POST', body: JSON.stringify(policy),
});
export const DeleteUserRegistrationPolicy = (policy) => request(Endpoints.UserRegistrationPolicy + "/" + policy.id, {
    method: 'DELETE',
});

export const GetUserRegistrationPolicies = () => request(Endpoints.UserRegistrationPolicy, {});
export const GetUserRegistrationPolicy = (id) => request(Endpoints.UserRegistrationPolicy + '/' + id, {});

export const UpdateUserRegistrationPolicy = (policy) => request(Endpoints.UserRegistrationPolicy, {
    method: 'PUT', body: JSON.stringify(policy),
});

