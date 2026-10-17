# Local Desktop to Auth/API IPC boundary

## Decision

MAATAA Desktop communicates with the local Auth/API process over a Unix-domain socket, not its TCP listener. On macOS the default endpoint is `~/Library/Application Support/MAATAA/AuthAPI/maataa-auth-api.sock`; both processes may override it with `MAATAA_AUTH_API_SOCKET` for isolated development and tests.

The API process creates the parent directory with owner-only permissions (`0700`) and the socket with `0600`. It refuses to replace an existing socket or a non-socket path. The Desktop client fails closed unless the socket exists, is a socket, has no group/other permissions, and its owner matches the private parent directory and the current home-directory owner. On normal shutdown, the service removes its socket. After a crash, an operator must verify that no service is running before removing a stale socket.

The HTTP protocol and bearer authorization remain inside the local socket. Desktop keeps project tokens in process memory, scopes them to the invoking Tauri window, and forwards only an allow-list of project-record, TLPS data and pilot routes (`api_bridge::validate_route`) for that window's own project. The loopback TCP listener stays available for the TLPS Vite development proxy; it is a development path and is not used by Tauri Desktop.

## Threat boundary and limits

This reduces exposure to other local user accounts and prevents network-interface access to the Desktop token transport. The private directory prevents a different UID from replacing or observing the socket under the normal macOS home-directory permission model. Socket-path and mode checks are defense in depth against a misconfigured endpoint.

This is **not peer process authentication against a malicious process running as the same macOS user**. Such a process can generally inspect or manipulate that user's files and app state. If that actor is in scope, the next design must authenticate the service process (for example, a signed-app identity check or a launchd-managed service with a protected credential) and must be separately reviewed. No such stronger identity check is implemented here.

The retained HTTP listener is for local development only. Do not send production credentials through it or expose it beyond loopback. This note and its tests do not establish production readiness, deployment approval, or a complete system security review.

## Verification

- Desktop validates socket type, owner relationship, and owner-only modes before connecting.
- The Auth/API integration test checks a real HTTP health request over the Unix socket and verifies socket mode `0600`.
- The same integration suite continues to exercise the separate loopback development listener.
- Desktop unit tests reject an unsafe socket directory and exercise fail-closed behavior when the socket is absent.

## Hosted pilot origin (2026-10-18)

The tlps.in origin (`scripts/tlps/pilot-origin.mjs`) uses the same socket. It runs as the same user as the API and checks that the socket directory is owner-only and owned by that user. It refuses a TCP API unless `TLPS_ALLOW_TCP_API=1` is set, which is for development only. Run the API for the pilot with `MAATAA_AUTH_API_PORT=off`: then it opens no TCP listener at all, and `provision-pilot.py` reaches the admin routes over the socket. Production credentials therefore never cross the development TCP listener.
