# Agent integration details

`AGENTS.md` is the canonical constraint body. Claude Code and Cursor files are thin adapters:

```text
AGENTS.md
CLAUDE.md
.cursor/rules/continue-harness.mdc
```

Install workflows by provider when needed:

```bash
continue-harness skills install --project --provider all --name generic-harness
```

Codex and Cursor use `.agents/skills`; Claude Code uses `.claude/skills`. Skills describe procedures and never override project constraints.
