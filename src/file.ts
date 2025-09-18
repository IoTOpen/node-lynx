import type {LynxClient} from './client';
import type {CreationDate, Identifier, OKResponse} from './types';
import {Endpoints} from './util';

export interface EmptyFile {
    hash: string
    name: string
    mime: string
    installation_id?: number
    organization_id?: number
}

export type File = EmptyFile & Identifier & CreationDate

export function GetFilesInstallation(this: LynxClient, installationId: number) {
    return this.requestJson<File[]>(`${Endpoints.File}/installation/${installationId}`);
}

export function GetFileInstallation(this: LynxClient, installationId: number, fileId: number) {
    return this.requestJson<File>(`${Endpoints.File}/installation/${installationId}/${fileId}`);
}

export function CreateFileInstallation(this: LynxClient, installationId: number, file: Blob) {
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/installation/${installationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileInstallation(this: LynxClient, installationId: number, fileId: number, file: Blob){
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/installation/${installationId}/${fileId}`, {
        method: 'PUT', body: formData
    });
}

export function DeleteFileInstallation (this: LynxClient, installationId: number, fileId: number){
    return this.requestJson<OKResponse>(`${Endpoints.File}/installation/${installationId}/${fileId}`, {
        method: 'DELETE'
    });
}

export function GetFilesOrganization(this: LynxClient, organizationId: number){
    return this.requestJson<File[]>(`${Endpoints.File}/organization/${organizationId}`);
}

export function GetFileOrganization(this: LynxClient, organizationId: number, fileId: number){
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}/${fileId}`);
}

export function CreateFileOrganization(this: LynxClient, organizationId: number, file: Blob){
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileOrganization(this: LynxClient, organizationId: number, fileId: number, file: Blob){
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}/${fileId}`, {
        method: 'PUT', body: formData
    });
}

export function DeleteFileOrganization(this: LynxClient, organizationId: number, fileId: number){
    return this.requestJson<OKResponse>(`${Endpoints.File}/organization/${organizationId}/${fileId}`, {
        method: 'DELETE'
    });
}

export function DownloadFile(this: LynxClient, hash: string){
    return this.requestBlob(`${Endpoints.File}/download/${hash}`);
}
