import {Endpoints} from './util';
import {Identifier, OKResponse} from './types';
import {LynxClient} from './client';

export type EmptyNotificationMessage = {
    installation_id: number
    name: string
    text: string
}

export type NotificationMessage = EmptyNotificationMessage & Identifier

export function GetNotificationMessages(this: LynxClient, installationId: number) {
    return this.request<NotificationMessage[]>(
        `${Endpoints.Notification}/${installationId}/message`, {});
}

export function GetNotificationMessage (this: LynxClient, installationId: number, id: number){
    return this.request<NotificationMessage>(
        `${Endpoints.Notification}/${installationId}/message/${id}`, {});
}

export function CreateNotificationMessage(this: LynxClient, notificationMessage: EmptyNotificationMessage) {
    return this.request<NotificationMessage>(
        `${Endpoints.Notification}/${notificationMessage.installation_id}/message`, {
            method: 'POST', body: JSON.stringify(notificationMessage)
        });
}

export function DeleteNotificationMessage(this: LynxClient, notificationMessage: NotificationMessage) {
    return this.request<OKResponse>(
        `${Endpoints.Notification}/${notificationMessage.installation_id}/message/${notificationMessage.id}`, {
            method: 'DELETE'
        });
}

export function UpdateNotificationMessage(this: LynxClient, notificationMessage: NotificationMessage) {
    return this.request<NotificationMessage>(
        `${Endpoints.Notification}/${notificationMessage.installation_id}/message/${notificationMessage.id}`, {
            method: 'PUT', body: JSON.stringify(notificationMessage)
        });
}

export type EmptyNotificationOutput = {
    installation_id: number
    name: string
    notification_message_id: number
    notification_output_executor_id: number
    config: Map<string, string>
}

export type NotificationOutput = EmptyNotificationOutput & Identifier

export function GetNotificationOutputs(this: LynxClient, installationId: number) {
    return this.request<NotificationOutput[]>(
        `${Endpoints.Notification}/${installationId}/output`, {});
}

export function GetNotificationOutput(this: LynxClient, installationId: number, id: number) {
    return this.request<NotificationOutput>(
        `${Endpoints.Notification}/${installationId}/output/${id}`, {});
}

export function CreateNotificationOutput(this: LynxClient, notificationOutput: EmptyNotificationOutput) {
    return this.request<NotificationOutput>(
        `${Endpoints.Notification}/${notificationOutput.installation_id}/output`, {
            method: 'POST', body: JSON.stringify(notificationOutput)
        });
}

export function DeleteNotificationOutput(this: LynxClient, notificationOutput: NotificationOutput) {
    return this.request<OKResponse>(
        `${Endpoints.Notification}/${notificationOutput.installation_id}/output/${notificationOutput.id}`, {
            method: 'DELETE'
        });
}

export function UpdateNotificationOutput(this: LynxClient, notificationOutput: NotificationOutput) {
    return this.request<NotificationOutput>(
        `${Endpoints.Notification}/${notificationOutput.installation_id}/output/${notificationOutput.id}`, {
            method: 'PUT', body: JSON.stringify(notificationOutput)
        });
}

export type EmptyNotificationOutputExecutor = {
    type: string
    name: string
    organization_id: number
    config: Map<string, string>
    secret?: string
}

export type NotificationOutputExecutor = EmptyNotificationOutputExecutor & Identifier

export function GetNotificationOutputExecutors(this: LynxClient, installationId: number) {
    return this.request<NotificationOutputExecutor[]>(
        `${Endpoints.Notification}/${installationId}/executor`, {});
}

export function GetNotificationOutputExecutor(this: LynxClient, installationId: number, id: number) {
    return this.request<NotificationOutputExecutor>(
        `${Endpoints.Notification}/${installationId}/executor/${id}`, {});
}

export function SendNotification(this: LynxClient, installationId: number, outputId: number, data: any) {
    return this.request<any>(
        `${Endpoints.Notification}/${installationId}/output/${outputId}/send`, {
            method: 'POST', body: JSON.stringify(data)
        });
}

export function GetNotificationsExecutorsAdmin(this: LynxClient) {
    return this.request<NotificationOutputExecutor[]>(
        Endpoints.NotificationExecutorAdmin, {});
}

export function GetNotificationExecutorAdmin(this: LynxClient, outputId: number) {
    return this.request<NotificationOutputExecutor>(
        `${Endpoints.NotificationExecutorAdmin}/${outputId}`, {});
}

export function CreateNotificationExecutorAdmin(this: LynxClient, notificationExecutor: EmptyNotificationOutputExecutor) {
    return this.request<NotificationOutputExecutor>(
        Endpoints.NotificationExecutorAdmin, {
            method: 'POST', body: JSON.stringify(notificationExecutor)
        });
}

export function UpdateNotificationExecutorAdmin(this: LynxClient, notificationExecutor: NotificationOutputExecutor) {
    return this.request<NotificationOutputExecutor>(
        `${Endpoints.NotificationExecutorAdmin}/${notificationExecutor.id}`, {
            method: 'PUT', body: JSON.stringify(notificationExecutor)
        });
}

export function DeleteNotificationExecutorAdmin(this: LynxClient, notificationExecutor: NotificationOutputExecutor) {
    return this.request<OKResponse>(
        `${Endpoints.NotificationExecutorAdmin}/${notificationExecutor.id}`, {
            method: 'DELETE'
        });
}
