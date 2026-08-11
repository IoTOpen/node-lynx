# Node-Lynx

Node-Lynx is a typed TypeScript client for the [IoT Open Lynx HTTP API](https://iotopen.se/).
It provides one `LynxClient` with methods for installations, devices, functions,
organizations, users, files, edge apps, notifications, OAuth2, and other Lynx resources.

## Requirements

- Node.js `>=20.19.0 <25`
- An IoT Open Lynx instance and an API key or access token

> [!NOTE]
> The package ships both ESM and CommonJS builds and uses Node.js's built-in `fetch`.

## Installation

```bash
npm install @iotopen/node-lynx
```

## Quick start

```ts
import { HTTPError, LynxClient } from '@iotopen/node-lynx';

const client = new LynxClient(
	process.env.LYNX_URL,
	process.env.LYNX_API_KEY,
);

try {
	const installations = await client.getInstallations();
	console.log(installations);
} catch (error: unknown) {
	if (error instanceof HTTPError) {
		console.error(`Lynx request failed (${error.status})`, error.body);
	} else {
		throw error;
	}
}
```

The constructor accepts `baseURL`, `token`, and an optional `bearer` flag:

```ts
const client = new LynxClient(
	'https://lynx.example.com',
	process.env.LYNX_ACCESS_TOKEN,
	true,
);
```

By default, the credential is sent in `X-API-Key`. Set `bearer` to `true` to
send it as `Authorization: Bearer <token>` instead. Credentials should be kept
in environment variables or another secret store.

## Authentication

For username/password authentication, call `login()` and use the returned token
to create an authenticated client:

```ts
const unauthenticated = new LynxClient('https://lynx.example.com');
const { token } = await unauthenticated.login(username, password);
const client = new LynxClient('https://lynx.example.com', token);
```

The client also exposes `requestJson`, `requestBlob`, and `requestNull` for API
routes that are not covered by a convenience method.

## Error handling

Non-success HTTP responses throw the exported `HTTPError` class. It extends
`Error` and includes the numeric `status` and a `body` containing parsed JSON,
plain text, or `undefined` when the response has no readable body.

```ts
try {
	await client.requestJson('/api/v2/example');
} catch (error: unknown) {
	if (error instanceof HTTPError) {
		console.error(error.status, error.body);
	} else if (error instanceof Error) {
		console.error(error.message);
	}
}
```

## Development

```bash
pnpm install
pnpm test --run       # Run tests
pnpm lint             # Lint and type-check
pnpm run build        # Build ESM, CommonJS, and declarations
pnpm release:check    # Run the complete release validation
```

The public client and exported types are defined in [`src/client.ts`](src/client.ts)
and [`src/index.ts`](src/index.ts). Endpoint modules in `src/` share the client's
authentication and error handling through the request helpers.

