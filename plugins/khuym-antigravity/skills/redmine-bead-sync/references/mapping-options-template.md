# Mapping options template

Use this template when proposing bead-to-Redmine mappings.

Always keep the options numbered.

```markdown
# Sync scope

- Feature / bead set:
- Redmine project:
- Requested operations: create / update / comment / time log
- Source evidence: br / bd / .beads cross-check / human clarification

# Mapping options

## Option 1 — <recommended label>

- Maps:
  - <bead type or node group> -> <Redmine object>
  - <bead type or node group> -> <Redmine object>
- Best when:
- Preserves:
- Loses:
- Redmine impact:

## Option 2 — <lighter label>

- Maps:
  - <bead type or node group> -> <Redmine object>
- Best when:
- Preserves:
- Loses:
- Redmine impact:

## Option 3 — <more explicit label>

- Maps:
  - <bead type or node group> -> <Redmine object>
- Best when:
- Preserves:
- Loses:
- Redmine impact:

# Recommendation

- Recommended option:
- Why it wins:
- Why the next-best option loses:

# What I need from you

- Chosen option number:
- Any field overrides:
- Dry-run only or write-ready:
```

## Option design rules

- Keep each option different in structure, not just wording.
- At least one option should favor operational simplicity.
- At least one option should favor traceability or longer-term maintenance.
- If there is truly only one credible mapping, still present it as `Option 1` and explain why the others are not credible.

## Common mapping patterns

### Pattern A: near 1:1 mapping

- epic bead -> parent / summary issue
- task bead -> task issue
- bug bead -> bug issue
- docs bead -> docs or task issue

Best when:

- the team wants strong traceability
- the graph is already granular

### Pattern B: grouped execution mapping

- epic bead -> one summary issue
- several tightly related implementation beads -> one Redmine execution issue
- follow-up bugs -> separate bug issues

Best when:

- the graph is more detailed than the team wants in Redmine
- Redmine is used for coordination, not as a perfect mirror

### Pattern C: milestone-first mapping

- epic or milestone bead -> milestone issue
- only current in-flight beads -> child issues
- future beads stay out until ready

Best when:

- the team wants lighter Redmine noise
- sync is staged over time
