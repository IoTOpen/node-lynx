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

For username/password authentication, call `login()` and check `next_step`. When
it is `challenge`, the returned token is a challenge token, not a session token.
Ask the user for the code matching `method` (`totp` for an authenticator app,
`sms` for a text message), then exchange it with `login2fa()`:

```ts
const unauthenticated = new LynxClient('https://lynx.example.com');
const login = await unauthenticated.login(username, password);

let token = login.token;
if (login.next_step === 'challenge') {
	const verified = await unauthenticated.login2fa(login.token, code);
	token = verified.token;
}

const client = new LynxClient('https://lynx.example.com', token);
```

Backup codes are accepted by `login2fa()` in place of a TOTP code. When
`next_step` is `reset_password`, the token is only valid for changing the
password with `resetPasswordUpdate(token, newPassword)`.

To enroll the authenticated user in TOTP, call `enrollTOTP()` with the current
password. It returns `secret` and `url` (an `otpauth://` URI). Generate the QR
code from `url` in the frontend, then display it in a protected enrollment view.
The user can scan the QR code or enter the secret in an authenticator app. Do
not log the secret or URL. Call `confirmTOTPEnrollment()` with the six-digit code.

The confirmation returns `backupCodes`. Display them once, store them securely,
and never log them.

```ts
const enrollment = await client.enrollTOTP(password);

const { backupCodes } = await client.confirmTOTPEnrollment(authenticatorCode);
```

`enrollTOTP()` throws status `401` for a wrong password. Both enrollment calls
throw status `409` when TOTP is already enabled.

Use `getTOTPStatus()` to check whether TOTP is active. `enrolled_at` is set when
confirmation succeeds, not when enrollment starts. When TOTP is not enabled, the
response is `{ enabled: false }`.

```ts
const { enabled, enrolled_at } = await client.getTOTPStatus();
```

Enrollment confirmation failures include a `reason` in `HTTPError.body`:
`totp_setup_expired` (start enrollment again), `totp_no_pending_setup` (call
`enrollTOTP()` first), or `totp_invalid_code` (ask for a current code).

To remove TOTP from the authenticated account, call `disableTOTP()` with the
account password and a current TOTP code or unused backup code. A wrong password
or code throws `HTTPError` with status `401`. If TOTP is not enabled, it throws
status `404`. Each backup code works once. Disabling deletes all backup codes;
enroll again to get a new set. Success resolves to `null`.

```ts
await client.disableTOTP(password, code);
```

Administrators check another user's TOTP status with `getUserTOTPStatus()` and
remove a locked-out user's TOTP factor with `resetUserTOTP()`. Both require the
`user/security/totp/reset` permission.

Both calls throw `HTTPError` with status `403` when the caller lacks the
permission or the target user is outside the caller's organizations. They throw
`400` when the target user's role has permissions the caller lacks, and `404`
when the user does not exist. `getUserTOTPStatus()` returns `{ enabled: false }`
when TOTP is not enabled. `resetUserTOTP()` resolves to `null` on success, throws
`404` when TOTP is not enabled, and rejects the caller's own ID with `400`. Use
`disableTOTP()` for the caller's own account.

```ts
const { enabled } = await client.getUserTOTPStatus(userId);
await client.resetUserTOTP(userId);
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

