import {Identifier, OKResponse} from './types';
import {Endpoints} from './util';
import {LynxClient} from './client';

export type EmptyTopicBlacklist = {
    topic: string
    regex: boolean
    enabled: boolean
    reason: string
    counter: number
}

export type TopicBlacklist = EmptyTopicBlacklist & Identifier

export function GetTopicBlacklist(this: LynxClient) {
    return this.requestJson<TopicBlacklist[]>(Endpoints.TopicBlacklist);
}

export function GetTopicBlacklistEntry(this: LynxClient, id: number) {
    return this.requestJson<TopicBlacklist>(`${Endpoints.TopicBlacklist}/${id}`);
}

export function CreateTopicBlacklistEntry(this: LynxClient, entry: EmptyTopicBlacklist) {
    return this.requestJson<TopicBlacklist>(Endpoints.TopicBlacklist, {
        method: 'POST',
        body: JSON.stringify(entry),
    });
}

export function UpdateTopicBlacklistEntry(this: LynxClient, entry: TopicBlacklist) {
    return this.requestJson<TopicBlacklist>(`${Endpoints.TopicBlacklist}/${entry.id}`, {
        method: 'PUT',
        body: JSON.stringify(entry),
    });
}

export function DeleteTopicBlacklistEntry(this: LynxClient, entry: TopicBlacklist) {
    return this.requestJson<OKResponse>(`${Endpoints.TopicBlacklist}/${entry.id}`, {
        method: 'DELETE',
    });
}
