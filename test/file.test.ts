import { describe, expect, it, vi } from 'vitest';
import type { LynxClient } from '../src/client';
import { CreateFileInstallation } from '../src/file';
import { MAX_FILE_SIZE } from '../src/file_rules';

function blobWithName(name: string, type = ''): Blob {
    const blob = new Blob(['content'], { type });
    Object.defineProperty(blob, 'name', { value: name });
    return blob;
}

function blobWithSize(size: number): Blob {
    const blob = new Blob(['content']);
    Object.defineProperty(blob, 'size', { value: size });
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
        ['a matching filename and MIME type', blobWithName('image.png', 'image/png'), 'image.png'],
        ['a missing filename and MIME type', new Blob(['content']), 'upload'],
        ['a missing MIME type', blobWithName('image.png'), 'image.png'],
        ['a missing filename', new Blob(['content'], { type: 'image/png' }), 'upload'],
        ['a file at the size limit', blobWithSize(MAX_FILE_SIZE), 'upload'],
    ])('accepts %s', async (_description, file, expectedFilename) => {
        const { client, requestJson } = createUploadClient();

        await CreateFileInstallation.call(client, 42, file);

        expect(requestJson).toHaveBeenCalledWith(
            '/api/v2/file/installation/42',
            expect.objectContaining({ method: 'POST', body: expect.any(FormData) }),
        );

        const options = requestJson.mock.calls[0]?.[1];
        expect(options?.body).toBeInstanceOf(FormData);
        expect((options?.body as FormData).get('file')).toMatchObject({ name: expectedFilename });
    });

    it.each([
        ['an unsupported extension', blobWithName('payload.exe', 'application/octet-stream'), 'File extension .exe is not allowed.'],
        ['an unsupported MIME type', blobWithName('payload.bin', 'application/x-unknown'), 'MIME type application/x-unknown is not allowed.'],
        ['an extension and MIME mismatch', blobWithName('payload.png', 'application/pdf'), 'Extension .png does not match MIME type application/pdf.'],
        ['a file over the size limit', blobWithSize(MAX_FILE_SIZE + 1), `File size exceeds limit (${MAX_FILE_SIZE} bytes).`],
    ])('rejects %s', (_description, file, message) => {
        const { client, requestJson } = createUploadClient();

        expect(() => CreateFileInstallation.call(client, 42, file)).toThrow(message);
        expect(requestJson).not.toHaveBeenCalled();
    });
});
