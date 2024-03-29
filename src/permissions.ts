export enum Permissions {
    installationListAll = 'installation/list/all',
    installationListAssigned = 'installation/list/assigned',
    installationCreate = 'installation/create',
    installationDeleteAll = 'installation/delete/all',
    installationDeleteAssigned = 'installation/delete/assigned',
    installationUpdateAll = 'installation/update/all',
    installationUpdateAssigned = 'installation/update/assigned',
    installationEditProtectedMetaAll = 'installation/edit/protected_meta/all',
    installationEditProtectedMetaAssigned = 'installation/edit/protected_meta/assigned',
    installationViewProtectedMetaAll = 'installation/view/protected_meta/all',
    installationViewProtectedMetaAssigned = 'installation/view/protected_meta/assigned',

    functionxListAll = 'functionx/list/all',
    functionxListAssigned = 'functionx/list/assigned',
    functionxCreateDeleteAll = 'functionx/create_delete/all',
    functionxCreateDeleteAssigned = 'functionx/create_delete/assigned',
    functionxUpdateAll = 'functionx/update/all',
    functionxUpdateAssigned = 'functionx/update/assigned',
    functionxEditProtectedMetaAll = 'functionx/edit/protected_meta/all',
    functionxEditProtectedMetaAssigned = 'functionx/edit/protected_meta/assigned',
    functionxViewProtectedMetaAll = 'functionx/view/protected_meta/all',
    functionxViewProtectedMetaAssigned = 'functionx/view/protected_meta/assigned',

    devicexListAll = 'devicex/list/all',
    devicexListAssigned = 'devicex/list/assigned',
    devicexCreateDeleteAll = 'devicex/create_delete/all',
    devicexCreateDeleteAssigned = 'devicex/create_delete/assigned',
    devicexUpdateAll = 'devicex/update/all',
    devicexUpdateAssigned = 'devicex/update/assigned',
    devicexEditProtectedMetaAll = 'devicex/edit/protected_meta/all', //  devicexEditProtectedMetaAssigned= 'devicex/edit/protected_meta/assigned',
    devicexViewProtectedMetaAll = 'devicex/view/protected_meta/all',
    devicexViewProtectedMetaAssigned = 'devicex/view/protected_meta/assigned',

    logReadAll = 'log/read/all',
    logReadAssigned = 'log/read/assigned',

    scheduleListAll = 'schedule/list/all',
    scheduleListAssigned = 'schedule/list/assigned',
    scheduleCreateDeleteAll = 'schedule/create_delete/all',
    scheduleCreateDeleteAssigned = 'schedule/create_delete/assigned',
    scheduleUpdateAll = 'schedule/update/all',
    scheduleUpdateAssigned = 'schedule/update/assigned',

    edgeAppList = 'edge/app/list',
    edgeAppCreate = 'edge/app/create',
    edgeAppUpdate = 'edge/app/update',
    edgeAppConfiguredListAll = 'edge/app/configured/list/all',
    edgeAppConfiguredListAssigned = 'edge/app/configured/list/assigned',
    edgeAppConfiguredCreateDeleteAll = 'edge/app/configured/create_delete/all',
    edgeAppConfiguredCreateDeleteAssigned = 'edge/app/configured/create_delete/assigned',
    edgeAppConfiguredUpdateAll = 'edge/app/configured/update/all',
    edgeAppConfiguredUpdateAssigned = 'edge/app/configured/update/assigned',

    mobileCreate = 'mobile/create',

    notificationExecutorListAll = 'notification/executor/list/all',
    notificationExecutorListAssigned = 'notification/executor/list/assigned',

    notificationMessageListAll = 'notification/message/list/all',
    notificationMessageListAssigned = 'notification/message/list/assigned',
    notificationMessageCreateDeleteAll = 'notification/message/create_delete/all',
    notificationMessageCreateDeleteAssigned = 'notification/message/create_delete/assigned',
    notificationMessageUpdateAll = 'notification/message/update/all',
    notificationMessageUpdateAssigned = 'notification/message/update/assigned',

    notificationOutputListAll = 'notification/output/list/all',
    notificationOutputListAssigned = 'notification/output/list/assigned',
    notificationOutputCreateDeleteAll = 'notification/output/create_delete/all',
    notificationOutputCreateDeleteAssigned = 'notification/output/create_delete/assigned',
    notificationOutputUpdateAll = 'notification/output/update/all',
    notificationOutputUpdateAssigned = 'notification/output/update/assigned',
    notificationOutputSendAll = 'notification/output/send/all',
    notificationOutputSendAssigned = 'notification/output/send/assigned',

    organizationListAll = 'organization/list/all',
    organizationList = 'organization/list',
    organizationCreateDelete = 'organization/create_delete',
    organizationUpdate = 'organization/update',
    organizationEditProtectedMetaAll = 'organization/edit/protected_meta/all',
    organizationEditProtectedMetaAssigned = 'organization/edit/protected_meta/assigned',
    organizationViewProtectedMetaAll = 'organization/view/protected_meta/all',
    organizationViewProtectedMetaAssigned = 'organization/view/protected_meta/assigned',

    roleCreateDelete = 'role/create_delete',
    roleUpdate = 'role/update',

    StatusReadAll = 'status/read/all',
    StatusReadAssigned = 'status/read/assigned',

    userList = 'user/list', //  userListAssigned= 'user/list/assigned',
    userCreateDelete = 'user/create/delete',
    userUpdate = 'user/update',
    userEditProtectedMetaAll = 'user/edit/protected_meta/all', //  userEditProtectedMetaAssigned= 'user/edit/protected_meta/assigned',
    userViewProtectedMetaAll = 'user/view/protected_meta/all', //  userViewProtectedMetaAssigned= 'user/view/protected_meta/assigned',

    userRegistrationPolicyList = 'registration/policy/list',
    userRegistrationPolicyCreateDelete = 'registration/policy/create_delete',
    userRegistrationPolicyUpdate = 'registration/policy/update',

    gatewayRegistrationPolicySetGet = 'gateway/registration/policy',

    gatewayResetPasswordAll = 'gateway/reset/password/all',
    gatewayResetPasswordAssigned = 'gateway/reset/password/assigned',

    mqttSubscribeAll = 'mqtt/subscribe/all',
    mqttSubscribeAssigned = 'mqtt/subscribe/assigned',
    mqttSubscribeBroad = 'mqtt/subscribe/broad',
    mqttPublishAll = 'mqtt/publish/all',
    mqttPublishAssigned = 'mqtt/publish/assigned',

    fileListAll = 'file/list/all',
    fileListAssigned = 'file/list/assigned',
    fileDownloadAll = 'file/download/all',
    fileDownloadAssigned = 'file/download/assigned',
    fileCreateDeleteAll = 'file/create_delete/all',
    fileCreateDeleteAssigned = 'file/create_delete/assigned',
    fileUpdateAll = 'file/update/all',
    fileUpdateAssigned = 'file/update/assigned',
    fileUpdateOrganization = 'file/update/organization',

    traceList = 'trace/list',
    traceListSystem = 'trace/list/system',

    userSecurityTokenCreateDelete = 'user/security/token/create_delete',
    userSecurityTokenListAll = 'user/security/token/list/all',

    topicBlacklistManagement = 'mqtt/blacklist/topic/manage',

    OAuth2ClientAdminCreateDelete = 'oauth2_client/admin/create_delete',
    OAuth2ClientAdminUpdate = 'oauth2_client/admin/update'
}
