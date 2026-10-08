# Inputs

The Inputs module registers raw evidence under `.continue-harness/inputs/`, described by `manifest.yaml`. This page covers directory roles, the behavior of inspect and analyze, and the parsing scope. The `continue-harness-inputs` Skill runs `inspect` and `analyze` by default, and the CLI is an optional entry point.

## Directory roles

| File or directory | Responsibility |
| --- | --- |
| `.continue-harness/inputs/manifest.yaml` | Registers the input manifest with type, source, status, and hash |
| `.continue-harness/inputs/prd/` | Product requirements |
| `.continue-harness/inputs/rp/` | Prototypes and interactions |
| `.continue-harness/inputs/ui/` | Visual references |
| `.continue-harness/inputs/api/` | API inputs |
| `.continue-harness/inputs/assets/` | Assets |

## inspect

inspect compares the manifest with the files on disk:

- Finds unregistered files.
- Finds registered files that are missing.
- Reports manifest status.
- Emits stable JSON.

## analyze

analyze performs lightweight text analysis on the prd, rp, and ui input types:

- Reads files as UTF-8 and extracts labelled conclusions.
- Separates business, interaction, and visual facts.
- Reports same-key conflicts.
- Does not modify the original inputs.

## Boundary

Only UTF-8 text inputs are parsed; PDF, images, binaries, and online synchronization are outside the 0.1.0 scope. Inputs that cannot be read directly are marked as requiring manual Agent parsing.
