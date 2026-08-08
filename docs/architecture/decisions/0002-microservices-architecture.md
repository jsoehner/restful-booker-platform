# ADR 2: Adopt Microservices Architecture for restful-booker-platform

## Status
Accepted

## Date
2026-07-26

## Context
The original `restful-booker` was a single monolithic API designed for basic API testing practice. However, real-world systems are typically distributed. To train engineers on testing strategies in complex environments (such as end-to-end integration, contract testing, and partial system failures), a monolithic architecture is insufficient.

## Decision
We will split the booking platform into a microservices architecture composed of independent service components:
- **Auth**: Handles session generation, validation, and user credentials.
- **Booking**: Manages room bookings.
- **Room**: Manages room listings, availability, and prices.
- **Branding**: Holds configurations for custom Bed and Breakfast branding (hotel name, contact info, logo).
- **Message**: Receives and processes contact forms or customer feedback.
- **Report**: Computes room utilization reports.
- **Assets**: A React/Next.js frontend that coordinates pages and aggregates data from these APIs.

## Consequences
- Independent build pipelines and run commands for each component.
- Testers must deal with network-related latency, asynchronous communication, and independent deployability of services.
- Local execution requires starting up all 6 backend services plus the frontend web server (orchestrated by scripts).
