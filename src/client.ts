import {
    CreateFunction,
    CreateFunctionMeta,
    DeleteFunction,
    DeleteFunctionMeta,
    GetFunction,
    GetFunctionMeta,
    GetFunctions,
    UpdateFunction,
    UpdateFunctionMeta
} from './functionx';
import {
    CreateDevice,
    CreateDeviceMeta,
    DeleteDevice,
    DeleteDeviceMeta,
    GetDevice,
    GetDeviceMeta,
    GetDevices,
    UpdateDevice,
    UpdateDeviceMeta
} from './devicex';
import {
    CreateInstallation,
    DeleteInstallation,
    GetInstallation,
    GetInstallationByClientId,
    GetInstallationRow,
    GetInstallations,
    ListInstallations,
    UpdateInstallation
} from './installation';
import {GetLog, GetStatus} from './log';
import {
    CreateNotificationExecutorAdmin,
    CreateNotificationMessage,
    CreateNotificationOutput,
    DeleteNotificationExecutorAdmin,
    DeleteNotificationMessage,
    DeleteNotificationOutput,
    GetNotificationExecutorAdmin,
    GetNotificationMessage,
    GetNotificationMessages,
    GetNotificationOutput,
    GetNotificationOutputExecutor,
    GetNotificationOutputExecutors,
    GetNotificationOutputs,
    GetNotificationsExecutorsAdmin,
    SendNotification,
    UpdateNotificationExecutorAdmin,
    UpdateNotificationMessage,
    UpdateNotificationOutput
} from './notification';
import {
    CreateOrganization,
    DeleteOrganization,
    GetOrganization,
    GetOrganizations,
    UpdateOrganization
} from './organization';
import {CreateSchedule, DeleteSchedule, GetSchedule, GetSchedules, UpdateSchedule} from './schedule';
import {ChangePassword, CreateUser, DeleteUser, GetMe, GetUser, GetUsers, UpdateUser} from './user';
import {
    CreateEdgeApp,
    CreateEdgeAppInstance,
    CreateEdgeAppVersion,
    DownloadEdgeApp,
    GetConfiguredEdgeApps,
    GetEdgeApp,
    GetEdgeAppConfigOptions,
    GetEdgeAppInstance,
    GetEdgeApps,
    GetEdgeAppVersions,
    NameEdgeAppVersion,
    RemoveEdgeAppInstance,
    UpdateEdgeApp,
    UpdateEdgeAppInstance
} from './edge_app';
import {Login, Login2FA, Logout, ResetPassword, ResetPasswordUpdate} from './auth';
import {CreateRole, DeleteRole, GetRole, GetRoles, UpdateRole} from './role';
import {GetPermissions} from './permission';
import {CreateToken, DeleteToken, GetTokens} from './token';
import {
    CreateGatewayCredentials,
    GetGatewayRegistrationPolicy,
    ResetGatewayPassword,
    SetGatewayRegistrationPolicy
} from './gateway';
import {
    CreateUserRegistrationPolicy,
    DeleteUserRegistrationPolicy,
    GetUserRegistrationPolicies,
    GetUserRegistrationPolicy,
    UpdateUserRegistrationPolicy
} from './user_registration_policy';
import {
    CreateFileInstallation,
    CreateFileOrganization,
    DeleteFileInstallation,
    DeleteFileOrganization,
    DownloadFile,
    GetFileInstallation,
    GetFileOrganization,
    GetFilesInstallation,
    GetFilesOrganization,
    UpdateFileInstallation,
    UpdateFileOrganization
} from './file';
import {GetTrace} from './trace';
import {Register} from './register';
import {request, requestBlob, requestJson, requestNull} from './util';

export class LynxClient {
    baseURL: string;
    apiKey?: string;

    constructor(base?: string, apiKey?: string) {
        this.baseURL = base ? base.replace(/\/$/, '') : '';
        this.apiKey = apiKey;
    }

    request = request;
    requestJson = requestJson;
    requestBlob = requestBlob;
    requestNull = requestNull;

    getBaseURL = () => {
        return this.baseURL;
    };

    login = Login;
    login2fa = Login2FA;
    logout = Logout;
    resetPassword = ResetPassword;
    resetPasswordUpdate = ResetPasswordUpdate;

    getFunctions = GetFunctions;
    getFunction = GetFunction;
    createFunction = CreateFunction;
    updateFunction = UpdateFunction;
    deleteFunction = DeleteFunction;
    getFunctionMeta = GetFunctionMeta;
    createFunctionMeta = CreateFunctionMeta;
    updateFunctionMeta = UpdateFunctionMeta;
    deleteFunctionMeta = DeleteFunctionMeta;

    getDevices = GetDevices;
    getDevice = GetDevice;
    createDevice = CreateDevice;
    updateDevice = UpdateDevice;
    deleteDevice = DeleteDevice;
    getDeviceMeta = GetDeviceMeta;
    createDeviceMeta = CreateDeviceMeta;
    updateDeviceMeta = UpdateDeviceMeta;
    deleteDeviceMeta = DeleteDeviceMeta;

