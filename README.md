# Node-Lynx

A wrapper library for IoT Open Lynx API:s.

Some basic functionality have been added and the lib will be
expanded in the future.

## Error handling

The library exports an `HTTPError` class from `src/util.ts` that extends
`Error` and includes `status` (number) and `body` (parsed response) fields.
Consumers that need status codes or response bodies should import and
check for `HTTPError` in their catch handlers, for example:

```ts
import { LynxClient, HTTPError } from '@iotopen/node-lynx';

try {
	await client.requestJson('/api/...');
} catch (err: unknown) {
	if (err instanceof HTTPError) {
		// err.status, err.body available
	} else if (err instanceof Error) {
		// fallback: err.message
	}
}
```

This change is backward-compatible for callers that only read `error.message`.

