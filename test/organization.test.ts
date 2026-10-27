import { describe, expect, it, vi } from 'vitest';
import type { LynxClient } from '../src/client';
import type { Organization } from '../src/organization';
import {
  CreateOrganizationMeta,
  DeleteOrganization,
  DeleteOrganizationMeta,
  GetOrganizationMeta,
  GetOrganizations,
  UpdateOrganization,
  UpdateOrganizationMeta,
} from '../src/organization';

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

  it('sends the organization TOTP requirement on update', async () => {
    const requestJson = vi.fn(async (_endpoint: string, options: RequestInit) => JSON.parse(String(options.body)) as Organization);
    const client = { requestJson } as unknown as LynxClient;
    const organization: Organization = {
      id: 1,
      name: 'Example',
      address: { address: '', city: '', country: '', zip: '' },
      email: '',
      phone: '',
      force_sms_login: false,
      force_totp_login: true,
      parent: 0,
      children: [],
      notes: '',
      meta: {},
      protected_meta: {},
      password_valid_days: 0,
    };

    await UpdateOrganization.call(client, organization);

    expect(requestJson).toHaveBeenCalledWith('/api/v2/organization/1', {
      method: 'PUT',
      body: JSON.stringify(organization),
    });
  });

  it('sends a DELETE for the organization', async () => {
    const requestJson = vi.fn(async () => ({ message: 'Deleted' }));
    const client = { requestJson } as unknown as LynxClient;

    await DeleteOrganization.call(client, { id: 1 } as Organization);

    expect(requestJson).toHaveBeenCalledWith('/api/v2/organization/1', { method: 'DELETE' });
  });

  it('encodes the meta key in the get path', async () => {
    const requestJson = vi.fn(async () => ({ value: 'v', protected: false }));
    const client = { requestJson } as unknown as LynxClient;

    await GetOrganizationMeta.call(client, 1, 'a key');

    expect(requestJson).toHaveBeenCalledWith('/api/v2/organization/1/meta/a%20key');
  });

  it('sends silent on create meta', async () => {
    const requestJson = vi.fn(async () => ({ value: 'v', protected: false }));
    const client = { requestJson } as unknown as LynxClient;
    const data = { value: 'v', protected: false };

    await CreateOrganizationMeta.call(client, 1, 'k', data, true);

    expect(requestJson).toHaveBeenCalledWith('/api/v2/organization/1/meta/k?silent=true', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  });

  it('sends silent and create_missing on update meta', async () => {
    const requestJson = vi.fn(async () => ({ value: 'v', protected: false }));
    const client = { requestJson } as unknown as LynxClient;
    const data = { value: 'v', protected: false };

    await UpdateOrganizationMeta.call(client, 1, 'k', data, false, true);

    expect(requestJson).toHaveBeenCalledWith('/api/v2/organization/1/meta/k?silent=false&create_missing=true', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  });

  it('returns the OK message from delete meta', async () => {
    const requestJson = vi.fn(async () => ({ message: 'Deleted' }));
    const client = { requestJson } as unknown as LynxClient;

    const result = await DeleteOrganizationMeta.call(client, 1, 'k');

    expect(requestJson).toHaveBeenCalledWith('/api/v2/organization/1/meta/k?silent=false', { method: 'DELETE' });
    expect(result).toEqual({ message: 'Deleted' });
  });
});
