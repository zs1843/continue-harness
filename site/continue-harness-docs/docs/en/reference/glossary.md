# Glossary

This page defines the terms that recur across the documentation and CLI output.

| Term | Meaning |
| --- | --- |
| Harness | The engineering protocol around project facts, constraints, verification, and records |
| Core | Framework-neutral runtime for configuration, diagnostics, verification, reports, and safe writes |
| Product Profile | Rules caused by product shape, for example Consumer H5 |
| Platform Adapter | Runtime platform rules, for example Web Mobile |
| Stack Adapter | Framework and toolchain rules, for example uni-app |
| Input | Registered raw evidence: PRD, RP, UI, API, or assets |
| Design Token | The project's single machine-readable visual source of truth; it stores semantic values for color, type scale, spacing, radius, shadow, elevation, and motion, and records source status |
| Token Authority | The authoritative source for Token values, in priority order: high-fidelity UI, RP, current user visual request, existing project Tokens, DESIGN principles, Harness defaults, Agent inference |
| Requirement Closure | Requirement closure; every reachable page, state, action, and return path in the PRD/RP is verified, deferred, or recorded as externally blocked |
| Task | A stable ID that connects evidence, implementation, verification, and snapshots to the same task number |
| Resume | A read-only summary of the collaboration state, including the current task, input state, snapshots, and next actions |
| Managed File | A Harness-generated file protected by metadata; regeneration after a manual edit is refused |
| UI Contract | The project-owned record of components, Tokens, and visual boundaries |
| Aggregate Skill | A workflow Skill selected by preset and project stage; users need not remember individual Skill names |
| Command-specific Skill | A Skill for one command or capability, for example `continue-harness-api` or `continue-harness-design-tokens` |
