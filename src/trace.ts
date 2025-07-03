import type {LynxClient} from './client';
import {LogOrder} from './log';
import type {PaginatedResponse} from './types';
import {Endpoints} from './util';

export enum TraceObjectType {
    Installation = 'installation',
    Gateway = 'gateway',
    Organization = 'organization',
    User = 'user',
    Device = 'device',
    Function = 'function',
    Schedule = 'schedule',
    NotificationOutput = 'notification_output',
    NotificationMessage = 'notification_message',
    OutputExecutor = 'output_executor',
    EdgeApp = 'edge_app',
    EdgeAppInstance = 'edge_app_instance',
    File = 'file',
    Role = 'role',
    GatewayRegistrationPolicy = 'gateway_registration_policy',
    UserRegistrationPolicy = 'user_registration_policy',
    MQTT = 'mqtt',
    Trace = 'trace'
}

export enum TraceAction {
    Create = 'create',
    Delete = 'delete',
    Update = 'update',
    View = 'view',
    Failed = 'failed',
    Execute = 'execute',
    Auth = 'auth'
}

export interface Trace {
    id: number
    path: string
    method: string
    timestamp: number
    user_id: number
    action: TraceAction
    object_type: TraceObjectType
    object_id: number
    description: string
}

export function GetTrace(this: LynxClient, from?: number, to?: number, limit = 1000, offset = 0, order = LogOrder.Desc, objectType?: TraceObjectType, objectId?: number, id?: string, actions: TraceAction[] | TraceAction = []) {
    const now = new Date().getTime() / 1000;
    from = from ? from : now - (60 * 60 * 24);
    to = to ? to : now;

    const params: Record<string, string> = {
        from: from.toString(), to: to.toString(), limit: limit.toString(), offset: offset.toString(), order: order
    };

    if (typeof actions === 'string') {
        params.action = actions;
    } else if (actions.length > 0) {
        params.action = actions.join(',');
    }

    if (objectType && objectId) {
        params.object_type = objectType;
        params.object_id = objectId.toString();
    } else if (id) {
        params.id = id;
    }

    const qs = `?${new URLSearchParams(params).toString()}`;
    return this.requestJson<PaginatedResponse<Trace>>(`${Endpoints.Trace}${qs}`);
}
