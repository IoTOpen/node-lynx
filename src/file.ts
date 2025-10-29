import type { LynxClient } from './client';
import type { CreationDate, Identifier, OKResponse } from './types';
import { Endpoints } from './util';
import { ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, EXT_TO_MIMES, MAX_FILE_SIZE } from './file_rules.js';

function getFileExtension (filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
}

// Validate file using shared ruleset
function validateFile (file: Blob, filename: string, mime: string) {
    const ext = getFileExtension(filename);
    if (!ext) {
        throw new Error('File must have an extension.');
    }
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        throw new Error(`File extension .${ext} is not allowed.`);
    }
    if (!ALLOWED_MIME_TYPES.includes(mime)) {
        throw new Error(`MIME type ${mime} is not allowed.`);
    }
    // Optionally: check that ext/mime match (if EXT_TO_MIMES is used)
    const extKey = `.${ext}`;
    if (Object.prototype.hasOwnProperty.call(EXT_TO_MIMES, extKey)) {
        const mimes = EXT_TO_MIMES[extKey];
        if (!mimes || !mimes.includes(mime)) {
            throw new Error(`Extension .${ext} does not match MIME type ${mime}.`);
        }
    }
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

export function GetFilesInstallation (this: LynxClient, installationId: number) {
    return this.requestJson<File[]>(`${Endpoints.File}/installation/${installationId}`);
}

export function GetFileInstallation (this: LynxClient, installationId: number, fileId: number) {
    return this.requestJson<File>(`${Endpoints.File}/installation/${installationId}/${fileId}`);
}

export function CreateFileInstallation (this: LynxClient, installationId: number, file: Blob) {
    const filename = (file as any).name || 'upload';
    const mime = file.type || '';
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/installation/${installationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileInstallation (this: LynxClient, installationId: number, fileId: number, file: Blob) {
    const filename = (file as any).name || 'upload';
    const mime = file.type || '';
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/installation/${installationId}/${fileId}`, {
        method: 'PUT', body: formData
    });
}

export function DeleteFileInstallation (this: LynxClient, installationId: number, fileId: number) {
    return this.requestJson<OKResponse>(`${Endpoints.File}/installation/${installationId}/${fileId}`, {
        method: 'DELETE'
    });
}

export function GetFilesOrganization (this: LynxClient, organizationId: number) {
    return this.requestJson<File[]>(`${Endpoints.File}/organization/${organizationId}`);
}

export function GetFileOrganization (this: LynxClient, organizationId: number, fileId: number) {
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}/${fileId}`);
}

export function CreateFileOrganization (this: LynxClient, organizationId: number, file: Blob) {
    const filename = (file as any).name || 'upload';
    const mime = file.type || '';
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileOrganization (this: LynxClient, organizationId: number, fileId: number, file: Blob) {
    const filename = (file as any).name || 'upload';
    const mime = file.type || '';
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file);
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}/${fileId}`, {
        method: 'PUT', body: formData
    });
}

export function DeleteFileOrganization (this: LynxClient, organizationId: number, fileId: number) {
    return this.requestJson<OKResponse>(`${Endpoints.File}/organization/${organizationId}/${fileId}`, {
        method: 'DELETE'
    });
}

export function DownloadFile (this: LynxClient, hash: string) {
    return this.requestBlob(`${Endpoints.File}/download/${hash}`);
}

// NOTE: File validation rules are now loaded from src/file_rules.ts. Update that file to change allowed types.
