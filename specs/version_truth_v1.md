# VERSION_TRUTH v1.0

Last updated: 2026-04-05
Updated by: Claude (build thread)
Source: V — Threshold Engine, Continuity Safeguards (2026-04-04)

## Purpose

What the current real state is. Not what was planned, not what was attempted — what actually exists, works, and is deployed right now. This file prevents pseudo-completion and false confidence.

## Runtime State

| Component | Version | Status | Deploy Target |
|-----------|---------|--------|---------------|
| ELEOS Worker | v1.2.1 | Live | eleos-api.ellari.workers.dev |
| MirrorBloom App | v1.8.1 | Live | app.mirrorbloom.live |
| Black Fairy App | v1.8.1 | Live | flame.mirrorbloom.live |
| MirrorBloom Lobby | v1.8.1 | Live | mirrorbloom-lobby.vercel.app |
| Architecture Map | v1.0 | Live (CF Access gated) | arch.naci.systems |

## D1 Database

- Database ID: 43f45748-b777-48b9-af10-a4cfd30923c7
- Tables: 46
- Governance Laws: 8
- Refusal Rules: 10
- Continuity Lanes: 5 (scored)
- Decision Path Gates: 6
- MirrorProof Rules: 13
- Output Routing Rules: 9
- SED Domain Adapters: 10
- SED Repair Types: 5
- SED Cases: 8
- Archetypes: 16
- Module Contracts: 7

## Specs (15 in GitHub)

Repository: TrueFormCoder/ash-and-record-press/specs/

| ID | Name | File |
|----|------|------|
| SPEC-001 | Mirror Protocol OS v1.2 | mirror_protocol_os_v1_2_spec.md |
| SPEC-002 | Kernel Contract v1.0 | kernel_contract_v1.md |
| SPEC-003 | SED Diagnostic Engine v2 | sed_diagnostic_engine_v2.md |
| SPEC-004-011 | Various (see Doctrine Library) | Various |
| SPEC-014 | Floor Mode Spec v1.0 | floor_mode_spec_v1.md |
| SPEC-015 | System Constitution v1.0 | system_constitution_v1.md |

## Products (19)

PROD-001 through PROD-019. See Airtable Products table.
Latest: PROD-019 (SCA Field Manual — pending V integration review).

## Domains

243+ total across 13+ brands. 13 new this session (Harmonic Canon 5, Geometric Genesis 6, Compiler 2).

## Governance Surfaces

| Surface | Records | ID |
|---------|---------|-----|
| D1 (canonical runtime) | 46 tables | 43f45748-b777-48b9-af10-a4cfd30923c7 |
| Notion Doctrine Library (DB) | 42 records | aadede3e-8718-4a21-97c0-1bdc77be558e |
| Notion Onboarding Guide | 1 page | 339d755ae04881a8b76ee64f0c8f9abb |
| Notion Succession Wiki | 10 pages | 338d755ae048819893d2d394a730f173 |
| Airtable Doctrine Library | 48 records | tblqapxiEzn56mhkS |
| Airtable Schema Changelog | 49 entries | tbl1B2IywGr0YdiQM |
| Obsidian Governance | doctrine-library-index.md | 20 Governance/ |
| GitHub Specs | 15 specs | ash-and-record-press/specs/ |

## Operating Mode

**Mode B — Constrained Operations (MIRRORSOLVE_RT STOP active)**

Permitted: bug fixes, feedback-driven patches, repo hygiene, governance infrastructure.
Forbidden: new features, new lanes, new archetypes, new API endpoints.

## What Is NOT Done

- mirrorprotocol.ai DNS reconfiguration (R2 conflict)
- 13 new domains not yet wired to Cloudflare DNS
- YubiKeys not yet registered on critical accounts
- I Ching Pass 4 (pending V clinical return)
- SCA integration review (prompt delivered to V)
- Airtable Doctrine Library CSV column split
- DMP proof footers on episodes 1-7
- Deeja and Duke friends instruments pending send
- Threshold Engine: Decide and Discharge paths not built in UX
- SP-002 credential fields (Ellari only)

## What Could Break

1. git pull on eleos-core could overwrite live Worker if repo is behind
2. Airtable Doctrine Library has pipe-delimited data (CSV ready but not imported cleanly)
3. Notion Doctrine DB category options are limited — new categories require schema update
4. Worker /api/status reports 29 tables in its count loop but D1 has 46 — status endpoint needs update

## V's Standard

> "If structure exists without live formulas, or formulas exist without validated output, the system should refuse 'complete' status."
