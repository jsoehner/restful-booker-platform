# ADR 3: Use Next.js for the Frontend Application

## Status
Accepted

## Date
2026-07-26

## Context
We need a modern, scalable web frontend framework that integrates easily with the microservices APIs. The frontend needs to be responsive, support modern UI/UX practices, and allow both Server-Side Rendering (SSR) and Client-Side rendering.

## Decision
We will use **Next.js** (built on React) for the `assets` service. We will utilize Next.js API Routes / Rewrites to resolve CORS issues by acting as a gateway/proxy to backend services under `/api/*`.

## Consequences
- Requires a Node.js runtime to build and run the frontend.
- Backend routing is simplified as all API calls go to `/api/*` and are proxied to individual service ports via next config rewrites.
- Developers must configure client-side hooks appropriately to handle dynamic states.
