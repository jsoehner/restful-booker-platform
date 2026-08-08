---
adr_id: "ADR-2026-0005"
title: "Render Reports on Client-Side Dynamically to Prevent SSR Hydration Errors"
status: "Accepted"
risk_tier: "Tier 2"
control_domains:
  - Architecture
  - Resilience
  - DevSecOps
created_date: "2026-07-26"
proposed_date: "2026-07-26"
accepted_date: "2026-07-26"
implemented_date: "2026-07-26"
validated_date: "2026-07-26"
next_review_date: "2027-07-26"
review_triggers:
  - "Calendar library migration"
  - "SSR hydration architecture overhaul"
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
  - "Report UI Component"
data_classification: "Internal"
external_exposure: "Browser UI Hydration"
third_party_dependency: "react-big-calendar, Next.js dynamic"
model_or_ai_impact: "None"
residual_risk_owner:
  name: "jsoehner"
  role: "Repository Maintainer"
exceptions_or_risk_acceptances: []
technical_debt_items: []
technical_debt_assessment:
  impact: "None"
  score: 0
  rationale: "Dynamic client rendering eliminates SSR hydration mismatch errors."
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
    - "Eliminate DOM hydration crashes on browser globals"
    - "Support Selenium E2E wait timeouts for dynamic mounts"
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

# ADR-2026-0005: Render Reports on Client-Side Dynamically to Prevent SSR Hydration Errors

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

- **Decision outcome:** Dynamically import the `Report` component on the client-side with `ssr: false` in Next.js, wrapping it in React's `<Suspense>` component with a fallback loader.
- **Primary reason:** The calendar component used in the Report page (`react-big-calendar`) relies heavily on browser-specific globals (`window`, `document`) and timezone layouts dependent on local client time. Server-side rendering (SSR) causes DOM mismatches and hydration crashes.
- **Key risk or trade-off:** E2E Selenium tests must allow additional time for dynamic JS chunk loading.
- **Required controls or conditions:** Set `ssr: false` in `next/dynamic` and configure proper Selenium implicit/explicit wait timeouts.
- **Implementation validation approach:** Browser loading test and automated Selenium E2E calendar render assertions.

## 3. Context and problem statement

The calendar component used in the Report page (`react-big-calendar`) relies heavily on browser-specific globals (like `window`, `document`) and timezone layouts that depend on local client time. If pre-rendered on the server (SSR), it leads to mismatches with the client's rendered DOM, resulting in runtime hydration failures or application crashes.

## 4. Decision drivers

| Driver | Description | Priority |
|---|---|---|
| User experience | Prevent React hydration white-screen crashes on Report page load | High |
| Maintainability and supportability | Clean isolation of browser-dependent UI components | High |
| DevSecOps | Reliable Selenium E2E test execution against dynamic UI mounts | Medium |

## 5. Options considered

| Option | Description | Pros | Cons | Risk / Control Implications | Disposition |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Option 1: Dynamic Client Import (`ssr: false` with `<Suspense>`)** | Dynamically load `Report` component only on the browser client side. | <ul><li>Completely eliminates SSR hydration errors.</li><li>Standard Next.js pattern for browser-only libraries.</li></ul> | UI component mounts asynchronously after initial HTML shell. | Low risk, controlled loading state. | **Accepted** |
| **Option 2: SSR with Browser Guards (`useEffect` checks)** | Render container on server and mount calendar inside `useEffect` hook. | Keeps server-side container wrapper. | Risk of subtle DOM mismatch warnings and flashing content during re-hydration. | Medium hydration risk. | **Rejected** |
| **Option 3: Replace `react-big-calendar` Library** | Rewrite reporting UI using custom SSR-compatible canvas/SVG elements. | Full control over server rendering. | High implementation effort and maintenance cost for calendar layout features. | High development cost. | **Rejected** |

## 6. Decision outcome

**We will:**
1. Dynamically import the `Report` component on the client-side with `ssr: false` in Next.js.
2. Wrap the component in React's `<Suspense>` component with a fallback loader.

**We will not:** Pre-render calendar components on the server using Next.js SSR.

**Decision scope:** Frontend Report page rendering pipeline and calendar component loading strategy.

**Out of scope:** Backend utilization report data computation services.

## 7. Rationale

Dynamic client-side importing ensures `react-big-calendar` only executes when browser globals (`window`, `document`) and client timezone contexts are present, completely eliminating server-to-client DOM hydration mismatches.

## 8. Consequences and trade-offs

### Positive consequences
- The calendar renders correctly only in the browser, eliminating server-to-client DOM mismatches.
- Prevents application runtime crashes caused by undefined window objects during Node.js server rendering.

### Negative consequences
- E2E Selenium tests must allow enough time (e.g. increase implicit wait timeouts from 2s to 10s) for dynamic Javascript chunks to load and mount the calendar components in development.

### Neutral or operational consequences
- A fallback loading spinner is briefly displayed while dynamic JS chunks complete fetching.

### New constraints
- E2E automation scripts must use explicit waits for calendar element visibility.

## 9. Risk and control impact

| Area | Impact | Owner | Evidence or action |
|---|---|---|---|
| Architecture | Dynamic client-only component splitting | jsoehner | Next.js `dynamic()` import code |
| Operations | E2E test wait timeout adjustment | jsoehner | Selenium test configuration (10s wait) |

### Residual risk
- Residual risk description: Network delays during chunk loading causing transient test wait timeouts in slow CI runners.
- Residual risk owner: jsoehner
- Risk acceptance or exception ID: N/A
- Expiry or review date: 2027-07-26

## Technical debt assessment

**Debt impact:** None

**Technical debt score:** 0

**Assessment rationale:**

Dynamic client rendering eliminates SSR hydration mismatch errors.

| Debt item | New, increased, reduced, or none | Driver | Impact | Owner | Remediation plan | Due date | Evidence |
|---|---|---|---|---|---|---|---|
| None | None | N/A | None | jsoehner | N/A | N/A | UI test report |

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
| Implementation | Report page component | `dynamic(() => import(...), { ssr: false })` |
| Test suite | Selenium E2E wait settings | Timeout set to 10s for dynamic load |

## 12. Implementation plan

| Step | Owner | Target date | Evidence |
|---|---|---|---|
| Refactor Report page import to dynamic `ssr: false` | jsoehner | 2026-07-26 | Report page code edit |
| Add `<Suspense>` fallback wrapper | jsoehner | 2026-07-26 | Report page JSX update |
| Update Selenium wait timeouts | jsoehner | 2026-07-26 | Test framework timeout setting |

## 13. Validation plan

| Validation activity | Validator | Evidence | Required before release? |
|---|---|---|---|
| Selenium E2E Report calendar mount test | jsoehner | Test execution logs | Yes |

## 14. Supersession, review, and retirement

- Supersedes: None
- Superseded by: None
- Review triggers:
  - Calendar library migration
  - SSR hydration architecture overhaul

## 15. Open questions and actions

None.

## 16. References

- Next.js Dynamic Imports (`next/dynamic`) Documentation
- `react-big-calendar` Browser Globals Usage Notes
