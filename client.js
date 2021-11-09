import {CreateFunction, DeleteFunction, GetFunction, GetFunctions, UpdateFunction} from "./functionx";
import {CreateDevice, DeleteDevice, GetDevice, GetDevices, UpdateDevice} from "./devicex";
import {
    GetInstallation,
    GetInstallationByClientId,
    GetInstallationRow,
    GetInstallations,
    ListInstallations
} from "./installation";
import {GetLog, GetStatus} from "./log";
import {
    GetNotificationMessage,
    GetNotificationOutput,
    GetNotificationOutputExecutor,
    GetNotificationOutputExecutors
} from "./notification";
import {GetOrganization, GetOrganizations} from "./organization";
import {GetSchedule, GetSchedules} from "./schedule";
import {GetMe, GetUser, GetUsers} from "./user";
import {
    GetConfiguredEdgeApps,
    GetEdgeApp,
    GetEdgeAppConfigOptions,
    GetEdgeAppInstance,
    GetEdgeApps,
    GetEdgeAppVersions
} from "./edge_app";
import {Login, Login2FA, Logout, ResetPassword, ResetPasswordUpdate} from "./auth";
import {connectionOptions} from "./util";

export const LogOrder = {
    Desc: 'desc',
    Asc: 'asc'
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

    getStatus = GetStatus;
    getLog = GetLog;

    getNotificationMessage = GetNotificationMessage;
    getNotificationOutput = GetNotificationOutput;
    getNotificationOutputExecutors = GetNotificationOutputExecutors;
    getNotificationOutputExecutor = GetNotificationOutputExecutor;

    getOrganizations = GetOrganizations;
    getOrganization = GetOrganization;

    getSchedules = GetSchedules;
    getSchedule = GetSchedule;

    getMe = GetMe;
    getUser = GetUser;
    getUsers = GetUsers;

    getEdgeApps = GetEdgeApps;
    getEdgeApp = GetEdgeApp;
    getEdgeAppVersions = GetEdgeAppVersions;
    getEdgeAppConfigOptions = GetEdgeAppConfigOptions;
    getConfiguredEdgeApps = GetConfiguredEdgeApps;
    getEdgeAppInstance = GetEdgeAppInstance;
}

module.exports.LynxClient = LynxClient;
