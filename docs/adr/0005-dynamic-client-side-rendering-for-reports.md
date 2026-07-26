# ADR 5: Render Reports on Client-Side Dynamically to Prevent SSR Hydration Errors

## Status
Accepted

## Date
2026-07-26

## Context
The calendar component used in the Report page (`react-big-calendar`) relies heavily on browser-specific globals (like `window`, `document`) and timezone layouts that depend on local client time. If pre-rendered on the server (SSR), it leads to mismatches with the client's rendered DOM, resulting in runtime hydration failures or application crashes.

## Decision
We will dynamically import the `Report` component on the client-side with `ssr: false` in Next.js. We will also wrap it in React's `<Suspense>` component with a fallback loader.

## Consequences
- The calendar renders correctly only in the browser, eliminating server-to-client DOM mismatches.
- E2E Selenium tests must allow enough time (e.g. increase implicit wait timeouts from 2s to 10s) for dynamic Javascript chunks to load and mount the calendar components in development.
