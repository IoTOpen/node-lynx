import {
    CreateFunction,
    CreateFunctionMeta,
    DeleteFunction, DeleteFunctionMeta,
    GetFunction,
    GetFunctionMeta,
    GetFunctions,
    UpdateFunction, UpdateFunctionMeta
} from './functionx';
import {
    CreateDevice,
    CreateDeviceMeta,
    DeleteDevice, DeleteDeviceMeta,
    GetDevice,
    GetDeviceMeta,
    GetDevices,
    UpdateDevice, UpdateDeviceMeta
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
    CreateNotificationOutput,
    DeleteNotificationOutput,
    GetNotificationMessages,
    GetNotificationMessage,
    DeleteNotificationMessage,
    GetNotificationOutputs,
    GetNotificationOutput,
    GetNotificationOutputExecutor,
    GetNotificationOutputExecutors,
    UpdateNotificationOutput,
    SendNotification,
    CreateNotificationMessage,
    UpdateNotificationMessage,
    GetNotificationsExecutorsAdmin,
    GetNotificationExecutorAdmin,
    CreateNotificationExecutorAdmin,
    UpdateNotificationExecutorAdmin,
    DeleteNotificationExecutorAdmin
} from './notification';
import {
    CreateOrganization, DeleteOrganization, GetOrganization, GetOrganizations, UpdateOrganization
} from './organization';
import {CreateSchedule, DeleteSchedule, GetSchedule, GetSchedules, UpdateSchedule} from './schedule';
import {ChangePassword, CreateUser, DeleteUser, GetMe, GetUser, GetUsers, UpdateUser} from './user';
import {
    CreateEdgeAppInstance, GetConfiguredEdgeApps,
    GetEdgeApp,
    GetEdgeAppConfigOptions,
    GetEdgeAppInstance,
    GetEdgeApps,
    GetEdgeAppVersions,
    UpdateEdgeAppInstance,
	RemoveEdgeAppInstance
} from './edge_app';
import {Login, Login2FA, Logout, ResetPassword, ResetPasswordUpdate} from './auth';
import {connectionOptions} from './util';
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
    GetUserRegistrationPolicies,
    GetUserRegistrationPolicy,
    UpdateUserRegistrationPolicy,
    DeleteUserRegistrationPolicy
} from './user_registration_policy';
import {
    CreateFileInstallation,
    CreateFileOrganization,
    DeleteFileInstallation,
    DeleteFileOrganization, DownloadFile,
    GetFileInstallation,
    GetFileOrganization,
    GetFilesInstallation,
    GetFilesOrganization,
    UpdateFileInstallation,
    UpdateFileOrganization
} from './file';
import {GetTrace} from './trace';
import {Register} from './register';

export class LynxClient {
    baseURL: string;
    apiKey: string;
    constructor(base: string, apiKey: string) {
        this.baseURL = base.replace(/\/$/, '');
        this.apiKey = apiKey;
    }

    getBaseURL = () => {
        return connectionOptions.baseURL;
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
    getEdgeAppVersions = GetEdgeAppVersions;
    getEdgeAppConfigOptions = GetEdgeAppConfigOptions;
    getConfiguredEdgeApps = GetConfiguredEdgeApps;
    getEdgeAppInstance = GetEdgeAppInstance;
    createEdgeAppInstance = CreateEdgeAppInstance;
    updateEdgeAppInstance = UpdateEdgeAppInstance;
	removeEdgeAppInstance = RemoveEdgeAppInstance;

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
