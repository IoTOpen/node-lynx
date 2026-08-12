import type { LynxClient } from './client';
import type { PaginatedResponse } from './types';
import { Endpoints, buildQuery } from './util';

export interface LogEntry {
    client_id: number
    installation_id: number
    timestamp: number
    topic: string
    value: number
    msg: string
}

export enum LogOrder {
    Desc = 'desc',
    Asc = 'asc'
}

export function GetStatus(this: LynxClient, installationId: number, topicFilter?: string[]) {
    const qs = topicFilter ? buildQuery({ topics: topicFilter }) : '';
    return this.requestJson<LogEntry[]>(`${Endpoints.Status}/${installationId}${qs}`);
}

export function GetLog(
    this: LynxClient,
    installationId: number,
    from?: number,
    to?: number,
    limit = 500,
    offset = 0,
    order = LogOrder.Desc,
    topics?: string[],
    aggr_method?: string,
    aggr_interval?: string,
    options?: RequestInit
) {
    const now = new Date().getTime() / 1000;
    const fromVal = from ?? (now - (60 * 60 * 24));
    const toVal = to ?? now;

    const params: Record<string, string> = {
        from: fromVal.toString(),
        to: toVal.toString(),
        limit: limit.toString(),
        offset: offset.toString(),
        order,
    };

    if (aggr_method) {
        params['aggr_method'] = aggr_method;
    }
    if (aggr_interval) {
        params['aggr_interval'] = aggr_interval;
    }

    // Build URLSearchParams and append topics as repeated `topics=` entries
    const sp = new URLSearchParams(params);
    if (topics) {
        topics.forEach(t => { sp.append('topics', t); });
    }

    const qs = `?${sp.toString()}`;
    return this.requestJson<PaginatedResponse<LogEntry>>(`${Endpoints.LogV3}/${installationId}${qs}`, options);
}
