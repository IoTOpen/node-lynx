import {Endpoints, request} from './util';
import {Identifier, OKResponse} from './types';

export type EmptyNotificationMessage = {
    installation_id: number
    name: string
    text: string
}

export type NotificationMessage = EmptyNotificationMessage & Identifier

export const GetNotificationMessages = (installationId: number) => request<NotificationMessage[]>(
    Endpoints.Notification + '/' + installationId + '/message', {});

export const GetNotificationMessage = (installationId: number, id: number) => request<NotificationMessage>(
    Endpoints.Notification + '/' + installationId + '/message/' + id, {});

export const CreateNotificationMessage = (notificationMessage: EmptyNotificationMessage) => request<NotificationMessage>(
    Endpoints.Notification + '/' + notificationMessage.installation_id + '/message', {
        method: 'POST', body: JSON.stringify(notificationMessage)
    });

export const DeleteNotificationMessage = (notificationMessage: NotificationMessage) => request<OKResponse>(
    Endpoints.Notification + '/' + notificationMessage.installation_id + '/message/' + notificationMessage.id, {
        method: 'DELETE'
    });

export const UpdateNotificationMessage = (notificationMessage: NotificationMessage) => request<NotificationMessage>(
    Endpoints.Notification + '/' + notificationMessage.installation_id + '/message/' + notificationMessage.id, {
        method: 'PUT', body: JSON.stringify(notificationMessage)
    });

export type EmptyNotificationOutput = {
    installation_id: number
    name: string
    notification_message_id: number
    notification_output_executor_id: number
    config: Map<string, string>
}

export type NotificationOutput = EmptyNotificationOutput & Identifier

export const GetNotificationOutputs = (installationId: number) => request<NotificationOutput[]>(
    Endpoints.Notification + '/' + installationId + '/output', {});

export const GetNotificationOutput = (installationId: number, id: number) => request<NotificationOutput>(
    Endpoints.Notification + '/' + installationId + '/output/' + id, {});

export const CreateNotificationOutput = (notificationOutput: EmptyNotificationOutput) => request<NotificationOutput>(
    Endpoints.Notification + '/' + notificationOutput.installation_id + '/output', {
        method: 'POST', body: JSON.stringify(notificationOutput)
    });

export const DeleteNotificationOutput = (notificationOutput: NotificationOutput) => request<OKResponse>(
    Endpoints.Notification + '/' + notificationOutput.installation_id + '/output/' + notificationOutput.id, {
        method: 'DELETE'
    });

export const UpdateNotificationOutput = (notificationOutput: NotificationOutput) => request<NotificationOutput>(
    Endpoints.Notification + '/' + notificationOutput.installation_id + '/output/' + notificationOutput.id, {
        method: 'PUT', body: JSON.stringify(notificationOutput)
    });

export type EmptyNotificationOutputExecutor = {
    type: string
    name: string
    organization_id: number
    config: Map<string, string>
    secret?: string
}

type NotificationOutputExecutor = EmptyNotificationOutputExecutor & Identifier

export const GetNotificationOutputExecutors = (installationId: number) => request<NotificationOutputExecutor[]>(
    Endpoints.Notification + '/' + installationId + '/executor', {});

export const GetNotificationOutputExecutor = (installationId: number, id: number) => request<NotificationOutputExecutor>(
    Endpoints.Notification + '/' + installationId + '/executor/' + id, {});

export const SendNotification = (installationId: number, outputId: number, data: any) => request<any>(
    Endpoints.Notification + '/' + installationId + '/output/' + outputId + '/send', {
        method: 'POST', body: JSON.stringify(data)
    });

export const GetNotificationsExecutorsAdmin = () => request<NotificationOutputExecutor[]>(
    Endpoints.NotificationExecutorAdmin, {});

export const GetNotificationExecutorAdmin = (outputId: number) => request<NotificationOutputExecutor>(
    Endpoints.NotificationExecutorAdmin + '/' + outputId, {});

export const CreateNotificationExecutorAdmin = (notificationExecutor: EmptyNotificationOutputExecutor) => request<NotificationOutputExecutor>(
    Endpoints.NotificationExecutorAdmin, {
        method: 'POST', body: JSON.stringify(notificationExecutor)
    });

export const UpdateNotificationExecutorAdmin = (notificationExecutor: NotificationOutputExecutor) => request<NotificationOutputExecutor>(
    Endpoints.NotificationExecutorAdmin + '/' + notificationExecutor.id, {
        method: 'PUT', body: JSON.stringify(notificationExecutor)
    });

export const DeleteNotificationExecutorAdmin = (notificationExecutor: NotificationOutputExecutor) => request<OKResponse>(
    Endpoints.NotificationExecutorAdmin + '/' + notificationExecutor.id, {
        method: 'DELETE'
    });
