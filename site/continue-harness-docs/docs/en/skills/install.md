# Install skills

This page covers installing Skills from the GitHub repository, plus the optional CLI method, install locations, and overwrite behavior.

## Install from the GitHub repository

A Skill is a plain Markdown directory, taken directly from `skills/<name>/` in the repository. No npm release is required:

```text
https://github.com/zs1843/continue-harness
```

### 1. Get the repository

```bash
git clone --depth 1 https://github.com/zs1843/continue-harness.git /tmp/continue-harness
```

If you only need the Skills, you can download the repository's `skills/` directory instead.

### 2. Copy the Skill the current stage needs

The default `generic` preset only needs the `generic-harness` aggregate Skill:

```bash
# Codex / Cursor
mkdir -p .agents/skills
cp -R /tmp/continue-harness/skills/generic-harness .agents/skills/

# Claude Code
mkdir -p .claude/skills
cp -R /tmp/continue-harness/skills/generic-harness .claude/skills/
```

`consumer-h5-harness` is used only with `--preset consumer-h5`. Copy the other 12 command-level Skills on demand:

```bash
cp -R /tmp/continue-harness/skills/continue-harness-api .agents/skills/
```

On Windows PowerShell, use `Copy-Item -Recurse`:

```powershell
git clone --depth 1 https://github.com/zs1843/continue-harness.git $env:TEMP\continue-harness
New-Item -ItemType Directory -Force .agents\skills | Out-Null
Copy-Item -Recurse -Force $env:TEMP\continue-harness\skills\generic-harness .agents\skills\
```

### 3. Global install (optional)

Copy into the host's global skills directory, for example `~/.codex/skills`, `~/.claude/skills`, or `~/.cursor/skills`. Global directories are visible to every project; use a project-level install for project-specific workflows.

## Install locations

| Scope | Host | Target directory |
| --- | --- | --- |
| Project | Claude Code | `<cwd>/.claude/skills` |
| Project | Codex, Cursor | `<cwd>/.agents/skills` |
| Global | Codex | `$CODEX_HOME/skills`, or `~/.codex/skills` when unset |
| Global | Claude Code | `~/.claude/skills` |
| Global | Cursor | `~/.cursor/skills` |

Codex and Cursor share `.agents/skills`; Claude Code reads `.claude/skills`.

## Update an existing Skill

```bash
cd /tmp/continue-harness && git pull
cp -R /tmp/continue-harness/skills/generic-harness .agents/skills/
```

Copying overwrites files with the same name. Check the target directory for local edits before overwriting.

## Optional: install with the CLI

When the CLI is available, `skills install` is equivalent to copying manually.

**Skill**: `continue-harness-skills`

**CLI (optional)**:

```bash
continue-harness skills list [--json]
continue-harness skills install --project|--global [--provider codex|claude|cursor|all] [--name <name>] [--target <dir>] [--force] [--json]
```

| Option | Values | Meaning |
| --- | --- | --- |
| `--project` | — | Install into the current project directory |
| `--global` | — | Install into the user directory |
| `--provider` | `codex` (default), `claude`, `cursor`, `all` | Select the host; `all` syncs all three |
| `--name` | Skill name | Defaults to every available Skill; an unknown name fails the command |
| `--target` | Directory | Overrides the default location; mutually exclusive with `--provider all` |
| `--force` | — | Overwrite an existing Skill directory with the same name |
| `--json` | — | Emit `installed`, `skipped`, `targets`, and related fields |

Exactly one of `--project` or `--global` is required. An existing directory with the same name is skipped by default.

## Verify an install

```bash
ls .agents/skills/generic-harness
```

1. `SKILL.md` exists in the target directory.
2. Read `SKILL.md` and confirm its `name` matches.
3. Have the Agent reload project Skills; when the CLI is available you can also run `continue-harness skills list --json` and compare names.

## Common issues

| Symptom | Handling |
| --- | --- |
| The Agent reports a missing Skill | Copy only the one the current stage needs. Do not install all of them at once. |
| The Agent still cannot find the Skill | Match the directory to the host: Claude Code reads `.claude/skills`; Codex and Cursor read `.agents/skills`. |
| An existing Skill needs an update | Confirm there are no local edits, then copy over it again. |
| Only one Skill is needed | After a shallow clone, run `cp -R /tmp/continue-harness/skills/<name> <target>/`, or download that directory directly. |
| A global install affects other projects | Global directories are visible to every project; use a project-level install for project-specific workflows. |

## Related pages

- [Built-in skills](/en/skills/)
- [Execution steps](/en/skills/steps)
