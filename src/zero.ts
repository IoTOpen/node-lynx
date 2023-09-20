import { Devicex, EmptyDevicex } from './devicex';
import { EdgeApp, EmptyEdgeApp, EmptyEdgeAppInstance } from './edge_app';
import { EmptyFile } from './file';
import { EmptyFunctionx, Functionx } from './functionx';
import { GatewayInformation } from './gateway';
import { EmptyInstallation, Installation, InstallationInfo } from './installation';
import { LogEntry } from './log';
import {
    EmptyNotificationMessage, EmptyNotificationOutput, EmptyNotificationOutputExecutor,
    NotificationMessage, NotificationOutput, NotificationOutputExecutor
} from './notification';
import { EmptyOrganization, Organization, OrganizationSimple } from './organization';
import { EmptyRole, Role } from './role';
import { EmptySchedule } from './schedule';
import { EmptyToken, Token } from './token';
import { EmptyTopicBlacklist, TopicBlacklist } from './topic_blacklist';
import { Trace, TraceAction, TraceObjectType } from './trace';
import { CreationDate, Identifier, WithMeta } from './types';
import { EmptyUser, User } from './user';

export const clone = <T,>(model: T): T => {
    if (typeof model === 'object' && model !== null) {
        return Object.assign({}, ...Object.keys(model).map(
            (key) => ({[key]: clone(model[key as keyof T])})
        ));
    }

    return (Array.isArray(model)) ? (model.map((v) => clone(v)) as T) : model;
};

const emptyIdentifier: Identifier = {
    id: 0
};

const emptyWithMeta: WithMeta = {
    meta: {},
    protected_meta: {}
};

const emptyCreationDate: CreationDate = {
    created: 0,
    updated: 0
};

const address = {
    address: '',
    city: '',
    country: '',
    zip: ''
};

const devicex = {
    installation_id: 0,
    type: '',
};

const organization = {
    name: '',
    address,
    email: '',
    phone: '',
    force_sms_login: false,
    parent: 0,
    children: [],
    notes: '',
    password_valid_days: 0,
};

const edgeApp: EmptyEdgeApp = {
    name: '',
    category: '',
    tags: [],
    short_description: '',
    description: '',
    publisher: {
        id: 0,
        name: '',
        apps: []
    },
    official: false,
    public: false,
    source_url: ''
};

const functionx = {
    installation_id: 0,
    type: ''
};

const emptyFile = {
    hash: '',
    name: '',
    mime: '',
    installation_id: 0,
    organization_id: 0
};

const edgeAppInstance = {
    app_id: 0,
    installation_id: 0,
    version: '',
    config: {},
    name: ''
};

const installationInfo = {
    id: 0,
    name: '',
    client_id: 0,
    organization_id: 0,
    capabilities: [],
    assigned: false
};

const installation = {
    name: '',
    organization_id: 0,
    notes: '',
    users: []
};

const logEntry = {
    client_id: 0,
    installation_id: 0,
    timestamp: 0,
    topic: '',
    value: 0,
    message: '',
};

const notificationMessage = {
    installation_id: 0,
    name: '',
    text: ''
};

const notificationOutput = {
    installation_id: 0,
    name: '',
    notification_message_id: 0,
    notification_output_executor_id: 0,
    config: {},
};

const notificationOutputExecutor = {
    type: '',
    name: '',
    organization_id: 0,
    config: {},
    secret: undefined
};

const role = {
    name: '',
    priority: 0,
    permissions: {}
};

const schedule = {
    installation_id: 0,
    executor: '',
    day_of_week: '',
    day_of_month: '',
    month: '',
    hour: '',
    minute: '',
    topic: '',
    value: ''
};

const token = {
    expire: 0,
    session_timeout: 0,
    name: '',
    permissions: []
};

const zeroToken = {
    type: '',
    created: 0,
    token: '',
    accessed: [{
        ip: '',
        agent: '',
        last_accessed: 0,
    }],
    last_used: 0,
    current: false,
    agent: ''
};

const topicBlacklist = {
    topic: '',
    mode: '',
    enabled: false,
    reason: '',
    count: 0
};

const trace = {
    id: 0,
    path: '',
    method: '',
    timestamp: 0,
    user_id: 0,
    action: TraceAction.Create,
    object_type: TraceObjectType.Installation,
    object_id: 0,
    description: ''
};

