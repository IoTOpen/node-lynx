// File validation rules for Lynx API (converted from file_rules.json)
// This file is intended for import in TypeScript/JavaScript projects.

export const ALLOWED_EXTENSIONS: string[] = [
    'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tif', 'tiff',
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'md', 'txt', 'json',
    'xml', 'bin', 'hex', 'fw', 'dfu', 'img', 'upd', 'wav', 'mp3', 'ogg',
    'm4a', 'aac', 'flac', 'amr', 'zip'
];

export const ALLOWED_MIME_TYPES: string[] = [
    'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp',
    'image/bmp', 'image/tiff', 'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv', 'text/markdown', 'text/plain', 'application/json', 'application/xml',
    'text/xml', 'application/octet-stream', 'application/x-binary', 'application/x-firmware',
    'application/x-ihex', 'application/x-dfu', 'application/x-raw-disk-image',
    'application/x-upgrade', 'audio/wav', 'audio/x-wav', 'audio/mpeg', 'audio/ogg',
    'audio/mp4', 'audio/aac', 'audio/flac', 'audio/amr', 'application/zip'
];

export const EXT_TO_MIMES: Record<string, string[]> = {
    '.jpg': ['image/jpeg'],
    '.jpeg': ['image/jpeg'],
    '.png': ['image/png'],
    '.gif': ['image/gif'],
    '.svg': ['image/svg+xml'],
    '.webp': ['image/webp'],
    '.bmp': ['image/bmp'],
    '.tif': ['image/tiff'],
    '.tiff': ['image/tiff'],
    '.pdf': ['application/pdf'],
    '.doc': ['application/msword'],
    '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    '.xls': ['application/vnd.ms-excel'],
    '.xlsx': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    '.csv': ['text/csv'],
    '.md': ['text/markdown'],
    '.txt': ['text/plain'],
    '.json': ['application/json'],
    '.xml': ['application/xml', 'text/xml'],
    '.bin': ['application/octet-stream', 'application/x-binary', 'application/x-firmware'],
    '.hex': ['application/x-ihex', 'application/octet-stream'],
    '.fw': ['application/x-firmware', 'application/octet-stream'],
    '.dfu': ['application/x-dfu', 'application/octet-stream'],
    '.img': ['application/x-raw-disk-image', 'application/octet-stream'],
    '.upd': ['application/x-upgrade', 'application/octet-stream'],
    '.wav': ['audio/wav', 'audio/x-wav'],
    '.mp3': ['audio/mpeg'],
    '.ogg': ['audio/ogg'],
    '.m4a': ['audio/mp4', 'audio/aac'],
    '.aac': ['audio/aac'],
    '.flac': ['audio/flac'],
    '.amr': ['audio/amr'],
    '.zip': ['application/zip']
};

export const MAX_FILE_SIZE = 31457280;
