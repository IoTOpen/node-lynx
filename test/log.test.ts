import { describe, it, expect, vi } from 'vitest';
import { GetStatus, GetLog, LogOrder } from '../src/log';
import { Endpoints } from '../src/util';

describe('log.ts', () => {
  it('GetStatus should build repeated topics query params', async () => {
    const expected = [{ topic: 'a' }];
    let capturedEndpoint = '';

    const client: any = {
      requestJson: vi.fn(async (endpoint: string) => {
        capturedEndpoint = endpoint;
        return expected;
      }),
    };

    const res = await GetStatus.call(client, 42, ['t1', 't2']);
    expect(res).toEqual(expected);
    // Ensure the endpoint contains the base path and repeated topics
    expect(capturedEndpoint.startsWith(`${Endpoints.Status}/42`)).toBe(true);
    const qs = capturedEndpoint.split('?')[1];
    expect(qs).toBeDefined();
    const sp = new URLSearchParams(qs);
    expect(sp.getAll('topics')).toEqual(['t1', 't2']);
  });

  it('GetLog should include topics and other params correctly', async () => {
    const expected = { data: [] };
    let capturedEndpoint = '';

    const client: any = {
      requestJson: vi.fn(async (endpoint: string) => {
        capturedEndpoint = endpoint;
        return expected;
      }),
    };

    const from = 1600000000;
    const to = 1600000100;

    const res = await GetLog.call(client, 7, from, to, 10, 2, LogOrder.Asc, ['x', 'y'], 'avg', '1m');
    expect(res).toEqual(expected);

    expect(capturedEndpoint.startsWith(`${Endpoints.LogV3}/7`)).toBe(true);
    const qs = capturedEndpoint.split('?')[1];
    expect(qs).toBeDefined();
    const sp = new URLSearchParams(qs);
    expect(sp.getAll('topics')).toEqual(['x', 'y']);
    expect(sp.get('from')).toBe(String(from));
    expect(sp.get('to')).toBe(String(to));
    expect(sp.get('limit')).toBe('10');
    expect(sp.get('offset')).toBe('2');
    expect(sp.get('order')).toBe(LogOrder.Asc);
    expect(sp.get('aggr_method')).toBe('avg');
    expect(sp.get('aggr_interval')).toBe('1m');
  });

  it('GetLog should forward request options', async () => {
    const requestJson = vi.fn(async () => ({ data: [] }));
    const client: any = { requestJson };
    const controller = new AbortController();

    await GetLog.call(client, 7, 1600000000, 1600000100, 10, 0, LogOrder.Desc, [], undefined, undefined, {
      signal: controller.signal,
    });

    expect(requestJson).toHaveBeenCalledWith(expect.stringContaining(`${Endpoints.LogV3}/7?`), {
      signal: controller.signal,
    });
  });
});
