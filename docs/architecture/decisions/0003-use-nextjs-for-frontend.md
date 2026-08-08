---
adr_id: "ADR-2026-0003"
title: "Use Next.js for the Frontend Application"
status: "Accepted"
risk_tier: "Tier 2"
control_domains:
  - Architecture
  - API
  - DevSecOps
created_date: "2026-07-26"
proposed_date: "2026-07-26"
accepted_date: "2026-07-26"
implemented_date: "2026-07-26"
validated_date: "2026-07-26"
next_review_date: "2027-07-26"
review_triggers:
  - "Major Next.js framework upgrade"
  - "API gateway architecture changes"
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
  - "restful-booker-platform Frontend"
affected_repositories:
  - "jsoehner/restful-booker-platform"
affected_services:
  - "Assets Frontend"
data_classification: "Internal"
external_exposure: "Web UI & Node API Proxy"
third_party_dependency: "Next.js, React, Node.js"
model_or_ai_impact: "None"
residual_risk_owner:
  name: "jsoehner"
  role: "Repository Maintainer"
exceptions_or_risk_acceptances: []
technical_debt_items: []
technical_debt_assessment:
  impact: "None"
  score: 0
  rationale: "Next.js standardizes server-side proxying and modern UI rendering."
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
    - "Integrated UI proxy for microservices endpoints"
    - "Support SSR and client-side rendering"
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

# ADR-2026-0003: Use Next.js for the Frontend Application

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

- **Decision outcome:** Use Next.js (built on React) for the `assets` service, utilizing API Routes / Rewrites as a proxy/gateway to backend services under `/api/*`.
- **Primary reason:** Provide a modern, scalable web frontend framework that integrates easily with microservices APIs and eliminates cross-origin resource sharing (CORS) complexity.
- **Key risk or trade-off:** Requires a Node.js runtime environment in addition to Java JVM backend runtimes.
- **Required controls or conditions:** Proper route rewrite configuration in `next.config.js` and client component state management.
- **Implementation validation approach:** Frontend page loading and API proxy validation suite.

## 3. Context and problem statement

We need a modern, scalable web frontend framework that integrates easily with the microservices APIs. The frontend needs to be responsive, support modern UI/UX practices, and allow both Server-Side Rendering (SSR) and Client-Side rendering.

## 4. Decision drivers

| Driver | Description | Priority |
|---|---|---|
| Business outcome | Seamless user interface aggregated over microservices backend | High |
| Maintainability and supportability | Modern React ecosystem with built-in API proxying capabilities | High |
| DevSecOps | Avoid complex multi-origin CORS configurations during local dev | Medium |

## 5. Options considered

| Option | Description | Pros | Cons | Risk / Control Implications | Disposition |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Option 1: Next.js (React Framework with API Rewrites)** | Deploy Next.js web application utilizing `next.config.js` rewrites to proxy `/api/*` requests to backend services. | <ul><li>Solves CORS by proxying requests.</li><li>Supports hybrid SSR and client-side rendering.</li></ul> | Adds Node.js build requirement. | Low risk, simplified routing. | **Accepted** |
| **Option 2: Single Page Application (SPA) with Static Nginx/Apache** | Standard React SPA served via standalone web server with manual proxy rules. | Decoupled frontend runtime. | Additional web server setup and complex CORS header management across microservices. | Higher maintenance overhead. | **Rejected** |
| **Option 3: Server-Side HTML Rendering (Thymeleaf/Spring MVC)** | Render HTML directly from Spring Boot microservices. | Single tech stack (Java). | Tight coupling of presentation and microservice logic; poor dynamic UI capabilities. | Limits UI modernization. | **Rejected** |

## 6. Decision outcome

**We will:**
1. Use **Next.js** (built on React) for the `assets` service.
2. Utilize Next.js API Routes / Rewrites to resolve CORS issues by acting as a gateway/proxy to backend services under `/api/*`.

**We will not:** Expose microservice ports directly to client browsers without proxy routing.

**Decision scope:** Frontend application stack and UI proxy layer.

**Out of scope:** Backend microservice internal communication channels.

## 7. Rationale

Next.js provides hybrid rendering modes (SSR and Client CSR) alongside built-in rewrite proxying, simplifying client interaction with distributed backend microservices while avoiding CORS hurdles.

## 8. Consequences and trade-offs

### Positive consequences
- Single point of entry (`/api/*`) for client calls proxied to individual service ports via next config rewrites.
- High performance UI rendering leveraging React and Next.js optimization features.
- Simplified backend CORS configuration.

### Negative consequences
- Requires a Node.js runtime to build and run the frontend.
- Developers must configure client-side hooks appropriately to handle dynamic states.

### Neutral or operational consequences
- Requires `npm install` and Node ecosystem tooling in build pipelines.

### New constraints
- API routes in frontend must maintain synchronization with backend endpoint contracts.

## 9. Risk and control impact

| Area | Impact | Owner | Evidence or action |
|---|---|---|---|
| Architecture | Gateway proxying via Next.js rewrites | jsoehner | `next.config.js` configuration |
| Operations | Node.js process management for assets service | jsoehner | Node runtime scripts |

### Residual risk
- Residual risk description: Mismatched proxy route rules between Next.js configuration and new backend endpoints.
- Residual risk owner: jsoehner
- Risk acceptance or exception ID: N/A
- Expiry or review date: 2027-07-26

## Technical debt assessment

**Debt impact:** None

**Technical debt score:** 0

**Assessment rationale:**

Next.js standardizes server-side proxying and modern UI rendering.

| Debt item | New, increased, reduced, or none | Driver | Impact | Owner | Remediation plan | Due date | Evidence |
|---|---|---|---|---|---|---|---|
| None | None | N/A | None | jsoehner | N/A | N/A | Codebase review |

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
| Implementation | assets/next.config.js | Proxy route configuration |
| Codebase | assets/ | React/Next.js frontend application |

## 12. Implementation plan

| Step | Owner | Target date | Evidence |
|---|---|---|---|
| Bootstrap Next.js frontend | jsoehner | 2026-07-26 | `assets/package.json` |
| Configure API rewrites | jsoehner | 2026-07-26 | `assets/next.config.js` |

## 13. Validation plan

| Validation activity | Validator | Evidence | Required before release? |
|---|---|---|---|
| Frontend build and proxy endpoint verification | jsoehner | npm build output & integration test | Yes |

## 14. Supersession, review, and retirement

- Supersedes: None
- Superseded by: None
- Review triggers:
  - Major Next.js framework upgrade
  - API gateway architecture changes

## 15. Open questions and actions

None.

## 16. References

- Next.js Documentation on Rewrites & API Routes
