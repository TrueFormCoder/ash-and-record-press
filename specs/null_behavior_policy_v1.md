# Null Behavior Policy v1.0

What happens when fields are blank, unknown, inapplicable, or contradictory.
See full document in project deliverables: Null_Behavior_Policy_v1.md

## The Rule
Every field must answer: What if blank? What if unknown? What if inapplicable? What if contradictory?

## Key Invariants
- Blank ≠ False (absence of evidence ≠ evidence of absence)
- Unknown is a valid state (do not replace with a guess)
- N/A must be explicit (not assessed ≠ does not apply)
- Contradictions are signals (flag both, do not silently choose)
- Conservative defaults for safety-critical fields
- Confidence degrades with nulls

## Source
V Threshold Engine session (L18188-L18196) + SYSTEM_CONSTITUTION §V