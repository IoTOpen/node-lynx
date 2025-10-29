import type {LynxClient} from './client';
import type {CreationDate, Identifier, OKResponse} from './types';
import {Endpoints} from './util';

// Hardened file upload: extension, mime, and size validation (client-side)
const ALLOWED_EXTENSIONS = [
    'jpg', 'jpeg', 'png', 'svg', 'webp', 'bmp', 'gif', 'pdf', 'docx',
    'txt', 'csv', 'json', 'xml', 'md',
    'odt', 'ods', 'odp', 'odg'
];
const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
    'image/bmp',
    'image/gif',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/csv',
    'application/json',
    'application/xml',
    'text/xml',
    'text/markdown',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.presentation',
    'application/vnd.oasis.opendocument.graphics'
];
const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30 MB

function getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
}

function validateFile(file: Blob, filename: string, mime: string) {
    // Extension
    const ext = getFileExtension(filename);
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        throw new Error(`File extension .${ext} is not allowed.`);
    }
    // MIME type
    if (!ALLOWED_MIME_TYPES.includes(mime)) {
        throw new Error(`MIME type ${mime} is not allowed.`);
    }
    // Size
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds limit (${MAX_FILE_SIZE} bytes).`);
    }
}

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
    const filename = (file as any).name || 'upload';
    const mime = file.type || '';
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/installation/${installationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileInstallation(this: LynxClient, installationId: number, fileId: number, file: Blob) {
    const filename = (file as any).name || 'upload';
    const mime = file.type || '';
    validateFile(file, filename, mime);
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

export function CreateFileOrganization(this: LynxClient, organizationId: number, file: Blob) {
    const filename = (file as any).name || 'upload';
    const mime = file.type || '';
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileOrganization(this: LynxClient, organizationId: number, fileId: number, file: Blob) {
    const filename = (file as any).name || 'upload';
    const mime = file.type || '';
    validateFile(file, filename, mime);
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
