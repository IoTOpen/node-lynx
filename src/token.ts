import {Endpoints} from './util';
import {Identifier, OKResponse} from './types';
import {LynxClient} from './client';

export type TokenAccess = {
    ip: string
    agent: string
    last_accessed: number
}

export type EmptyToken = {
    expire: number
    session_timeout: number
    name: string
    permissions?: string[]
}

export type Token = EmptyToken & Identifier & {
    type: string
    created: number
    token: string
    accessed: TokenAccess[]
    last_used: number
    current: boolean
    agent: string
}

export function GetTokens(this: LynxClient) {
    return this.request<Token[]>(Endpoints.Token, {});
}

export function DeleteToken(this: LynxClient, token: Token) {
    return this.request<OKResponse>(`${Endpoints.Token}/${token.id}`, {
        method: 'DELETE',
    });
}

export function CreateToken(this: LynxClient, token: EmptyToken) {
    return this.request<Token>(Endpoints.Token, {
        method: 'POST',
        body: JSON.stringify(token),
    });
}
