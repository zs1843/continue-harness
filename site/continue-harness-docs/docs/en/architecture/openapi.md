# Optional interface-contract capability

Interface-contract inspection and generation are optional capabilities, not prerequisites for the common project workflow. Register an authoritative source, select task scope, and enable the workflow only when the project task depends on an interface contract.

## Records and generation

The project supplies the contract source and task-selection record. Generation follows confirmed task scope and keeps generated files separate from their management metadata. Before writing, it checks whether existing files remain tool-managed; manual changes must stop overwrite and produce a conflict report.

## Boundary

The current implementation starts from a local contract file. Online synchronization, authenticated retrieval, and some complex contract features are not implemented. Generated output still requires project checks and review; successful generation does not prove business mapping or requirement acceptance. Projects without interface requirements do not need these records.
