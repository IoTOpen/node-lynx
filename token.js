import {Endpoints, request} from "./util";

export const GetTokens = () => request(Endpoints.Token, {});

export const DeleteToken = (token) => request(Endpoints.Token + "/" + token.id, {
    method: 'DELETE',
});

export const CreateToken = (token) => request(Endpoints.Token, {
    method: 'POST',
    body: JSON.stringify(token),
});