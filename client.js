import {CreateFunction, DeleteFunction, GetFunction, GetFunctions, UpdateFunction} from "./functionx";
import {CreateDevice, DeleteDevice, GetDevice, GetDevices, UpdateDevice} from "./devicex";
import {
    CreateInstallation,
    DeleteInstallation,
    GetInstallation,
    GetInstallationByClientId,
    GetInstallationRow,
    GetInstallations,
    ListInstallations,
    UpdateInstallation
} from "./installation";
import {GetLog, GetStatus} from "./log";
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
    UpdateNotificationMessage
} from "./notification";
import {
    CreateOrganization, DeleteOrganization, GetOrganization, GetOrganizations, UpdateOrganization
} from "./organization";
import {CreateSchedule, DeleteSchedule, GetSchedule, GetSchedules, UpdateSchedule} from "./schedule";
import {CreateUser, DeleteUser, GetMe, GetUser, GetUsers, UpdateUser} from "./user";
import {
    GetConfiguredEdgeApps, GetEdgeApp, GetEdgeAppConfigOptions, GetEdgeAppInstance, GetEdgeApps, GetEdgeAppVersions
} from "./edge_app";
import {Login, Login2FA, Logout, ResetPassword, ResetPasswordUpdate} from "./auth";
import {connectionOptions} from "./util";
import {CreateRole, DeleteRole, GetRole, GetRoles, UpdateRole} from "./role";
import {GetPermissions} from "./permission";
import {CreateToken, DeleteToken, GetTokens} from "./token";

export const LogOrder = {
    Desc: 'desc', Asc: 'asc'
}

class LynxClient {
    constructor(base, apiKey) {
        connectionOptions.baseURL = base.replace(/\/$/, "");
        connectionOptions.apiKey = apiKey;
    }

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

    getDevices = GetDevices;
    getDevice = GetDevice;
    createDevice = CreateDevice;
    updateDevice = UpdateDevice;
    deleteDevice = DeleteDevice;

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

    getEdgeApps = GetEdgeApps;
    getEdgeApp = GetEdgeApp;
    getEdgeAppVersions = GetEdgeAppVersions;
    getEdgeAppConfigOptions = GetEdgeAppConfigOptions;
    getConfiguredEdgeApps = GetConfiguredEdgeApps;
    getEdgeAppInstance = GetEdgeAppInstance;

    getRoles = GetRoles;
    getRole = GetRole;
    createRole = CreateRole;
    updateRole = UpdateRole;
    deleteRole = DeleteRole;

    getPermissions = GetPermissions;

    createToken = CreateToken;
    deleteToken = DeleteToken;
    getTokens = GetTokens;
}

module.exports.LynxClient = LynxClient;
