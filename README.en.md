# Continue Harness

[中文](README.md) ｜ [English](README.en.md)

Continue Harness is a recoverable project collaboration and quality harness. It maintains a traceable delivery chain:

**Requirement → implementation item → acceptance item → evidence → handoff state**

The workflow confirms project facts through conversation, registers task-relevant evidence, defines acceptance criteria, runs the project's own checks, and saves a recoverable handoff. Creation and adoption provide constraint and collaboration records; they do not generate an application starter.

## Get started

Start through Agent conversation, and invoke an operation Skill when the current stage needs one:

> Adopt Continue Harness in this project. Restore existing context first. If no project record exists, confirm the project goal, scope, deliverables, and runtime conditions through conversation before creating or adopting the constraint workspace. Select evidence for the current task, define acceptance criteria, map the project's existing checks, and save verification evidence and a recoverable handoff. Preserve project-owned files and conventions.

New and existing projects use the same general collaboration workflow. Invoke an existing operation Skill for the current stage; no aggregate project Skill is required. The CLI is available for automation and troubleshooting.

Version `0.1.0` is not published to npm. See the repository package configuration for the CLI installation source and runtime requirements.

### CLI entry points

```bash
continue-harness plan create my-project --json
continue-harness create my-project
cd my-project
continue-harness intake inspect --json
continue-harness inspect --json
continue-harness doctor
```

For an existing project, run `continue-harness plan init --json` to inspect planned writes, then run `continue-harness init`.

See the [CLI reference](site/continue-harness-docs/docs/en/reference/commands.md) for registering inputs, running tasks, verification and handoff. Current capabilities and Pilot evidence are in the [case study](site/continue-harness-docs/docs/en/showcase/case-study.md) and [real-project Pilot](site/continue-harness-docs/docs/en/showcase/real-project-pilot.md).

Online documentation: [https://ai.zs1843.cn](https://ai.zs1843.cn)

## Project records

- `.continue-harness/project.yaml`: project facts and command mappings.
- `.continue-harness/intake.yaml`: basic facts and input applicability.
- `.continue-harness/inputs/manifest.yaml`: evidence sources, versions and task links.
- `docs/ACCEPTANCE.md`: links among requirements, implementation, acceptance and evidence.
- `tmp/continue-harness/`: latest verification report and command logs.
- `docs/history/tasks/`: task snapshots and handoff state.

The project owns business decisions and acceptance criteria. Harness checks registered links, file state and verification results; it cannot replace business review or automatically prove that requirements have been fully decomposed.

See the [Site package](site/continue-harness-docs/package.json) for local documentation build instructions.
