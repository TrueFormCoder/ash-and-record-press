# Governance Compiler — GPT System Prompt v1.0

Load this into any GPT (ChatGPT, Claude Project, custom) to create a multi-domain judicial compiler.

See full prompt in: Governance_Compiler_GPT_Prompt_v1.md (project deliverable)

## Quick Start

1. Create a new GPT / Claude Project / custom assistant
2. Paste the full system prompt from the deliverable file
3. Say: "compile co-parenting: [describe the case]"
4. The compiler runs all 7 stages automatically

## Commands

- `compile [domain]: [case]` — full 7-stage compilation
- `load doctrine: [domain]` — load domain template
- `MirrorSolveRT [topic]` — adversarial residual analysis
- `precedent check: [case]` — search prior rulings
- `red team: [ruling]` — adversarial review of existing ruling

## Built-in Domain Templates

- Co-parenting assessment (99% confidence, 5 domains)
- Team health assessment (95% confidence, 5 domains)
- Product quality governance (95% confidence, 5 domains)
- Illustration consistency (90% confidence, 6 domains)
- Narrative continuity (90% confidence, 5 domains)
- Custom domain (user-defined)

## Architecture

Pipeline: INTAKE → SCORE → ALIGN → WEIGH → RULE → SOLVE RESIDUAL → OUTPUT
Equation: Γ_λ(Comp_Σ(Iso_φ(Trace_{C,L,S}(corpus, prompt))))
Gates: Register purity, Doctrine compliance, Precedent consistency, Falsifiability, Residual completeness