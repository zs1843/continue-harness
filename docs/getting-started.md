# Getting started

## Use Continue Harness in a project

The recommended entry point is Agent conversation. Ask the Agent to create a new project workspace or adopt an existing project, then confirm project facts and applicable inputs through Intake. An operation Skill may be used when available for the current stage; no aggregate Skill is required. The workflow connects requirements, implementation, acceptance, evidence, and handoff state.

For local Harness development, install the repository dependencies and run the checks declared by the repository package configuration:

```bash
corepack pnpm install
corepack pnpm check:syntax
corepack pnpm check:schema
corepack pnpm check:safety
corepack pnpm lint
corepack pnpm test
corepack pnpm doctor
```

The documentation site has its own dependency installation command:

```bash
corepack pnpm docs:install --frozen-lockfile
```

## Optional CLI workflow

The CLI is a secondary entry point. Its runtime and installation requirements are declared by the package configuration. For local source execution:

```bash
continue-harness plan create project-name --json
continue-harness create project-name
cd project-name
continue-harness intake inspect --json
continue-harness inputs inspect --json
continue-harness task create --title "Confirmed work item" --json
continue-harness verify feature
continue-harness resume --json
```

Creation prepares constraint and collaboration records; it does not create business implementation. Intake and task scope determine which input sources and project checks are applicable. Unconfirmed facts remain pending.

## Project ownership

The project owns its constraints, facts, input sources, commands, acceptance criteria, and decisions. The Harness records relationships and executes only configured checks. It does not infer project correctness.

Use the root `AGENTS.md` as the canonical constraint source. Provider-specific entry files may point to it, but should not duplicate its content. On a handoff, restore the task using persisted records, inspect the latest verification result and open risks, and record next actions.
