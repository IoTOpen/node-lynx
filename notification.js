const {Endpoints, request} = require("./util");

export const GetNotificationMessages = (installationId) => request(Endpoints.Notification + '/' + installationId + '/message')

export const GetNotificationMessage = (installationId, id) => request(Endpoints.Notification + '/' + installationId + '/message/' + id, {});

export const CreateNotificationMessage = (notificationMessage) => request(Endpoints.Notification + '/' + notificationMessage.installation_id + '/message', {
    method: 'POST', body: JSON.stringify(notificationMessage)
});

export const DeleteNotificationMessage = (notificationMessage) => request(Endpoints.Notification + '/' + notificationMessage.installation_id + '/message/' + notificationMessage.id, {
    method: 'DELETE'
});

export const UpdateNotificationMessage = (notificationMessage) => request(Endpoints.Notification + '/' + notificationMessage.installation_id + '/message/' + notificationMessage.id, {
    method: 'PUT', body: JSON.stringify(notificationMessage)
});

export const GetNotificationOutputs = (installationId) => request(Endpoints.Notification + '/' + installationId + '/output')

export const GetNotificationOutput = (installationId, id) => request(Endpoints.Notification + '/' + installationId + '/output/' + id, {});

export const CreateNotificationOutput = (notificationOutput) => request(Endpoints.Notification + '/' + notificationOutput.installation_id + '/output', {
    method: 'POST', body: JSON.stringify(notificationOutput)
});

export const DeleteNotificationOutput = (notificationOutput) => request(Endpoints.Notification + '/' + notificationOutput.installation_id + '/output/' + notificationOutput.id, {
    method: 'DELETE'
});

export const UpdateNotificationOutput = (notificationOutput) => request(Endpoints.Notification + '/' + notificationOutput.installation_id + '/output/' + notificationOutput.id, {
    method: 'PUT', body: JSON.stringify(notificationOutput)
});

export const GetNotificationOutputExecutors = (installationId) => request(Endpoints.Notification + '/' + installationId + '/executor', {});

export const GetNotificationOutputExecutor = (installationId, id) => request(Endpoints.Notification + '/' + installationId + '/executor/' + id, {});

export const SendNotification = (installationId, outputId, data) => request(Endpoints.Notification + '/' + installationId + '/output/' + outputId + '/send', {
    method: 'POST', body: JSON.stringify(data)
});
