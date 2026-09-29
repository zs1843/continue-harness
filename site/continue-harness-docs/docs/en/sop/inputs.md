# Input registration details

Register raw evidence in `.continue-harness/inputs/` and record it in `manifest.yaml`. The manifest stores type, source, status, and hash information so file drift is visible.

```bash
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness inputs diff --json
```

Original evidence is kept read-only by convention. Analysis outputs and conflict conclusions are separate from source material. Binary design and prototype files may still require tool-assisted interpretation.
