# Design principles

1. Project-owned facts are authoritative.
2. Core stays independent of product, platform, framework, and business domain.
3. Dry-run and read-only inspection precede mutation.
4. Evidence is loaded by task type instead of all at once.
5. Verification distinguishes business failures, environment blocks, and unconfigured checks.
6. Agent adapters stay thin; `AGENTS.md` remains the constraint authority.
7. Publishing, dependency changes, and public protocol changes require explicit approval.
