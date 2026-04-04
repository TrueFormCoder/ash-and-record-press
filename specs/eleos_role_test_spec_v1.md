# ELEOS Role Test — Scoring Endpoint Spec v1.0

Scoring model for the ELEOS Role Test per V's Threshold Engine (L10065-L10516).
See full spec: ELEOS_Role_Test_Spec_v1.md

## Scoring Model
9 roles × 4 dimensions (Strength, Health, Shadow, Load) × 0-5 scale

## Computed Outputs
- Primary Role = highest Strength
- Best Aligned = highest Health
- Most Distorted = highest Shadow
- Most Overloaded = highest Load
- Missing Roles = Strength ≤ 1 with corruption present

## Traffic Light
- Green = aligned | Yellow = strained | Red = shadow drift | Black = missing

## Fast Test (4 questions)
1. What does this system do best under pressure? → Primary
2. What is never getting done? → Missing
3. Who is carrying too much? → Overload
4. What once-useful gift has become distortion? → Shadow

## D1 Tables
- role_test_scores (per-user results)
- role_test_interpretations (9 records: prompts, triggers, lights)

## Doctrine Seal
"Find the dominant gift, the missing medicine, the overloaded function, and the shadowed virtue."