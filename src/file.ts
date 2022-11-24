import {Endpoints, request} from './util';
import {CreationDate, Identifier, OKResponse} from './types';

export type EmptyFile = {
    hash: string
    name: string
    mime: string
    installation_id?: number
    organization_id?: number
}

export type File = EmptyFile & Identifier & CreationDate

export function GetFilesInstallation(installationId: number) {
    return request<File[]>(`${Endpoints.File}/installation/${installationId}`, {});
}

export function GetFileInstallation(installationId: number, fileId: number) {
    return request<File>(`${Endpoints.File}/installation/${installationId}/${fileId}`, {});
}

export function CreateFileInstallation(installationId: number, file: Blob) {
    const formData = new FormData();
    formData.append('file', file);
    return request<File>(`${Endpoints.File}/installation/${installationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileInstallation(installationId: number, fileId: number, file: Blob){
    const formData = new FormData();
    formData.append('file', file);
    return request<File>(`${Endpoints.File}/installation/${installationId}/${fileId}`, {
        method: 'PUT', body: formData
    });
}

export function DeleteFileInstallation (installationId: number, fileId: number){
    return request<OKResponse>(`${Endpoints.File}/installation/${installationId}/${fileId}`, {
        method: 'DELETE'
    });
}

export function GetFilesOrganization(organizationId: number){
    return request<File[]>(`${Endpoints.File}/organization/${organizationId}`, {});
}

export function GetFileOrganization(organizationId: number, fileId: number){
    return request<File>(`${Endpoints.File}/organization/${organizationId}/${fileId}`, {});
}

export function CreateFileOrganization(organizationId: number, file: Blob){
    const formData = new FormData();
    formData.append('file', file);
    return request<File>(`${Endpoints.File}/organization/${organizationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileOrganization(organizationId: number, fileId: number, file: Blob){
    const formData = new FormData();
    formData.append('file', file);
    return request<File>(`${Endpoints.File}/organization/${organizationId}/${fileId}`, {
        method: 'PUT', body: formData
    });
}

export function DeleteFileOrganization(organizationId: number, fileId: number){
    return request<OKResponse>(`${Endpoints.File}/organization/${organizationId}/${fileId}`, {
        method: 'DELETE'
    });
}

export function DownloadFile(hash: string){
    return request(`${Endpoints.File}/download/${hash}`, {});
}
