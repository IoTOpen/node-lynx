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

export const GetSchedules = (installationId: number, executor?: string) => {
    const qs = executor ? '?executor=' + executor : '';
    return request<Schedule[]>(Endpoints.Schedule + '/' + installationId + qs, {});
};

export const GetSchedule = (installationId: number, id: number) => request(
    Endpoints.Schedule + '/' + installationId + '/' + id, {});

export const CreateSchedule = (schedule: EmptySchedule) => request<Schedule>(
    Endpoints.Schedule + '/' + schedule.installation_id, {
        method: 'POST', body: JSON.stringify(schedule)
    });

export const UpdateSchedule = (schedule: Schedule) => request<Schedule>(
    Endpoints.Schedule + '/' + schedule.installation_id + '/' + schedule.id, {
        method: 'PUT', body: JSON.stringify(schedule)
    });

export const DeleteSchedule = (schedule: Schedule) => request<OKResponse>(
    Endpoints.Schedule + '/' + schedule.installation_id + '/' + schedule.id, {
        method: 'DELETE'
    });

