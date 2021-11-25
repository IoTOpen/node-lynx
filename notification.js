const {Endpoints, request} = require("./util");

export const GetNotificationMessage = (installationId, id) => request(Endpoints.Notification + installationId + '/message/' + id, {});

export const GetNotificationOutput = (installationId, id) => request(Endpoints.Notification + installationId + '/output/' + id, {});

export const CreateNotificationOutput = (notificationOutput) => request(Endpoints.Notification + notificationOutput.installation_id, {
    method: 'POST', body: JSON.stringify(notificationOutput)
});

export const DeleteNotificationOutput = (notificationOutput) => request(Endpoints.Notification + notificationOutput.installation_id + '/' + notificationOutput.id, {
    method: 'DELETE', body: JSON.stringify(notificationOutput)
});

export const UpdateNotificationOutput = (notificationOutput) => request(Endpoints.Notification + notificationOutput.installation_id + '/' + notificationOutput.id, {
    method: 'PUT', body: JSON.stringify(notificationOutput)
});

export const GetNotificationOutputExecutors = (installationId) => request(Endpoints.Notification + installationId + '/executor', {});

export const GetNotificationOutputExecutor = (installationId, id) => request(Endpoints.Notification + installationId + '/executor/' + id, {});
