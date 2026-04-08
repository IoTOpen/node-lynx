import { describe, expect, it, vi } from 'vitest';
import type { LynxClient } from '../src/client';
import { GetOrganizations } from '../src/organization';

describe('organization.ts', () => {
  it('omits minimal when it is false', async () => {
    let capturedEndpoint = '';

    const client = {
      requestJson: vi.fn(async (endpoint: string) => {
        capturedEndpoint = endpoint;
        return [];
      }),
    } as unknown as LynxClient;

    await GetOrganizations.call(client, false);

    expect(capturedEndpoint).toBe('/api/v2/organization');
  });

  it('serializes minimal when it is true', async () => {
    let capturedEndpoint = '';

    const client = {
      requestJson: vi.fn(async (endpoint: string) => {
        capturedEndpoint = endpoint;
        return [];
      }),
    } as unknown as LynxClient;

    await GetOrganizations.call(client, true);

    expect(capturedEndpoint).toBe('/api/v2/organization?minimal=true');
  });
});
