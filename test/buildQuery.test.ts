import { describe, it, expect } from 'vitest';
import { buildQuery } from '../src/util';

describe('buildQuery', () => {
  it('returns empty string for undefined', () => {
    expect(buildQuery(undefined)).toBe('');
  });

  it('serializes a plain object', () => {
    expect(buildQuery({ a: '1', b: '2' })).toBe('?a=1&b=2');
  });

  it('serializes URLSearchParams', () => {
    expect(buildQuery(new URLSearchParams({ x: 'y' }))).toBe('?x=y');
  });

  it('encodes spaces as +', () => {
    expect(buildQuery({ q: 'a b' })).toBe('?q=a+b');
  });

  it('preserves empty values', () => {
    expect(buildQuery({ empty: '' })).toBe('?empty=');
  });

  it('serializes numbers and booleans', () => {
    expect(buildQuery({ n: 2, b: true })).toBe('?n=2&b=true');
  });

  it('serializes arrays as repeated params', () => {
    expect(buildQuery({ tags: ['a', 'b'] })).toBe('?tags=a&tags=b');
  });

  it('skips undefined and null values', () => {
    expect(buildQuery({ a: undefined, b: null, c: 'ok' })).toBe('?c=ok');
  });
});
