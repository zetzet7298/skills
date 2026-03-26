# Dream Codex Source Policy

This policy defines how `khuym:dream` reads Codex artifacts for one manual consolidation pass.

## Source Priority

1. Primary: `~/.codex/history.jsonl`
2. Secondary fallback: `~/.codex/logs_1.sqlite` (targeted queries only)

Use `history.jsonl` for most evidence gathering. Use `logs_1.sqlite` only when a specific claim needs
extra confirmation and `history.jsonl` is insufficient.

## Run Modes

## Bootstrap

Use bootstrap when:
- No learnings file has `last_dream_consolidated_at`, or
- User explicitly asks for a full consolidation scan.

Bootstrap scan scope:
- Full relevant Codex history needed to establish initial consolidated baseline.

## Recurring

Use recurring when:
- At least one learnings file has `last_dream_consolidated_at`, and
- User did not request bootstrap.

Recurring default window:
- Last `7 days`
- Up to `20 sessions`

User may override by days and/or sessions.
Do not silently escalate recurring mode to full-history scan.

## Conflict Handling

If provenance and user intent conflict (for example marker absent but user requests recurring), ask
one short clarification question. Do not silently guess.

## Noise Control

- Do not perform indiscriminate telemetry scans in recurring mode.
- Prefer narrow, hypothesis-driven lookups when querying `logs_1.sqlite`.
- Keep extracted evidence limited to durable lessons, decisions, and reusable facts.
