import { describe, expect, it } from 'vitest';
import { clone, zero } from '../src/zero';

describe('zero.ts', () => {
  it('clone preserves arrays as arrays', () => {
    const input = [{ nested: [2, { deeper: ['x'] }] }];

    const output = clone(input) as Array<{ nested: Array<number | { deeper: string[] }> }>;

    expect(Array.isArray(output)).toBe(true);
    expect(Array.isArray(output[0].nested)).toBe(true);
    expect(Array.isArray((output[0].nested[1] as { deeper: string[] }).deeper)).toBe(true);
    expect(output).toEqual(input);
    expect(output).not.toBe(input);
  });

  it('zero helpers return array fields as arrays', () => {
    const edgeApp = zero.getEmptyEdgeApp();
    const installationInfo = zero.getInstallationInfo();
    const user = zero.getUser();
    const organizationSimple = zero.getOrganizationSimple();

    expect(Array.isArray(edgeApp.tags)).toBe(true);
    expect(Array.isArray(edgeApp.publisher.apps)).toBe(true);
    expect(Array.isArray(installationInfo.capabilities)).toBe(true);
    expect(Array.isArray(user.assigned_installations)).toBe(true);
    expect(organizationSimple.parent).toBe(0);
  });
});
