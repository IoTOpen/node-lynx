import { describe, expect, it, vi } from 'vitest';
import type { LynxClient } from '../src/client';
import { CreateFileInstallation } from '../src/file';
import { MAX_FILE_SIZE } from '../src/file_rules';

function blobWithName(name: string, type = ''): Blob {
    const blob = new Blob(['content'], { type });
    Object.defineProperty(blob, 'name', { value: name });
    return blob;
}

function oversizedBlob(): Blob {
    const blob = new Blob(['content']);
    Object.defineProperty(blob, 'size', { value: MAX_FILE_SIZE + 1 });
    return blob;
}

function createUploadClient() {
    const requestJson = vi.fn(async (_endpoint: string, _options?: RequestInit) => ({
        hash: 'hash',
        name: 'upload',
        mime: '',
    }));
    const client = { requestJson } as unknown as LynxClient;
    return { client, requestJson };
}

describe('file uploads', () => {
    it.each([
        ['a matching filename and MIME type', blobWithName('image.png', 'image/png')],
        ['a missing filename and MIME type', new Blob(['content'])],
        ['a missing MIME type', blobWithName('image.png')],
        ['a missing filename', new Blob(['content'], { type: 'image/png' })],
    ])('accepts %s', async (_description, file) => {
        const { client, requestJson } = createUploadClient();

        await CreateFileInstallation.call(client, 42, file);

        expect(requestJson).toHaveBeenCalledWith(
            '/api/v2/file/installation/42',
            expect.objectContaining({ method: 'POST', body: expect.any(FormData) }),
        );

        const options = requestJson.mock.calls[0]?.[1];
        expect(options?.body).toBeInstanceOf(FormData);
        expect((options?.body as FormData).get('file')).toBeTruthy();
    });

    it.each([
        ['an unsupported extension', blobWithName('payload.exe', 'application/octet-stream'), 'File extension .exe is not allowed.'],
        ['an unsupported MIME type', blobWithName('payload.bin', 'application/x-unknown'), 'MIME type application/x-unknown is not allowed.'],
        ['an extension and MIME mismatch', blobWithName('payload.png', 'application/pdf'), 'Extension .png does not match MIME type application/pdf.'],
        ['a file over the size limit', oversizedBlob(), `File size exceeds limit (${MAX_FILE_SIZE} bytes).`],
    ])('rejects %s', async (_description, file, message) => {
        const { client, requestJson } = createUploadClient();

        expect(() => CreateFileInstallation.call(client, 42, file)).toThrow(message);
        expect(requestJson).not.toHaveBeenCalled();
    });
});
