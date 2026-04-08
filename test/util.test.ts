import { afterEach, describe, expect, it, vi } from 'vitest';
import type { LynxClient } from '../src/client';
import { HTTPError, request, requestBlob, requestJson, requestNull } from '../src/util';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('util.ts', () => {
  it('adds auth headers without clobbering caller headers', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const client = {
      apiKey: 'secret',
      bearer: true,
      baseURL: '',
      request,
    } as unknown as LynxClient;

    await request.call(client, '/api/test', {
      headers: new Headers({ 'X-Test': 'value' }),
    });

    const firstCall = fetchMock.mock.calls[0] as unknown as [RequestInfo | URL, RequestInit | undefined] | undefined;
    const init = firstCall?.[1];
    const headers = new Headers(init?.headers);

    expect(headers.get('authorization')).toBe('Bearer secret');
    expect(headers.get('x-test')).toBe('value');
  });

  it('preserves caller supplied auth headers', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const client = {
      apiKey: 'secret',
      bearer: false,
      baseURL: '',
      request,
    } as unknown as LynxClient;

    await request.call(client, '/api/test', {
      headers: [['X-API-Key', 'caller-key']],
    });

    const firstCall = fetchMock.mock.calls[0] as unknown as [RequestInfo | URL, RequestInit | undefined] | undefined;
    const init = firstCall?.[1];
    const headers = new Headers(init?.headers);

    expect(headers.get('x-api-key')).toBe('caller-key');
  });

  it('sets JSON content type for string bodies', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const client = {
      apiKey: undefined,
      bearer: false,
      baseURL: '',
      request,
      requestJson,
    } as unknown as LynxClient;

    await requestJson.call(client, '/api/test', {
      method: 'POST',
      body: JSON.stringify({ hello: 'world' }),
    });

    const firstCall = fetchMock.mock.calls[0] as unknown as [RequestInfo | URL, RequestInit | undefined] | undefined;
    const init = firstCall?.[1];
    const headers = new Headers(init?.headers);

    expect(headers.get('content-type')).toBe('application/json');
  });

  it('keeps explicit content type on string bodies', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const client = {
      apiKey: undefined,
      bearer: false,
      baseURL: '',
      request,
      requestJson,
    } as unknown as LynxClient;

    await requestJson.call(client, '/api/test', {
      method: 'POST',
      body: JSON.stringify({ hello: 'world' }),
      headers: { 'Content-Type': 'text/plain' },
    });

    const firstCall = fetchMock.mock.calls[0] as unknown as [RequestInfo | URL, RequestInit | undefined] | undefined;
    const init = firstCall?.[1];
    const headers = new Headers(init?.headers);

    expect(headers.get('content-type')).toBe('text/plain');
  });

  it('throws HTTPError for JSON, text, and empty error responses', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ message: 'json failed' }), { status: 400, headers: { 'content-type': 'application/json' } }))
      .mockResolvedValueOnce(new Response('text failed', { status: 500, statusText: 'Server Error', headers: { 'content-type': 'text/plain' } }))
      .mockResolvedValueOnce(new Response(null, { status: 502, statusText: 'Bad Gateway' }))
      .mockResolvedValueOnce(new Response('blob failed', { status: 404, statusText: 'Not Found' }));

    vi.stubGlobal('fetch', fetchMock);

    const client = {
      apiKey: undefined,
      bearer: false,
      baseURL: '',
      request,
      requestJson,
      requestBlob,
      requestNull,
    } as unknown as LynxClient;

    await expect(requestJson.call(client, '/json')).rejects.toMatchObject({
      message: 'json failed',
      status: 400,
      body: { message: 'json failed' },
    });
    await expect(requestJson.call(client, '/text')).rejects.toMatchObject({
      message: 'text failed',
      status: 500,
      body: 'text failed',
    });
    await expect(requestJson.call(client, '/empty')).rejects.toMatchObject({
      message: 'Bad Gateway',
      status: 502,
      body: undefined,
    });
    await expect(requestBlob.call(client, '/blob')).rejects.toMatchObject({
      message: 'blob failed',
      status: 404,
      body: 'blob failed',
    });
  });

  it('returns null for 204 requestNull responses', async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', fetchMock);

    const client = {
      apiKey: undefined,
      bearer: false,
      baseURL: '',
      request,
      requestJson,
      requestNull,
    } as unknown as LynxClient;

    await expect(requestNull.call(client, '/empty')).resolves.toBeNull();
  });
});
