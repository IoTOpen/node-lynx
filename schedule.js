import {Endpoints, request} from "./util";

export const GetSchedules = (installationId, executor) => {
    let qs = executor ? '?executor=' + executor : '';
    return request(Endpoints.Schedule + installationId + qs);
}

export const GetSchedule = (installationId, id) => request(Endpoints.Schedule + installationId + '/' + id, {});

