import type { LynxClient } from './client';
import { ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, EXT_TO_MIMES, MAX_FILE_SIZE } from './file_rules.js';
import type { CreationDate, Identifier, OKResponse } from './types';
import { Endpoints } from './util';

/**
 * Represents a File object with a name property, extending the base Blob type.
 * Used to safely access the filename when uploading files.
 */
interface FileWithName extends Blob {
    name: string;
}

/**
 * Type guard to check if a Blob has a name property (i.e., is a File).
 */
function hasFileName(file: Blob): file is FileWithName {
    return 'name' in file && typeof (file as FileWithName).name === 'string';
}

/**
 * Extracts the file extension from a filename, returning lowercase.
 * Returns empty string if no extension is found.
 */
function getFileExtension(filename: string): string {
    const parts = filename.split('.');
    if (parts.length > 1) {
        const ext = parts[parts.length - 1];
        return ext ? ext.toLowerCase() : '';
    }
    return '';
}

/**
 * Validates file against security rules: extension, MIME type, and size.
 * Throws Error if validation fails, preventing upload of unauthorized file types.
 */
function validateFile(file: Blob, filename: string, mime: string) {
    const ext = getFileExtension(filename);
    if (ext && !ALLOWED_EXTENSIONS.includes(ext)) {
        throw new Error(`File extension .${ext} is not allowed.`);
    }
    if (mime && !ALLOWED_MIME_TYPES.includes(mime)) {
        throw new Error(`MIME type ${mime} is not allowed.`);
    }
    // Check that ext/mime match to prevent MIME type spoofing
    const extKey = `.${ext}`;
    if (ext && mime && Object.prototype.hasOwnProperty.call(EXT_TO_MIMES, extKey)) {
        const mimes = EXT_TO_MIMES[extKey];
        if (!mimes?.includes(mime)) {
            throw new Error(`Extension .${ext} does not match MIME type ${mime}.`);
        }
    }
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds limit (${MAX_FILE_SIZE} bytes).`);
    }
}

/**
 * Safely extracts filename from a Blob. Falls back to 'upload' if no name property exists.
 */
function getFilename(file: Blob): string {
    return hasFileName(file) ? file.name : 'upload';
}

/**
 * Safely extracts MIME type from a Blob. Falls back to empty string if not set.
 */
function getMimeType(file: Blob): string {
    return file.type;
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
    const filename = getFilename(file);
    const mime = getMimeType(file);
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file, filename);
    return this.requestJson<File>(`${Endpoints.File}/installation/${installationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileInstallation(this: LynxClient, installationId: number, fileId: number, file: Blob) {
    const filename = getFilename(file);
    const mime = getMimeType(file);
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file, filename);
    return this.requestJson<File>(`${Endpoints.File}/installation/${installationId}/${fileId}`, {
        method: 'PUT', body: formData
    });
}

export function DeleteFileInstallation(this: LynxClient, installationId: number, fileId: number) {
    return this.requestJson<OKResponse>(`${Endpoints.File}/installation/${installationId}/${fileId}`, {
        method: 'DELETE'
    });
}

export function GetFilesOrganization(this: LynxClient, organizationId: number) {
    return this.requestJson<File[]>(`${Endpoints.File}/organization/${organizationId}`);
}

export function GetFileOrganization(this: LynxClient, organizationId: number, fileId: number) {
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}/${fileId}`);
}

export function CreateFileOrganization(this: LynxClient, organizationId: number, file: Blob) {
    const filename = getFilename(file);
    const mime = getMimeType(file);
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file, filename);
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}`, {
        method: 'POST', body: formData
    });
}

export function UpdateFileOrganization(this: LynxClient, organizationId: number, fileId: number, file: Blob) {
    const filename = getFilename(file);
    const mime = getMimeType(file);
    validateFile(file, filename, mime);
    const formData = new FormData();
    formData.append('file', file, filename);
    return this.requestJson<File>(`${Endpoints.File}/organization/${organizationId}/${fileId}`, {
        method: 'PUT', body: formData
    });
}

export function DeleteFileOrganization(this: LynxClient, organizationId: number, fileId: number) {
    return this.requestJson<OKResponse>(`${Endpoints.File}/organization/${organizationId}/${fileId}`, {
        method: 'DELETE'
    });
}

export function DownloadFile(this: LynxClient, hash: string) {
    return this.requestBlob(`${Endpoints.File}/download/${hash}`);
}
