---
adr_id: "ADR-2026-0002"
title: "Adopt Microservices Architecture for restful-booker-platform"
status: "Accepted"
risk_tier: "Tier 1"
control_domains:
  - Architecture
  - Operations
  - DevSecOps
  - Resilience
created_date: "2026-07-26"
proposed_date: "2026-07-26"
accepted_date: "2026-07-26"
implemented_date: "2026-07-26"
validated_date: "2026-07-26"
next_review_date: "2027-07-26"
review_triggers:
  - "Material architecture change"
  - "Major component reorganization"
adr_owner:
  name: "jsoehner"
  role: "Repository Maintainer"
decision_owner:
  name: "jsoehner"
  role: "Repository Maintainer"
accountable_role_or_forum: "restful-booker-platform Engineering"
acceptors:
  - name: "jsoehner"
    role: "Repository Maintainer"
    forum: "Architecture Review"
    approval_evidence: "Initial Architecture Baseline"
    date: "2026-07-26"
consulted_stakeholders: []
informed_stakeholders: []
affected_systems:
  - "restful-booker-platform"
affected_repositories:
  - "jsoehner/restful-booker-platform"
affected_services:
  - "Auth Service"
  - "Booking Service"
  - "Room Service"
  - "Branding Service"
  - "Message Service"
  - "Report Service"
  - "Assets Frontend"
data_classification: "Internal"
external_exposure: "REST APIs & Web Frontend"
third_party_dependency: "Spring Boot, Next.js"
model_or_ai_impact: "None"
residual_risk_owner:
  name: "jsoehner"
  role: "Repository Maintainer"
exceptions_or_risk_acceptances: []
technical_debt_items: []
technical_debt_assessment:
  impact: "None"
  score: 0
  rationale: "Decomposing into microservices improves testability in distributed environments."
  existing_debt_references: []
  new_or_changed_debt_items: []
  debt_owner:
    name: "jsoehner"
    role: "Repository Maintainer"
  remediation_plan: "N/A"
  remediation_due_date: "N/A"
  review_date: "N/A"
  related_exceptions_or_risk_acceptances: []
traceability:
  requirements:
    - "Simulate complex distributed testing environment"
    - "Decouple backend domain services"
  diagrams: []
  threat_model: []
  risk_assessment: []
  standards_exception: []
  change_records: []
  pull_requests: []
  test_evidence: []
  deployment_evidence: []
  runbooks: []
  monitoring: []
supersedes: []
superseded_by: []
retention_classification: "Standard"
legal_hold: false
---

# ADR-2026-0002: Adopt Microservices Architecture for restful-booker-platform

## 1. Status

**Current status:** Accepted

**Lifecycle notes:**

- Created: 2026-07-26
- Proposed: 2026-07-26
- Accepted: 2026-07-26
- Implemented: 2026-07-26
- Validated: 2026-07-26
- Next review: 2027-07-26

## 2. Executive decision summary

- **Decision outcome:** Split the booking platform into a microservices architecture composed of independent service components: Auth, Booking, Room, Branding, Message, Report, and Assets (Next.js frontend).
- **Primary reason:** Transition from a basic single monolithic API (`restful-booker`) to a distributed microservices model to train engineers on testing strategies in complex environments (such as end-to-end integration, contract testing, and partial system failures).
- **Key risk or trade-off:** Increased operational complexity for local execution and environment setup.
- **Required controls or conditions:** Local startup orchestration scripts and standard REST interfaces across all components.
- **Implementation validation approach:** End-to-end integration testing across all 6 backend services and frontend web server.

## 3. Context and problem statement

The original `restful-booker` was a single monolithic API designed for basic API testing practice. However, real-world systems are typically distributed. To train engineers on testing strategies in complex environments (such as end-to-end integration, contract testing, and partial system failures), a monolithic architecture is insufficient.

## 4. Decision drivers

| Driver | Description | Priority |
|---|---|---|
| Business outcome | Realistic distributed environment for advanced API and integration testing | High |
| Operational resilience | Independent service boundaries allowing partial failure simulation | High |
| Maintainability and supportability | Domain-driven modularity across backend features | Medium |

## 5. Options considered

