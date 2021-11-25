import {Endpoints, request} from "./util";

export const GetSchedules = (installationId, executor) => {
    let qs = executor ? '?executor=' + executor : '';
    return request(Endpoints.Schedule + installationId + qs);
}

export const GetSchedule = (installationId, id) => request(Endpoints.Schedule + '/' + installationId + '/' + id, {});

export const CreateSchedule = (schedule) => request(Endpoints.Schedule + '/' + schedule.installation_id, {
    method: 'POST', body: JSON.stringify(schedule)
});

export const UpdateSchedule = (schedule) => request(Endpoints.Schedule + '/' + schedule.installation_id + '/' + schedule.id, {
    method: 'PUT', body: JSON.stringify(schedule)
});

export const DeleteSchedule = (schedule) => request(Endpoints.Schedule + '/' + schedule.installation_id + '/' + schedule.id, {
    method: 'DELETE'
});

