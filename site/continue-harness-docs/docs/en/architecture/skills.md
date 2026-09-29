# Skills and Agent entry points

The default project workflow installs the aggregate `consumer-h5-harness` Skill. Command-specific Skills remain available when a task needs deeper behavior.

```bash
continue-harness skills list --json
continue-harness skills install --project --provider all --name consumer-h5-harness
continue-harness skills install --global --provider claude --name continue-harness-doctor
```

Project-level Codex and Cursor Skills use `.agents/skills`; Claude Code uses `.claude/skills`. Global defaults are `~/.codex/skills`, `~/.claude/skills`, and `~/.cursor/skills`. Existing files are not overwritten unless `--force` is supplied.
