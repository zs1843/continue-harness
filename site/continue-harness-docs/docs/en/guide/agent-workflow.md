# Agent collaboration rules

## One constraint authority

`AGENTS.md` is the project constraint body. `CLAUDE.md` and the Cursor rule are provider adapters, not duplicate rule sets. Skills are invokable workflows and cannot override project constraints.

## Recommended execution order

1. Read `AGENTS.md`, `.continue-harness/project.yaml`, and project fact documents.
2. Run `inspect` and `doctor` to check readiness.
3. Load the PRD/RP/UI/API evidence attached to the current task instead of all inputs.
4. Implement within the project's existing directory and dependency boundaries.
5. Select a verification mode by change type; retry the same cause at most twice.
6. Update status, decisions, history, and the task snapshot.
7. End the conversation with verification results, remaining risks, and numbered next actions.

## Evidence by task type

| Task | Read first |
| --- | --- |
| Business implementation | PRODUCT, PRD, RP, input manifest |
| UI adjustment | DESIGN, Tokens, UI Contract, UI input, visual reports |
| API integration | API input, `selection.yaml`, OpenAPI snapshot |
| Architecture change | ARCHITECTURE, DECISIONS, relevant history |

## Human approval boundaries

People confirm authoritative business facts, input conflicts, deferrals and external blocks, protected component or Token boundaries, and changes to production dependencies, public CLI behavior, or publishing. Agents can automate read-only checks, plan previews, implementation, and authorized verification.
