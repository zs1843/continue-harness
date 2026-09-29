# CLI boundaries

The canonical executable is `continue-harness`; `fe-harness` remains a compatibility alias. The CLI owns command routing, human-readable help, stable JSON output, plan previews, resource installation, and process exit semantics. Core owns execution and project protocols.

The CLI must not encode business pages, API paths, brand values, or project-private decisions. Public interface changes require compatibility review.
