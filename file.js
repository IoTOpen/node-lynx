import {Endpoints, request} from "./util";

export const GetFilesInstallation = (installationId) => {
    return request(Endpoints.File + '/installation/' + installationId, {});
}

export const GetFileInstallation = (installationId, fileId) => {
    return request(Endpoints.File + '/installation/' + installationId + '/' + fileId, {});
}

export const CreateFileInstallation = (installationId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request(Endpoints.File + '/installation/' + installationId, {
        method: 'POST', body: formData
    });
}

export const UpdateFileInstallation = (installationId, fileId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request(Endpoints.File + '/installation/' + installationId + '/' + fileId, {
        method: 'PUT', body: formData
    });
}

export const DeleteFileInstallation = (installationId, fileId) => {
    return request(Endpoints.File + '/installation/' + installationId + '/' + fileId, {
        method: 'DELETE'
    });
}

export const GetFilesOrganization = (organizationId) => {
    return request(Endpoints.File + '/organization/' + organizationId, {});
}

export const GetFileOrganization = (organizationId, fileId) => {
    return request(Endpoints.File + '/organization/' + organizationId + '/' + fileId, {});
}

export const CreateFileOrganization = (organizationId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request(Endpoints.File + '/organization/' + organizationId, {
        method: 'POST', body: formData
    });
}

export const UpdateFileOrganization = (organizationId, fileId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request(Endpoints.File + '/organization/' + organizationId + '/' + fileId, {
        method: 'PUT', body: formData
    });
}

export const DeleteFileOrganization = (organizationId, fileId) => {
    return request(Endpoints.File + '/organization/' + organizationId + '/' + fileId, {
        method: 'DELETE'
    });
}

export const DownloadFile = (hash) => {
    return request(Endpoints.File + '/download/' + hash, {});
}
