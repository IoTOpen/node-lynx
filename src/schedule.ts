import {Endpoints} from './util';
import {Identifier, OKResponse} from './types';
import {LynxClient} from './client';

export type EmptySchedule = {
    installation_id: number
    executor: string
    day_of_week: string
    day_of_month: string
    month: string
    hour: string
    minute: string
    topic: string
    value: string
}

export type Schedule = EmptySchedule & Identifier & { created_at: number, updated_at: number }

export function GetSchedules(this: LynxClient, installationId: number, executor?: string) {
    const qs = executor ? `?executor=${executor}` : '';
    return this.requestJson<Schedule[]>(`${Endpoints.Schedule}/${installationId}${qs}`);
}

export function GetSchedule(this: LynxClient, installationId: number, id: number) {
    return this.requestJson(
        `${Endpoints.Schedule}/${installationId}/${id}`);
}

export function CreateSchedule(this: LynxClient, schedule: EmptySchedule) {
    return this.requestJson<Schedule>(
        `${Endpoints.Schedule}/${schedule.installation_id}`, {
            method: 'POST', body: JSON.stringify(schedule)
        });
}

export function UpdateSchedule(this: LynxClient, schedule: Schedule) {
    return this.requestJson<Schedule>(
        `${Endpoints.Schedule}/${schedule.installation_id}/${schedule.id}`, {
            method: 'PUT', body: JSON.stringify(schedule)
        });
}

export function DeleteSchedule(this: LynxClient, schedule: Schedule) {
    return this.requestJson<OKResponse>(
        `${Endpoints.Schedule}/${schedule.installation_id}/${schedule.id}`, {
            method: 'DELETE'
        });
}
