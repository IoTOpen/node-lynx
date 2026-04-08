import { describe, expect, it, vi } from 'vitest';
import type { LynxClient } from '../src/client';
import { GetEdgeAppOrganization, GetEdgeAppVersions } from '../src/edge_app';

describe('edge_app.ts', () => {
  it('serializes available when it is false', async () => {
    let capturedEndpoint = '';

    const client = {
      requestJson: vi.fn(async (endpoint: string) => {
        capturedEndpoint = endpoint;
        return [];
      }),
    } as unknown as LynxClient;

    await GetEdgeAppOrganization.call(client, 7, false);

    expect(capturedEndpoint).toBe('/api/v2/edge/app/organization/7?available=false');
  });

  it('omits untagged when it is false', async () => {
    let capturedEndpoint = '';

    const client = {
      requestJson: vi.fn(async (endpoint: string) => {
        capturedEndpoint = endpoint;
        return [];
      }),
    } as unknown as LynxClient;

    await GetEdgeAppVersions.call(client, 9, false);

    expect(capturedEndpoint).toBe('/api/v2/edge/app/9/version');
  });

  it('serializes untagged when it is true', async () => {
    let capturedEndpoint = '';

    const client = {
      requestJson: vi.fn(async (endpoint: string) => {
        capturedEndpoint = endpoint;
        return [];
      }),
    } as unknown as LynxClient;

    await GetEdgeAppVersions.call(client, 9, true);

    expect(capturedEndpoint).toBe('/api/v2/edge/app/9/version?untagged=true');
  });
});
