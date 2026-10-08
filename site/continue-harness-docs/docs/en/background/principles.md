# Design principles

This page covers the boundary split, fact ownership, initialization behavior, capability activation, and verification stance of continue-harness. These principles decide what belongs in Core and what stays with the target project.

## Core does not understand business

Core contains no product pages, domain states, API paths, brands, or token values. It carries reusable mechanisms only: configuration, command parsing, diagnostics, verification, reporting, and safe writes. Adapter values are configuration protocol: Core configuration enums and `schemas/project.schema.json` validate `project.product_type`, `project.platforms`, and `stack.adapter`, and none of them hold business facts.

The cost is more explicit configuration; the benefit is that the harness does not become tied to one business project.

## Project facts are project-owned

`.continue-harness/project.yaml` belongs to the target project. The project selects its profile, platform, and stack, and maps symbolic verification steps to real commands.

The harness provides templates and defaults, while real business facts stay in the project's own files and configuration.

## Initialization is safe

When adopting an existing project, the harness inspects every target file first and stops writing on a real conflict. Files with identical content are kept, and files with different content are reported as project-maintained or conflicting.

`continue-harness init --dry-run` prints the write plan without changing files.

## Capabilities stay light until needed

New projects get aggregation workflow Skills from the CLI and the project type, with `generic` as the default preset. Consumer H5 Skills, command-level Skills, OpenAPI, UI System, design token discovery, and visual baselines activate per task.

These capabilities expand on demand, which keeps the default cognitive cost low.

## Verification is completion evidence

A verification report records commands, results, and blocking reasons, and separates business failures, environment blocks, and unconfigured checks. An unconfigured check returns an unconfigured or blocked status and does not count as passed.

Functional acceptance for Consumer H5 also checks requirement closure.

## Constraints and approvals

`AGENTS.md` is the single constraint authority; `CLAUDE.md` and the Cursor rule are thin adapters, and Skills are callable workflows.

Publishing, dependency upgrades, and public protocol changes require explicit approval.
