const {Endpoints, request} = require("./util");

export const GetNotificationMessage = (installationId, id) => request(Endpoints.Notification + installationId + '/message/' + id, {});

export const GetNotificationOutput = (installationId, id) => request(Endpoints.Notification + installationId + '/output/' + id, {});

export const GetNotificationOutputExecutors = (installationId) => request(Endpoints.Notification + installationId + '/executor', {});

export const GetNotificationOutputExecutor = (installationId, id) => request(Endpoints.Notification + installationId + '/executor/' + id, {});
