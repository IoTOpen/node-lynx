import {Endpoints, request} from './util';
import {Identifier, OKResponse} from './types';

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

export function GetSchedules(installationId: number, executor?: string) {
    const qs = executor ? `?executor=${executor}` : '';
    return request<Schedule[]>(`${Endpoints.Schedule}/${installationId}${qs}`, {});
}

export function GetSchedule(installationId: number, id: number) {
    return request(
        `${Endpoints.Schedule}/${installationId}/${id}`, {});
}

export function CreateSchedule(schedule: EmptySchedule) {
    return request<Schedule>(
        `${Endpoints.Schedule}/${schedule.installation_id}`, {
            method: 'POST', body: JSON.stringify(schedule)
        });
}

export function UpdateSchedule(schedule: Schedule) {
    return request<Schedule>(
        `${Endpoints.Schedule}/${schedule.installation_id}/${schedule.id}`, {
            method: 'PUT', body: JSON.stringify(schedule)
        });
}

export function DeleteSchedule(schedule: Schedule) {
    return request<OKResponse>(
        `${Endpoints.Schedule}/${schedule.installation_id}/${schedule.id}`, {
            method: 'DELETE'
        });
}

