# Product Requirements Document (PRD)
## CodeTutor AI — Interactive Developer Assessment & Comprehension Platform

**Document Version:** 1.0.0  
**Status:** Approved / In Implementation  
**Product Target:** Web / Desktop Workspace (1440px+ optimized)  
**Primary Engine:** Google Gemini 1.5 Pro Semantic AST Engine  

---

## 1. Executive Summary & Vision

### 1.1 Product Overview
**CodeTutor AI** is an intelligent, developer-centric evaluation and learning platform designed to bridge the gap between static code reviews and dynamic technical assessments. By connecting directly to developer repositories or arbitrary codebases via Google AI Studio credentials, CodeTutor AI analyzes Abstract Syntax Trees (AST), identifies subtle anti-patterns and concurrency pitfalls, and generates real-time, interactive engineering challenges.

### 1.2 Core Value Proposition
- **Automated Diagnostic Generation**: Eliminates generic trivia by constructing domain-specific assessments directly from live codebase snippets (e.g., React 19 concurrent state leaks, AbortController cleanup, unmemoized dispatch loops).
- **Multi-Modal Assessment Rubrics**: Evaluates candidates across three complementary axes: theoretical comprehension (MCQ), architectural depth (Essay), and practical runtime execution (Split-Pane Code Diff).
- **Dual Visual Personality**: Built to support both high-focus dark developer syntax themes ("Kinetic Syntax") and engaging, low-anxiety hand-drawn sketchbook interfaces ("Sketch & Marker / Doodle Edition").

---

## 2. Target Audience & Personas

| Persona | Role | Key Pain Points | Platform Value |
|---|---|---|---|
| **Alex — Senior Engineering Lead** | Hiring Manager / Tech Lead | Generic coding tests don't assess how engineers reason through concurrent edge cases or architectural tradeoffs. | Uploads production repository files to instantly generate authentic, high-signal engineering challenges. |
| **Devon — Frontend Architect** | Continuous Learner | Needs hands-on practice mastering cutting-edge framework primitives (React 19 Server Actions, `use()`, Transitions). | Receives interactive Socratic AI guidance, granular diagnostics, and automated unit test verification. |
| **Priya — Boot Camp / University Student** | Junior Engineer | High cognitive overload and intimidation from traditional high-stakes testing UIs. | Engages with the "Doodle / Sketch" mode for an approachable, playful, yet technically rigorous experience. |

---

## 3. Product Architecture & Multi-Screen Journey

CodeTutor AI operates as a unified 3-stage persistent desktop workspace:

```
[ Setup & Practice Workspace ] ──(Generate)──> [ Active Assessment Quiz View ] ──(Submit)──> [ Grading & Performance Report ]
       ▲                                                                                                    │
       └───────────────────────────────────(Retake / New Codebase)──────────────────────────────────────────┘
```

### Screen 1: Assessment & Practice Workspace
- **Persistent Header & Navigation**:
  - Global branding with toggleable release badge (`v2.5 Doodle Edition` / `v2.4 Kinetic`).
  - Google AI Studio API key credential indicator (`Valid Key` / `Connected`).
  - Active codebase breadcrumb selector (e.g., `codetutor-sandbox-app / src/hooks/useDataStream.tsx`).
- **Left Panel (Codebase Context & Ingestion)**:
  - Masked API key configuration input with one-click clipboard and validation trigger.
  - Multi-tab monospace code editor with line numbering, syntax highlighting, and squiggly error diagnostics.
  - Parsed AST Context Graph showing reactive node counts, hooks, and effect dependencies.
  - Primary Action Button: `[⚡ Generate Assessment Quiz [Ctrl + Enter]]`.
- **Center Panel (Interactive Warmup & Draft View)**:
  - Real-time comprehension gauge (Overall Mastery Score + Arch, State, Error sub-metrics).
  - Tabbed question preview deck containing:
    1. Multiple Choice Question (MCQ) cards with selectable `[A, B, C, D]` option buttons.
    2. Architecture Essay Response textarea with character count and markdown formatting.
    3. Live AST Bug Squash preview with side-by-side proposed patch diff.
- **Right Panel (Live AI Code Review Feed)**:
  - Automated evaluation scorecard (`88/100 Proficient Architect`).
  - Live AI Review Notes detailing memory safety, unmemoized handlers, and concurrent action recommendations.
  - Primary CTA: `Submit for Automated AI Grading ⚡`.

---

### Screen 2: Active Assessment Quiz View (Timed Execution Mode)
- **Distraction-Free Test Header**:
  - Module breadcrumbs: `Module 04 // Advanced Concurrency (Tsx-9042)`.
  - Countdown timer (`24:13 remaining`) with live session heartbeat.
  - Multi-stage progress stepper: `1. Multiple Choice (Done)` ➔ `2. Code Fix Challenge (Active)` ➔ `3. Architecture Essay (Locked)`.
- **Center Workspace (Split-Pane Code Fix Challenge)**:
  - Left pane: Read-only buggy baseline code editor highlighting race conditions and memory leaks.
  - Right pane: Interactive editable patch buffer with syntax validation and reset controls.
  - Built-in Local Test Runner executing simulated Vitest assertions (e.g., `Test 01: Abort Signal`, `Test 02: Teardown`, `Test 03: Transition Sync`).
