import { describe, expect, it, vi } from 'vitest';
import { GetInstallationByClientId, GetInstallations } from '../src/installation';

describe('installation.ts', () => {
  it('serializes explicit false for GetInstallations', async () => {
    let capturedEndpoint = '';

    const client: any = {
      requestJson: vi.fn(async (endpoint: string) => {
        capturedEndpoint = endpoint;
        return [];
      }),
    };

    await GetInstallations.call(client, false);

    expect(capturedEndpoint).toContain('?assigned=false');
  });

  it('serializes explicit false for GetInstallationByClientId', async () => {
    let capturedEndpoint = '';

    const client: any = {
      requestJson: vi.fn(async (endpoint: string) => {
        capturedEndpoint = endpoint;
        return { id: 1 };
      }),
    };

    await GetInstallationByClientId.call(client, 42, false);

    expect(capturedEndpoint).toContain('/42?assigned=false');
  });
});
