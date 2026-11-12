# Global Antigravity Directives & Mission-Critical Rules

> [!IMPORTANT]
> The following core directives are **permanently inlined into the always-on context** of Antigravity CLI. Enforce these directives across all interactions, code generation, refactoring, and debugging tasks without requiring explicit skill invocation.

---

## 1. Minimal & Complete Code (Ponytail + Anti-Placeholder)
- **Smallest Complete Change (YAGNI):** Pick the solution that fully works with the minimal delta. Reject speculative generality, premature abstractions, or wrapper layers nobody requested. Reuse existing utilities and standard library first.
- **Zero Placeholders:** Never emit placeholders such as `// ...`, `/* implement here */`, `// TODO`, or incomplete code blocks. Any code provided must be complete, syntactically valid, and runnable.
- **Harmony:** Ponytail controls *how much* code to write (minimal, direct); Anti-Placeholder controls *how* it is delivered (complete, unabridged).

---

## 2. Baseline Coding Standards
- **Descriptive & Explicit Naming:** Variables, functions, and types must clearly reflect business intent. Avoid cryptic abbreviations.
- **Immutability by Default:** Prefer `const`, `readonly`, frozen objects, and pure transformations over in-place mutations. Never mutate input parameters.
- **Single Responsibility:** Keep functions small, testable, and focused (< 40-50 lines when feasible).
- **Strict Typing:** Ban indiscriminate use of `any` (TypeScript) or `Any` (Python). Explicitly declare return types and parameter contracts.

---

## 3. Pragmatic Error Handling (Boundary-First)
- **System Boundaries:** Enforce fail-fast validation, structured error types, and contextual logging at system boundaries (API endpoints, database queries, file/network I/O, external input).
- **Internal Helpers:** Avoid excessive try-catch wrappers, custom exception hierarchies, or defensive boilerplate for simple internal helpers and utility scripts.
- **Zero Silent Failures:** Never write empty catch blocks (`catch (e) {}`). All caught errors must be handled, logged, or re-thrown.

---

## 4. Adaptive Verification Gate
Match verification rigor to the risk and scope of the task:
- **Level 1 (Trivial edits, docs, small fixes < 20 lines):** Review `git diff` for cleanliness before completing.
- **Level 2 (Standard bugfix, module logic, component changes):** Run static type check and the specific unit tests for the modified module.
- **Level 3 (Major features, core refactoring, release/PR readiness):** Execute full 6-phase verification (Build, Type Check, Lint, Full Test Suite, Security Grep, Diff Review).

---

## 5. Internal Quality Self-Check
- **Silent Pre-Flight Check:** Before emitting a response, perform an internal mental review during reasoning: verify syntax accuracy, check for hallucinated APIs, ensure minimal code delta, and confirm runnable output.
- **No Vanity Output Scoring:** Do NOT print a 1-5 score table (Accuracy, Completeness, etc.) in the response text unless the user explicitly requests a code quality audit or self-evaluation scorecard.

---

## 6. On-Demand Domain Skills & Global Skills Catalog (Progressive Routing)
- **Global-First Resolution:** Regardless of which workspace or project directory Antigravity CLI is launched in, ALWAYS resolve and load skills directly from the global skills directory: `C:/Users/Admin/.gemini/skills/`. Do not spend tool calls or time scanning for local `.agents/skills/` folders unless explicitly informed by the user.
- **Indexed Routing via SKILLS_CATALOG.md:** To prevent token waste and slow linear directory scans, use the pre-categorized index at [SKILLS_CATALOG.md](file:///C:/Users/Admin/.gemini/skills/SKILLS_CATALOG.md):
  1. Determine the task functional group (e.g., Frontend, Backend, Database, Cloud/DevOps, AI/LLM, Multi-Agent, Testing/QA, Security, Ops).
  2. Pinpoint the exact skill from `SKILLS_CATALOG.md`.
  3. Load and follow the specific `SKILL.md` directly (`read_file` on `C:/Users/Admin/.gemini/skills/<skill-name>/SKILL.md`).
- **Primary Domain Groups (340+ skills cataloged):**
  - **1. Multi-Agent Systems, Swarm & Autonomous Orchestration**
  - **2. Testing, QA, Verification & Code Health**
  - **3. Security, Compliance, Web3 & Risk Management**
  - **4. Frontend, Mobile & UI/UX Design**
  - **5. Database, Storage & Data Persistence**
  - **6. DevOps, Cloud, Infrastructure & Networking**
  - **7. AI Engineering, LLM, Vision & Media**
  - **8. Backend & API Engineering**
  - **9. Business, Marketing, SEO & Operations**
  - **10. Architecture, Engineering Governance & Meta-Tooling**

---

## 7. Mandatory Skill Attribution (Pre-Response Disclosure)
- **Line 1 Attribution:** At the very beginning of EVERY response, BEFORE providing the main answer, solution, or code, explicitly state which skills or operational mode are active.
- **Format (Strictly No Icons/Emojis):**
  - When domain skills are active:
    `> **Skills áp dụng:** [skill-name](file:///path/to/skill) - *Tóm tắt lý do áp dụng*`
  - For standard/general tasks:
    `> **Mode:** [Lean Core] (Ponytail + Complete Code + Adaptive Gate)`
- **Strict Placement:** This header must always appear at the very top (Line 1) of the response.
