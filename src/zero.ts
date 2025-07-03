import type { Devicex, EmptyDevicex } from './devicex';
import type { EdgeApp, EdgeAppInstance, EmptyEdgeApp, EmptyEdgeAppInstance } from './edge_app';
import type { EmptyFile } from './file';
import type { EmptyFunctionx, Functionx } from './functionx';
import type { GatewayInformation } from './gateway';
import type { EmptyInstallation, Installation, InstallationInfo } from './installation';
import type { LogEntry } from './log';
import type {
    EmptyNotificationMessage, EmptyNotificationOutput, EmptyNotificationOutputExecutor,
    NotificationMessage, NotificationOutput, NotificationOutputExecutor
} from './notification';
import type {EmptyOAuth2Client, OAuth2Client} from './oauth2';
import type { EmptyOrganization, Organization, OrganizationSimple } from './organization';
import type { EmptyRole, Role } from './role';
import type { EmptySchedule, Schedule } from './schedule';
import type { EmptyToken, Token } from './token';
import type { EmptyTopicBlacklist, TopicBlacklist } from './topic_blacklist';
import type { Trace} from './trace';
import { TraceAction, TraceObjectType } from './trace';
import type { CreationDate, Identifier, WithMeta } from './types';
import type { EmptyUser, User } from './user';

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
    msg: '',
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


const oauth2Client = {
    id: '',
    client_secret: '',
    name: '',
    trusted: false,
    allowed_scopes: [],
    icon_uri: '',
    tos_uri: '',
    policy_uri: '',
    redirect_uris: [],
    id_token_alg: '',
    kid: '',
    created: 0,
    updated: 0
};

const emptyOAuth2Client = {
    name: '',
    trusted: false,
    allowed_scopes: [],
    icon_uri: '',
    tos_uri: '',
    policy_uri: '',
    redirect_uris: [],
    id_token_alg: '',
    kid: ''
};


export const zero = {
    getEmptyDevicex: (): EmptyDevicex => clone({...devicex, ...emptyWithMeta}),
    getDevicex: (): Devicex => clone({...devicex, ...emptyWithMeta, ...emptyIdentifier, ...emptyCreationDate}),
    getEmptyEdgeApp: (): EmptyEdgeApp => clone({...edgeApp}),
    getEdgeApp: (): EdgeApp => clone({...edgeApp, ...emptyIdentifier, ...emptyCreationDate}),
    getEmptyEdgeAppInstance: (): EmptyEdgeAppInstance => clone({...edgeAppInstance}),
    getEdgeAppInstance: (): EdgeAppInstance => clone({...edgeAppInstance, ...emptyIdentifier, ...emptyCreationDate}),
    getEmptyFile: (): EmptyFile => clone({...emptyFile}),
    getFile: (): (EmptyFile & Identifier & CreationDate)  => clone({...emptyFile, ...emptyIdentifier, ...emptyCreationDate}),
    getEmptyFunctionx: (): EmptyFunctionx => clone({...functionx, ...emptyWithMeta}),
    getFunctionx: (): Functionx => clone({...functionx, ...emptyWithMeta, ...emptyIdentifier, ...emptyCreationDate}),
    getGatewayInformation: (): GatewayInformation => clone({...gatewayInformation}),
    getInstallationInfo: (): InstallationInfo => clone({...installationInfo}),
    getEmptyInstallation: (): EmptyInstallation => clone({...installation, ...emptyWithMeta}),
    getInstallation: (): Installation => clone({...installation, ...emptyWithMeta, ...emptyIdentifier, client_id: 0, created: 0}),
    getLogEntry: (): LogEntry => clone({...logEntry}),
    getEmptyNotificationMessage: (): EmptyNotificationMessage => clone({...notificationMessage}),
    getNotificationMessage: (): NotificationMessage => clone({...notificationMessage, ...emptyIdentifier}),
    getEmptyNotificationOutput: (): EmptyNotificationOutput => clone({...notificationOutput}),
    getNotificationOutput: (): NotificationOutput => clone({...notificationOutput, ...emptyIdentifier}),
    getEmptyNotificationOutputExecutor: (): EmptyNotificationOutputExecutor =>clone({...notificationOutputExecutor}),
    getNotificationOutputExecutor: (): NotificationOutputExecutor =>clone({...notificationOutputExecutor, ...emptyIdentifier}),
    getEmptyOrganization: (): EmptyOrganization => clone({...organization, ...emptyWithMeta}),
    getOrganization: (): Organization => clone({...organization, ...emptyWithMeta, ...emptyIdentifier}),
    getOrganizationSimple: (): OrganizationSimple => clone({...organizationSimple}),
    getEmptyRole: (): EmptyRole => clone({...role}),
    getRole: (): Role => clone({...role, ...emptyIdentifier}),
    getEmptySchedule: (): EmptySchedule => clone({...schedule}),
    getSchedule: (): Schedule => clone({...schedule, ...emptyIdentifier, ...{ created_at: 0, updated_at: 0 }}),
    getEmptyToken: (): EmptyToken => clone({...token}),
    getToken: (): Token => clone({...token, ...zeroToken, ...emptyIdentifier}),
    getEmptyTopicBlacklist: (): EmptyTopicBlacklist => clone({...topicBlacklist}),
    getBlacklist: (): TopicBlacklist => clone({...topicBlacklist, ...emptyIdentifier}),
    getTrace: (): Trace => clone({...trace}),
    getEmptyUser: (): EmptyUser => clone({...user, ...emptyWithMeta}),
    getUser: (): User => clone({...user, ...emptyWithMeta, ...emptyIdentifier}),
    getOAuth2Client: (): OAuth2Client => clone({...oauth2Client}),
    getEmptyOAuth2Client: (): EmptyOAuth2Client => clone({...emptyOAuth2Client}),
};
