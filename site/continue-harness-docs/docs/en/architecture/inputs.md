# Inputs

The Inputs module registers evidence in `.continue-harness/inputs/manifest.yaml`. This page covers directory roles, the behavior of inspect and analyze, and the parsing scope. When working with inputs, an Agent can use the `continue-harness-inputs` Skill or invoke the CLI.

## Directory roles

| File or directory | Responsibility |
| --- | --- |
| `.continue-harness/inputs/manifest.yaml` | Registers the input manifest; Core reads `id`, `type`, `path`, `task_id`, `status`, `sha256`, and `supersedes`, and passes other fields such as `source` and `version` through unchanged |
| `.continue-harness/inputs/<type>/` | Groups input files by type; `prd/`, `rp/`, `ui/`, `api/`, and `assets/` are examples of built-in types, not an allowlist |

An entry's `path` points at a real project file and may live anywhere in the repository; custom types can likewise have their own directories.

## inspect

inspect compares the manifest with the files on disk:

- Resolves each entry's type: it takes `type` from the entry first, and only infers from the directory name when a path sits under `.continue-harness/inputs/prd|rp|ui|api|assets/`.
- Treats a type name matching lowercase letters, digits, underscores, or hyphens (such as `requirements` or `brand-assets`) as a custom type and displays that name; a type that cannot be resolved is marked for confirmation and displayed as the raw value or "input pending confirmation".
- Walks every subdirectory of `.continue-harness/inputs/` to find unregistered files, where the directory set is the built-in types plus any custom directories present, skipping `README.md` and `metadata.yaml`; unregistered files are marked for confirmation.
- Finds registered files that are missing, and files that are still placeholder content.
- Reports conflicts: several `active` inputs sharing a type and task (or id/path) are a conflict, unless one declares `supersedes` for the other.
- Emits stable JSON.

## analyze

analyze performs lightweight text analysis on every registered input that exists and has `status: active`, regardless of type:

- Reads files as UTF-8 and extracts labelled conclusions.
- Classification: `rp` becomes interaction; `ui` uses a matching visual dimension or remains `input:ui`; `prd`, `api`, and `assets` use known business patterns and remain `input:<type>` when none match; other custom types are not inferred as business facts and remain `input:<type>`.
- Reports same-key conflicts.
- Records a binary or otherwise unreadable input as one fact requiring manual Agent parsing.
- Does not modify the original inputs.

## Boundary

Only UTF-8 text inputs are parsed; PDF, images, binaries, and online synchronization are outside the 0.1.0 scope. Inputs that cannot be read directly are marked as requiring manual Agent parsing.
