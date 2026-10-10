# Install Skills

Skills are operation guides used when needed. Creating or adopting a project does not install an aggregate Skill by default; install an operation Skill only when the current stage needs it.

## Copy from the repository

```bash
git clone --depth 1 https://github.com/zs1843/continue-harness.git /tmp/continue-harness
mkdir -p .agents/skills
cp -R /tmp/continue-harness/skills/continue-harness-inputs .agents/skills/
```

Replace `continue-harness-inputs` with the required Skill directory. Codex and Cursor use `.agents/skills/`; Claude Code uses `.claude/skills/`.

## Install with the CLI (optional)

When the CLI is available, list and install one Skill:

```bash
continue-harness skills list --json
continue-harness skills install --project --name continue-harness-inputs
```

Project and global installation require an explicit target. Full syntax:

```text
continue-harness skills install --project|--global [--provider codex|claude|cursor|all] [--name <name>] [--target <directory>] [--force] [--json]
```

Use `--name` to select one Skill. When omitted, the CLI selects all currently installable Skills. Existing targets are skipped by default; `--force` overwrites matching content, so inspect project-owned changes first.

## Verify

Confirm that the selected target contains the expected `SKILL.md`, then reload the Skill in the Agent. You can also use `continue-harness skills list --json` to inspect the current repository list.

## Related pages

- [Built-in Skills](/en/skills/)
- [Execution steps](/en/skills/steps)
