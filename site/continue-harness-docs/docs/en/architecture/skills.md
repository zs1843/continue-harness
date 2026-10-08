# Skills and Agent entry points

The default project workflow installs the aggregate `generic-harness` Skill. The specialized `consumer-h5-harness` and command-specific Skills remain available when a project or task needs them.

```bash
continue-harness skills list --json
continue-harness skills install --project --provider all --name generic-harness
continue-harness skills install --global --provider claude --name continue-harness-doctor
```

Project-level Codex and Cursor Skills use `.agents/skills`; Claude Code uses `.claude/skills`. Global defaults are `~/.codex/skills`, `~/.claude/skills`, and `~/.cursor/skills`. Existing files are not overwritten unless `--force` is supplied.

## Installation policy

The generic aggregate Skill is the default project entry point:

```text
.agents/skills/generic-harness/
.claude/skills/generic-harness/
```

The specialized `consumer-h5-harness` Skill is installed only for the explicit Consumer H5 preset.
Command-specific Skills are installed when a task requires deeper behavior:

```bash
continue-harness skills install --project --name continue-harness-api
continue-harness skills install --project --name continue-harness-design-tokens
```

Skills describe procedures and do not replace the canonical project constraint body in `AGENTS.md`.
People still decide authoritative inputs, conflicts, deferrals, external blockers, dependency
installation, publishing, and other actions outside the project protocol.