| Option | Description | Pros | Cons | Risk / Control Implications | Disposition |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Option 1: Microservices Architecture (7 Independent Components)** | Split platform into Auth, Booking, Room, Branding, Message, Report, and Assets frontend. | <ul><li>Enables end-to-end integration and contract testing practice.</li><li>Supports partial failure modes.</li></ul> | Higher operational overhead for startup and orchestration. | Medium operational risk, managed via launch scripts. | **Accepted** |
| **Option 2: Monolithic Application** | Retain single unified application codebase and runtime. | Simple local setup and build. | Does not replicate real-world distributed microservices challenges. | Limits test training scope. | **Rejected** |
| **Option 3: Modular Monolith** | Single binary runtime with strict internal module separation. | Simpler local execution than microservices. | Lacks network-level latency, independent deployment, and real HTTP boundary failures. | Inadequate for distributed testing scenarios. | **Rejected** |

## 6. Decision outcome

**We will:**
Split the booking platform into a microservices architecture composed of independent service components:
- **Auth**: Handles session generation, validation, and user credentials.
- **Booking**: Manages room bookings.
- **Room**: Manages room listings, availability, and prices.
- **Branding**: Holds configurations for custom Bed and Breakfast branding (hotel name, contact info, logo).
- **Message**: Receives and processes contact forms or customer feedback.
- **Report**: Computes room utilization reports.
- **Assets**: A React/Next.js frontend that coordinates pages and aggregates data from these APIs.

**We will not:** Retain a single monolithic service process for all domain capabilities.

**Decision scope:** Overall platform architectural style and service boundaries.

**Out of scope:** Third-party cloud infrastructure orchestration or service mesh configurations.

## 7. Rationale

Transitioning from a monolith to microservices creates real-world conditions (network latency, service independence, partial outages) required for training engineers on robust automated testing techniques.

## 8. Consequences and trade-offs

### Positive consequences
- Realistic distributed system environment for contract testing and integration verification.
- Decoupled domain services with focused responsibilities.

### Negative consequences
- Independent build pipelines and run commands for each component.
- Testers must deal with network-related latency, asynchronous communication, and independent deployability of services.
- Local execution requires starting up all 6 backend services plus the frontend web server (orchestrated by scripts).

### Neutral or operational consequences
- Each service maintains its own port allocation and REST controllers.

### New constraints
- Integration tests must verify multi-service interaction and failover behaviors.

## 9. Risk and control impact

| Area | Impact | Owner | Evidence or action |
|---|---|---|---|
| Operations | Startup orchestration of 7 concurrent processes | jsoehner | Run scripts (`run_services.sh`) |
| DevSecOps | Independent service build and test execution | jsoehner | Maven and npm build pipelines |

### Residual risk
- Residual risk description: Service startup timing dependency causing initial connection timeouts.
- Residual risk owner: jsoehner
- Risk acceptance or exception ID: N/A
- Expiry or review date: 2027-07-26

## Technical debt assessment

**Debt impact:** None

**Technical debt score:** 0

**Assessment rationale:**

Decomposing into microservices improves testability in distributed environments.

| Debt item | New, increased, reduced, or none | Driver | Impact | Owner | Remediation plan | Due date | Evidence |
|---|---|---|---|---|---|---|---|
| None | None | N/A | None | jsoehner | N/A | N/A | Codebase audit |

### Existing debt affected

- None

### New or changed debt

- None

### Net debt impact

Zero net technical debt.

## 10. Governance and acceptance

| Role or forum | Named person | Responsibility | Evidence | Date |
|---|---|---|---|---|
| ADR Owner | jsoehner | Maintains record quality and traceability | Initial Architecture Baseline | 2026-07-26 |
| Decision Owner | jsoehner | Owns decision and lifecycle review | Architecture Review | 2026-07-26 |

## 11. Traceability and evidence

| Evidence type | Link or ID | Notes |
|---|---|---|
| Architecture | Multi-module backend services | Spring Boot services & Assets frontend |
| Requirements | Microservice testing environment | Distributed test framework |

## 12. Implementation plan

| Step | Owner | Target date | Evidence |
|---|---|---|---|
| Extract backend services into modules | jsoehner | 2026-07-26 | Auth, Booking, Room, Branding, Message, Report modules |
| Create Assets frontend | jsoehner | 2026-07-26 | Next.js frontend application |
| Implement local orchestration scripts | jsoehner | 2026-07-26 | Service startup scripts |

## 13. Validation plan

| Validation activity | Validator | Evidence | Required before release? |
|---|---|---|---|
| End-to-End multi-service integration test | jsoehner | Test execution logs | Yes |

## 14. Supersession, review, and retirement

- Supersedes: None
- Superseded by: None
- Review triggers:
  - Material architecture change
  - Major component reorganization

## 15. Open questions and actions

None.

## 16. References

- Original `restful-booker` monolithic API repository
