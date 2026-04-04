# ELEOS Kernel Contract v1.0
## Per V's Domain Strategy Thread (2026-04-04) — ALERT-010 + ALERT-011

## The Law
Every module in ELEOS MUST:
1. Accept a NormalizedStateObject (NSO)
2. Return a TransformedStateObject (TSO)
3. Attach: confidence score, distortion flags, intervention eligibility
4. Pass MirrorProof validation before output

Violations: state marked INVALID, routed to MirrorSolveRT, output blocked.

## State Object Schema
The single structured object passed between ALL modules:
- state_id, timestamp, system_version
- Input: raw, source (user/system/external), entry_path
- Classification: archetype_primary, archetype_stress, field, sed_class, role, diamond_lane
- Metrics: emotional_voltage, cognitive_clarity, somatic_load, shame_loop_stage, trust_posterior, regulatory_fusion_risk
- Analysis: confidence, confidence_tier, distortion_flags, intervention_eligible
- MirrorProof: passed, gate_results, falsifiability_statement, contradiction_flag
- Governance: passed, ruling_id, authority_level
- Routing: output_audience, output_format, output_risk
- Trace: array of module passes
- Flags: state_valid, state_flag

## Module Contracts (7 modules)
1. Threshold Engine (entry, rank 5) — raw input to classified NSO
2. ELE (os, rank 4) — emotional voltage, archetypes, shame, trust
3. MirrorTone (os, rank 4) — Bayesian inference, LLR, SPRT, clarity
4. MirrorBloom (os, rank 4) — somatic load, embodiment, markers
5. MirrorProof (verification, rank 1) — 5 gates, NOTHING overrides this
6. Governance (governance, rank 2) — Constitution, Compiler, routing
7. Output Router (output, rank 6) — audience/format/risk routing

## Execution Hierarchy
1. MirrorProof (truth constraint) — nothing overrides
2. Governance (policy control)
3. Kernel modules (ELE, MirrorTone, MirrorBloom)
4. Threshold Engine (entry gate)
5. Output Router (lowest authority)

## Invariant Constraints
- No module mutates raw input
- No module bypasses MirrorProof
- No output emitted without governance pass
- Failure = INVALID state, routed to MirrorSolveRT, output blocked
- Every output carries trace array for reproducibility

## D1 Tables
- state_objects (40+ fields — the system bloodstream)
- module_contracts (7 records — what each module accepts/returns)
- execution_hierarchy (7 records — authority order)

## V's Doctrine
"Without the kernel contract, the system is vibes. With it, the system is executable logic."