- **Right Sidebar Utilities**:
  - **9-Item Question Navigator**: Grid of question chips color-coded by state (`Done`, `Current`, `Pending`, `Essay`).
  - **Socratic Tutor Hint Drawer**: Expandable AI prompt offering pedagogical hints with score penalty governance (`-5 pts if used`).
  - **Sandbox Vitals & Runtime**: Memory usage telemetry, strict mode flags, and keyboard shortcuts (`⌘ + Enter` to execute).
- **Sticky Footer Action Bar**:
  - Autosave status indicator (`Draft autosaved 12s ago`).
  - Step navigation (`← Previous`, `Save Draft & Pause`, `Submit Challenge #03 ⚡`).

---

### Screen 3: Grading & Performance Report View (Analytical Debrief)
- **Verified Ledger Header**:
  - Telemetry evaluation stamp (`Gemini 1.5 Pro Engine`) with immutable ledger run hash (e.g., `RUN: 0x88F-REACT19`).
  - Assessment status badge (`STATUS: PASSED`).
- **Score & Diagnostics Hero**:
  - Large radial progress gauge displaying final grade (`88 / 100 PTS | Top 8.4% Tier`).
  - Key metadata cards: Test cases passed (`18/20`), Duration (`28m 42s`), Code Cleanliness Grade (`A+`).
  - Architectural Competency Matrix bar charts (MCQ Mastery: 100%, System Design: 85%, Runtime Patch: 85%).
  - Cognitive velocity chart comparing candidate performance trajectory against senior engineer cohort baselines.
- **Detailed Question-by-Question Audit Tabs**:
  - Interactive tabs switching between MCQ Review, Architecture Essay, and Code Patch Analysis.
  - Individual question cards with point tags, user-selected choices, correct benchmarks, and detailed AI Evaluator Commentary.
- **Export & Next Step Actions**:
  - `Retake Quiz` button.
  - `Export Report (.PDF)` action.
  - `Start Next Stage: Node 22 API Design [NEW]` milestone advancement.

---

## 4. Technical Specifications & Integrations

### 4.1 LLM & AI Engine Requirements
- **Model**: Google Gemini 1.5 Pro / Flash.
- **Context Window**: 1M+ tokens to swallow complete single-file components and AST graphs.
- **Input Parameters**:
  - Raw source code file (`.tsx`, `.ts`, `.jsx`, `.js`, `.py`).
  - Target framework & version (e.g., `React 19 Canary`, `Node.js 22`, `Next.js 15`).
  - Evaluation rubric configuration (Strict, Permissive, Memory-leak focused).
- **Output Schema**:
  - Structured JSON containing:
    - Array of MCQs (question, 4 choices, correct index, rationales).
    - Architecture prompt + reference evaluation rubric.
    - Code challenge (buggy snippet, test specs, reference diff solution).

### 4.2 Frontend Design Systems
CodeTutor AI implements two switchable design system paradigms:
1. **Kinetic Syntax (Dark Theme)**:
   - Primary Surface: `#111319` / Container: `#191b22`.
   - Accents: Electric Violet (`#8B5CF6`), Emerald Green (`#10B981`), Amber (`#F59E0B`).
   - Fonts: *Space Grotesk* for UI, *JetBrains Mono / Fira Code* for syntax.
2. **Sketch & Marker System (Doodle Edition)**:
   - Primary Surface: Warm Cream Paper (`#FAF7F2`) with subtle dot-matrix graph lines.
   - Ink & Lines: Graphite Charcoal (`#2D2D2D`) with uneven, organic hand-drawn 2px strokes and offset paper shadows.
   - Accents: Marker highlighters in Pastel Yellow (`#FACC15`), Mint (`#A7F3D0`), Lavender (`#E9D5FF`), and Coral (`#FDA4AF`).
   - Fonts: *Bricolage Grotesque* / *Architects Daughter* hand-drawn sketch typography.

---

## 5. Non-Functional Requirements & Metrics

| Category | Requirement | Metric / SLA |
|---|---|---|
| **Latency** | Assessment quiz generation time | < 4.5 seconds for files < 500 LOC |
| **Test Execution** | Local unit test runner response | < 350ms per test suite run |
| **Responsiveness** | Desktop layout adaptation | Fluid 1280px to 2560px with sticky sidebars |
| **Data Privacy** | API Key & Source Code handling | In-memory client storage; keys never logged on remote servers |
| **Accessibility** | High-contrast code syntax & keyboard accessibility | Full keyboard navigation (`Tab`, `Ctrl+Enter`, `⌘K`) and WCAG AA contrast compliance |

---

## 6. Release Roadmap & Milestones

- **Phase 1 (Current Baseline — Shipped)**:
  - Interactive Desktop Workspace, Active Assessment Quiz View, and Grading & Performance Report View.
  - Dual visual language: Kinetic Dark Syntax and Doodle Sketchbook Edition.
- **Phase 2 (Near-Term)**:
  - Multi-file repository tree ingestion via GitHub OAuth.
  - Shareable candidate report URLs with cryptographic verification.
  - Interactive WebGL/Three.js visualizer for AST graph animations.
- **Phase 3 (Long-Term)**:
  - Multi-player peer interview mode with shared synchronized code editors.
  - Custom rubric authoring tool for engineering managers.
