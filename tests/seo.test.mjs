import assert from 'node:assert/strict';
import test from 'node:test';
import { serializeJsonLd } from '../lib/serialize-json-ld.ts';

test('JSON-LD cannot terminate its HTML script element', () => {
  const value = { name: '</script><script>alert(1)</script>', nested: { text: '<>&\u2028\u2029' } };
  const serialized = serializeJsonLd(value);
  assert.doesNotMatch(serialized, /[<>&\u2028\u2029]/);
  assert.deepEqual(JSON.parse(serialized), value);
});

test('serializer preserves multilingual text and rejects non-JSON root values', () => {
  const value = { description: 'Intelligence artificielle — idées & données', list: [null, 1, true] };
  assert.deepEqual(JSON.parse(serializeJsonLd(value)), value);
  assert.throws(() => serializeJsonLd(undefined), TypeError);
  const circular = {}; circular.self = circular;
  assert.throws(() => serializeJsonLd(circular), TypeError);
});