const user = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 0,
    sms_login: false,
    mobile: '',
    note: '',
    organisations: [],
    assigned_installations: [],
    address,
    expire_at: 0
};

const gatewayInformation = {
    client_id: 0,
    installation_id: 0,
    api: '',
    aam: '',
    mqtt_broker: '',
    mqtt_username: '',
    mqtt_password: '',
    mqtt_client_id: '',
    timezone: ''
};

const organizationSimple = {
    id: 0,
    name: '',
    parent: ''
};

export const zero = {
    getEmptyDevicex: (): EmptyDevicex => clone({...devicex, ...emptyWithMeta}),
    getZeroEmptyDevicex: (): Devicex => clone({...devicex, ...emptyWithMeta, ...emptyIdentifier, ...emptyCreationDate}),
    getEmptyEdgeApp: (): EmptyEdgeApp => clone({...edgeApp}),
    getZeroEmptyEdgeApp: (): EdgeApp => clone({...edgeApp, ...emptyIdentifier, ...emptyCreationDate}),
    getEmptyEdgeAppInstance: (): EmptyEdgeAppInstance => clone({...edgeAppInstance}),
    getZeroEmptyEdgeAppInstance: (): EmptyEdgeAppInstance => clone({...edgeAppInstance, ...emptyIdentifier, ...emptyCreationDate}),
    getEmptyFile: (): EmptyFile => clone({...emptyFile}),
    getZeroEmptyFile: (): (EmptyFile & Identifier & CreationDate)  => clone({...emptyFile, ...emptyIdentifier, ...emptyCreationDate}),
    getEmptyFunctionx: (): EmptyFunctionx => clone({...functionx, ...emptyWithMeta}),
    getZeroEmptyFunctionx: (): Functionx => clone({...functionx, ...emptyWithMeta, ...emptyIdentifier, ...emptyCreationDate}),
    getEmptyGatewayInformation: (): GatewayInformation => clone({...gatewayInformation}),
    getEmptyInstallationInfo: (): InstallationInfo => clone({...installationInfo}),
    getEmptyInstallation: (): EmptyInstallation => clone({...installation, ...emptyWithMeta}),
    getZeroEmptyInstallation: (): Installation => clone({...installation, ...emptyWithMeta, ...emptyIdentifier, client_id: 0, created: 0}),
    getEmptyLogEntry: (): LogEntry => clone({...logEntry}),
    getEmptyNotificationMessage: (): EmptyNotificationMessage => clone({...notificationMessage}),
    getZeroEmptyNotificationMessage: (): NotificationMessage => clone({...notificationMessage, ...emptyIdentifier}),
    getEmptyNotificationOutput: (): EmptyNotificationOutput => clone({...notificationOutput}),
    getZeroEmptyNotificationOutput: (): NotificationOutput => clone({...notificationOutput, ...emptyIdentifier}),
    getEmptyNotificationOutputExecutor: (): EmptyNotificationOutputExecutor =>clone({...notificationOutputExecutor}),
    getZeroEmptyNotificationOutputExecutor: (): NotificationOutputExecutor =>clone({...notificationOutputExecutor, ...emptyIdentifier}),
    getEmptyOrganization: (): EmptyOrganization => clone({...organization, ...emptyWithMeta}),
    getOrganization: (): Organization => clone({...organization, ...emptyWithMeta, ...emptyIdentifier}),
    getOrganizationSimple: (): OrganizationSimple => clone({...organizationSimple}),
    getEmptyRole: (): EmptyRole => clone({...role}),
    getZeroEmptyRole: (): Role => clone({...role, ...emptyIdentifier}),
    getEmptySchedule: (): EmptySchedule => clone({...schedule}),
    getEmptyToken: (): EmptyToken => clone({...token}),
    getZeroEmptyToken: (): Token => clone({...token, ...zeroToken, ...emptyIdentifier}),
    getEmptyTopicBlacklist: (): EmptyTopicBlacklist => clone({...topicBlacklist}),
    getEmptyZeroTopicBlacklist: (): TopicBlacklist => clone({...topicBlacklist, ...emptyIdentifier}),
    getEmptyTrace: (): Trace => clone({...trace}),
    getEmptyUser: (): EmptyUser => clone({...user, ...emptyWithMeta}),
    getEmptyZeroUser: (): User => clone({...user, ...emptyWithMeta, ...emptyIdentifier})
};
