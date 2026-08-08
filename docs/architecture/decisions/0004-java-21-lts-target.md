---
adr_id: "ADR-2026-0004"
title: "Target Java 21 LTS for Backend Services"
status: "Accepted"
risk_tier: "Tier 1"
control_domains:
  - Architecture
  - Security
  - DevSecOps
  - Operations
created_date: "2026-07-26"
proposed_date: "2026-07-26"
accepted_date: "2026-07-26"
implemented_date: "2026-07-26"
validated_date: "2026-07-26"
next_review_date: "2027-07-26"
review_triggers:
  - "End of Java 21 LTS support"
  - "Next LTS release adoption"
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
  - "restful-booker-platform Backend Microservices"
  - "E2E Testing Modules"
affected_repositories:
  - "jsoehner/restful-booker-platform"
affected_services:
  - "Auth Service"
  - "Booking Service"
  - "Room Service"
  - "Branding Service"
  - "Message Service"
  - "Report Service"
data_classification: "Internal"
external_exposure: "JVM Runtime"
third_party_dependency: "OpenJDK 21 LTS"
model_or_ai_impact: "None"
residual_risk_owner:
  name: "jsoehner"
  role: "Repository Maintainer"
exceptions_or_risk_acceptances: []
technical_debt_items: []
technical_debt_assessment:
  impact: "None"
  score: 0
  rationale: "Aligning compile target with LTS runtime resolves class format version mismatches."
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
    - "LTS runtime baseline compatibility"
    - "Prevent UnsupportedClassVersionError in Maven builds"
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

# ADR-2026-0004: Target Java 21 LTS for Backend Services

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

- **Decision outcome:** Standardize on Java 21 LTS as the baseline Java compiler release version across all backend microservices and E2E test modules (`<release>21</release>`).
- **Primary reason:** Avoid compiler and runtime class-version mismatches caused by setting experimental non-LTS targets (such as Java 26) that are not supported across developer and CI execution environments.
- **Key risk or trade-off:** Inability to use experimental language features from non-LTS Java previews.
- **Required controls or conditions:** Standardize Maven compiler plugin `<release>21</release>` in root `pom.xml`.
- **Implementation validation approach:** Full Maven clean compile (`mvn clean test-compile`) across all backend modules.

## 3. Context and problem statement

A recent PR set the target compile release version to Java 26 (e.g. `<release>26</release>`). However, Java 26 is not yet universally available, nor is it supported in many production and local development setups (including the target runtime JVM version 21 of this system). Using non-LTS versions or cutting-edge previews causes compile and runtime class-version mismatches (`UnsupportedClassVersionError`).

## 4. Decision drivers

| Driver | Description | Priority |
|---|---|---|
| Operational resilience | Guaranteed JVM compatibility across local, CI, and production environments | High |
| Maintainability and supportability | LTS release stability and long-term security updates | High |
| DevSecOps | Clean, reproducible Maven builds without bleeding-edge toolchain dependencies | High |

## 5. Options considered

| Option | Description | Pros | Cons | Risk / Control Implications | Disposition |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Option 1: Target Java 21 LTS Baseline** | Standardize `<java.version>21</java.version>` and `<release>21</release>` across all `pom.xml` build configurations. | <ul><li>Universal support across dev machines and CI runners.</li><li>bytecode format version 61 guarantees runtime stability.</li></ul> | Cannot adopt experimental post-21 preview features. | Low risk, high stability. | **Accepted** |
| **Option 2: Target Cutting-Edge Non-LTS Releases (e.g. Java 26)** | Use non-LTS experimental Java toolchains. | Access to newest preview language constructs. | Triggers `UnsupportedClassVersionError` on standard Java 21 JRE runtimes; breaks CI build pipelines. | High operational risk. | **Rejected** |
| **Option 3: Support Multiple Java Versions dynamically** | Allow individual microservices to compile against different JDK versions. | Flexibility per microservice. | Fragmented build environments, complex CI build matrices, and developer friction. | Medium complexity risk. | **Rejected** |

## 6. Decision outcome

**We will:** Target **Java 21 LTS** as the baseline Java compiler release version across all backend microservices and E2E test modules.

**We will not:** Target non-LTS Java compiler releases or experimental preview versions.

**Decision scope:** Java compiler release configurations across all backend Java pom.xml files.

**Out of scope:** Non-Java components (e.g., Next.js Node environment).

## 7. Rationale

Java 21 is a Long Term Support (LTS) release widely deployed across enterprise platforms and local developer setups. Reverting from experimental Java 26 to Java 21 LTS guarantees build stability and prevents runtime bytecode version incompatibilities.

## 8. Consequences and trade-offs

### Positive consequences
- The Maven build is now fully compatible with the installed OpenJDK 21 JRE/JDK on developer and CI machines.
- Code compiles to bytecode version 61 (Java 21), preventing `UnsupportedClassVersionError` at runtime.
- Long-term support is guaranteed by using a stable LTS version.

### Negative consequences
- Prevents immediate usage of language features introduced in post-Java 21 releases.

### Neutral or operational consequences
- CI pipelines and developer environments enforce Java 21 JDK installation.

### New constraints
- All new Java submodules must inherit or specify Java 21 compiler targets.

## 9. Risk and control impact

| Area | Impact | Owner | Evidence or action |
|---|---|---|---|
| Architecture | Standardize backend Java baseline | jsoehner | Parent `pom.xml` configuration |
| DevSecOps | Maven build verification on Java 21 JVM | jsoehner | CI build logs |

### Residual risk
- Residual risk description: Developers accidentally introducing JDK 21+ methods not supported by target runtime.
- Residual risk owner: jsoehner
- Risk acceptance or exception ID: N/A
- Expiry or review date: 2027-07-26

## Technical debt assessment

**Debt impact:** None

**Technical debt score:** 0

**Assessment rationale:**

Aligning compile target with LTS runtime resolves class format version mismatches.

| Debt item | New, increased, reduced, or none | Driver | Impact | Owner | Remediation plan | Due date | Evidence |
|---|---|---|---|---|---|---|---|
| None | None | N/A | None | jsoehner | N/A | N/A | Maven build log |

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
| Configuration | pom.xml | `<release>21</release>` compiler setting |
| Test evidence | `mvn test-compile` | Clean build status |

## 12. Implementation plan

| Step | Owner | Target date | Evidence |
|---|---|---|---|
| Update root pom.xml to target Java 21 | jsoehner | 2026-07-26 | `pom.xml` line edit |
| Update backend module pom files | jsoehner | 2026-07-26 | Microservices pom files |

## 13. Validation plan

| Validation activity | Validator | Evidence | Required before release? |
|---|---|---|---|
| Maven clean compile execution | jsoehner | `mvn clean test-compile` exit code 0 | Yes |

## 14. Supersession, review, and retirement

- Supersedes: None
- Superseded by: None
- Review triggers:
  - End of Java 21 LTS support
  - Next LTS release adoption

## 15. Open questions and actions

None.

## 16. References

- OpenJDK 21 Release Documentation
