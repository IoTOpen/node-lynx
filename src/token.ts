import type {LynxClient} from './client';
import type {Identifier, OKResponse} from './types';
import {Endpoints} from './util';

export interface TokenAccess {
    ip: string
    agent: string
    last_accessed: number
}

export interface EmptyToken {
    expire: number
    session_timeout: number
    name: string
    permissions?: string[]
    length?: number
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
    return this.requestJson<Token[]>(Endpoints.Token);
}

export function DeleteToken(this: LynxClient, token: Token, userid: number | 'me' = 'me') {
    return this.requestJson<OKResponse>(`${Endpoints.User}/${userid}/security/token/${token.id}`, {
        method: 'DELETE',
    });
}

export function CreateToken(this: LynxClient, token: EmptyToken, userid: number | 'me' = 'me') {
    return this.requestJson<Token>(`${Endpoints.User}/${userid}/security/token`, {
        method: 'POST',
        body: JSON.stringify(token)
    });
}
