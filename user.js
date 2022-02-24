import querystring from "querystring";
import {Endpoints, request} from "./util";

export const GetMe = () => request(Endpoints.User + '/me', {});

export const GetUser = (id) => request(Endpoints.User + '/' + id, {});

export const GetUsers = (filter) => {
    let qs = filter ? '?' + querystring.stringify(filter) : '';
    return request(Endpoints.User + qs, {});
}

export const CreateUser = (user) => request(Endpoints.User, {
    method: 'POST', body: JSON.stringify(user)
});

export const UpdateUser = (user) => request(Endpoints.User + '/' + user.id, {
    method: 'PUT', body: JSON.stringify(user)
});

export const DeleteUser = (user) => request(Endpoints.User + '/' + user.id, {
    method: 'DELETE'
});

export const ChangePassword = (passwordData) => request(Endpoints.User + '/password', {
    method: 'PUT',
    body: JSON.stringify(passwordData),
})