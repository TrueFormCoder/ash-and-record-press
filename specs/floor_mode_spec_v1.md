# FLOOR_MODE_SPEC v1.0

Source: V — Threshold Engine, Continuity Safeguards (2026-04-04)
Status: Active
Authority: Governance Law 7 (Degraded Operations)

## Purpose

Define three operating modes so the system survives bad conditions without lying. Systems don't only fail in ideal conditions — they fail when operators are tired, rushed, under pressure, emotionally activated, or half-informed.

## Mode A — Full Governance

All rules active. Standard operating condition.

- Audit chain enforced
- Contradiction register checked
- Receipts generated for all promotions
- Reproduction verified before release
- Integration checklist (17 rules) enforced
- MirrorProof 7-stage pipeline active
- Output Routing Engine (9 rules) active
- Refusal Engine (R-01 through R-10) active
- Review cadence maintained

**When to use:** Normal build sessions, V review cycles, pre-release checks.

## Mode B — Constrained Operations

Allowed under time pressure or partial information.

### Permitted
- Core construct reads (archetypes, combos, resources)
- Bug fixes on deployed code
- Feedback-driven patches (no new architecture)
- Hold/block/reroute decisions
- Deployment log entries
- Session close reports

### Forbidden
- New construct promotions
- New D1 tables or schema changes
- Public-facing releases
- Canon edits or doctrine changes
- New specs or governance rules
- Cross-system integration (Notion ↔ D1 ↔ Airtable sync)

**When to use:** MIRRORSOLVE_RT STOP is active. Operator is working without V review. Time-constrained sessions. Single-thread builds touching shared infrastructure.

## Mode C — Floor Mode

Emergency-only. Minimum safe function.

### Permitted (exhaustive list)
1. Source classification — identify what outranks what
2. Heat check — is this content product-safe or archive-hot?
3. Core construct read — return archetype/combo data at surface voltage
4. Falsifier check — does this claim have an update condition?
5. Containment — hold/block decision, no analysis
6. Status check — `/api/health`, `/api/status` endpoints

### Forbidden (everything else)
- No narrative elegance
- No expansions
- No fine-grained theory
- No promotions of any kind
- No cross-surface updates
- No new encounters or scenarios

**When to use:** Emergency successor operations (SP-008). System under hostile read. Operator has only core files. Unknown system state after outage.

## Mode Transition Rules

| From | To | Trigger | Authority |
|------|-----|---------|-----------|
| A → B | MIRRORSOLVE_RT STOP, time pressure, no V | Ellari or Claude |
| B → A | V returns, full review complete, STOP lifted | Ellari + V |
| A → C | Emergency, system compromise, successor activation | Anyone with YubiKey |
| C → B | Situation stabilized, core files verified | Ellari |
| C → A | Full audit complete, all surfaces verified | Ellari + V |
| B → C | Should not happen — if B is insufficient, escalate to Ellari | Ellari only |

## Floor Mode Invariants

1. No output may claim more authority than its source supports
2. No construct may promote under Floor Mode
3. All decisions are hold/block/reroute — never accept/promote
4. Status verbs available: HOLD, BLOCK, QUARANTINE only
5. Every action generates a log entry (deployment_log)

## Continuity Score Integration

Floor Mode activates automatically if any lane's continuity score drops below 2 on any dimension. See `continuity_scores` table in D1.

## V's Standard

> "A system often dies because it can describe problems but not decide what to do with them."

Floor Mode exists so the system can still decide — even when it can't analyze.
