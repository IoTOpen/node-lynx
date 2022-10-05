import {Endpoints, request} from './util';
import {PaginatedResponse} from './types';

export type LogEntry = {
    client_id: number
    installation_id: number
    timestamp: number
    topic: string
    value: number
    message: string
}

export enum LogOrder {
    Desc = 'desc',
    Asc = 'asc'
}

export const GetStatus = (installationId: number, topicFilter?: string[]) => {
    const qs = topicFilter ? '?' + topicFilter.reduce((prev, cur, id) => {
        if (id !== 0) {
            prev += '&';
        }
        return prev + 'topics=' + cur;
    }, '') : '';
    return request<LogEntry[]>(Endpoints.Status + '/' + installationId + qs, {});
};

export const GetLog = (installationId: number, from?: number, to?: number, limit = 500, offset = 0, order = LogOrder.Desc, topics?: string[]) => {
    const now = new Date().getTime() / 1000;
    from = from ? from : now - (60 * 60 * 24);
    to = to ? to : now;

    const params: { [key: string]: string } = {
        from: from.toString(), to: to.toString(), limit: limit.toString(), offset: offset.toString(), order: order,
    };

    if (topics) {
        params.topics = topics.join(',');
    }
    const qs = '?' + new URLSearchParams(params).toString();
    return request<PaginatedResponse<LogEntry>>(Endpoints.LogV3 + '/' + installationId + qs, {});
};
