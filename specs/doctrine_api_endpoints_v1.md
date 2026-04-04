# ELEOS Worker — Doctrine API Endpoints v1.0

New routes for archetype_doctrine queries.
See full spec: Doctrine_API_Endpoint_Spec_v1.md

## Endpoints

| Route | Method | Returns |
|-------|--------|---------|
| `/api/doctrine/:archetype_id` | GET | Full doctrine entry for archetype |
| `/api/doctrine/diagnose/:diamond_mode` | GET | Diamond diagnostic with counter-roles |
| `/api/doctrine/counter-roles` | GET | All 9 Crystal Gem roles |
| `/api/doctrine/eewos` | GET | All anti-patterns (highest conversion) |
| `/api/doctrine/missing-role-check` | POST | Missing role analysis from active list |
| `/api/encounter/check-triggers` | POST | All 15 encounter templates evaluated |

## D1 Tables
- `archetype_doctrine` — 13 records (9 roles + 4 diamonds)
- `encounter_templates` — 15 templates (10 original + 5 new)
- `archetype_resource_meta` — 4 new columns (scarcity_shock_phase, loss_avoidance_active, pattern_visual_alignment, flip_detection_score)

## Source
V Threshold Engine session 2026-04-01 + Claude D1 backfill 2026-04-04