    getInstallations = GetInstallations;
    getInstallationRow = GetInstallationRow;
    getInstallation = GetInstallation;
    getInstallationByClientId = GetInstallationByClientId;
    listInstallations = ListInstallations;
    createInstallation = CreateInstallation;
    updateInstallation = UpdateInstallation;
    deleteInstallation = DeleteInstallation;

    getStatus = GetStatus;
    getLog = GetLog;
    getNotificationMessages = GetNotificationMessages;
    getNotificationMessage = GetNotificationMessage;
    deleteNotificationMessage = DeleteNotificationMessage;
    getNotificationOutputs = GetNotificationOutputs;
    getNotificationOutput = GetNotificationOutput;
    createNotificationOutput = CreateNotificationOutput;
    updateNotificationOutput = UpdateNotificationOutput;
    deleteNotificationOutput = DeleteNotificationOutput;
    getNotificationOutputExecutors = GetNotificationOutputExecutors;
    getNotificationOutputExecutor = GetNotificationOutputExecutor;
    sendNotification = SendNotification;
    getNotificationsExecutorsAdmin = GetNotificationsExecutorsAdmin;
    getNotificationExecutorAdmin = GetNotificationExecutorAdmin;
    createNotificationExecutorAdmin = CreateNotificationExecutorAdmin;
    updateNotificationExecutorAdmin = UpdateNotificationExecutorAdmin;
    deleteNotificationExecutorAdmin = DeleteNotificationExecutorAdmin;

    getOrganizations = GetOrganizations;
    getOrganization = GetOrganization;
    createOrganization = CreateOrganization;
    updateOrganization = UpdateOrganization;
    deleteOrganization = DeleteOrganization;

    createNotificationMessage = CreateNotificationMessage;
    updateNotificationMessage = UpdateNotificationMessage;

    getSchedules = GetSchedules;
    getSchedule = GetSchedule;
    createSchedule = CreateSchedule;
    updateSchedule = UpdateSchedule;
    deleteSchedule = DeleteSchedule;

    getMe = GetMe;
    getUser = GetUser;
    getUsers = GetUsers;
    createUser = CreateUser;
    updateUser = UpdateUser;
    deleteUser = DeleteUser;
    changePassword = ChangePassword;

    getEdgeApps = GetEdgeApps;
    getEdgeApp = GetEdgeApp;
    createEdgeApp = CreateEdgeApp;
    updateEdgeApp = UpdateEdgeApp;
    getEdgeAppVersions = GetEdgeAppVersions;
    createEdgeAppVersion = CreateEdgeAppVersion;
    nameEdgeAppVersion = NameEdgeAppVersion;
    getEdgeAppConfigOptions = GetEdgeAppConfigOptions;
    getConfiguredEdgeApps = GetConfiguredEdgeApps;
    getEdgeAppInstance = GetEdgeAppInstance;
    createEdgeAppInstance = CreateEdgeAppInstance;
    updateEdgeAppInstance = UpdateEdgeAppInstance;
    removeEdgeAppInstance = RemoveEdgeAppInstance;
    downloadEdgeApp = DownloadEdgeApp;


    getRoles = GetRoles;
    getRole = GetRole;
    createRole = CreateRole;
    updateRole = UpdateRole;
    deleteRole = DeleteRole;

    getPermissions = GetPermissions;

    createToken = CreateToken;
    deleteToken = DeleteToken;
    getTokens = GetTokens;

    getGatewayRegistrationPolicy = GetGatewayRegistrationPolicy;
    setGatewayRegistrationPolicy = SetGatewayRegistrationPolicy;
    resetGatewayPassword = ResetGatewayPassword;
    createGatewayCredentials = CreateGatewayCredentials;

    getUserRegistrationPolicies = GetUserRegistrationPolicies;
    getUserRegistrationPolicy = GetUserRegistrationPolicy;
    createUserRegistrationPolicy = CreateUserRegistrationPolicy;
    deleteUserRegistrationPolicy = DeleteUserRegistrationPolicy;
    updateUserRegistrationPolicy = UpdateUserRegistrationPolicy;

    getFilesInstallation = GetFilesInstallation;
    getFilesOrganization = GetFilesOrganization;
    getFileInstallation = GetFileInstallation;
    getFileOrganization = GetFileOrganization;
    createFileInstallation = CreateFileInstallation;
    createFileOrganization = CreateFileOrganization;
    updateFileInstallation = UpdateFileInstallation;
    updateFileOrganization = UpdateFileOrganization;
    deleteFileInstallation = DeleteFileInstallation;
    deleteFileOrganization = DeleteFileOrganization;
    downloadFile = DownloadFile;

    getTrace = GetTrace;

    register = Register;
}
