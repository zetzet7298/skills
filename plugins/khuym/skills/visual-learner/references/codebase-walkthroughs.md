# Codebase Walkthroughs

Use for "explain this repo", "walk me through this feature", PR writeups, code reviews, architecture tours, and module maps.

## Codebase Tour

Start from real files. Do not infer architecture from names alone.

Layout:
- TL;DR: what the system does, runtime entry points, and the core mental model.
- Hot path diagram showing the common call sequence.
- File/module map grouped by responsibility, not alphabetically.
- Data lifecycle trace: pick one realistic input/event and show where it travels.
- "If you want to change X, start here" entry-point table.
- Gotchas and ownership boundaries.

Load-bearing details:
- Link local files with exact paths in the artifact when useful.
- Highlight the main path and push rare branches into expandable sections.
- Annotate code snippets only at the lines that matter.

## PR Or Review Artifact

Use when a visual review is better than a linear findings list.

Layout:
- Summary, risk level, and review focus.
- File-by-file sections with collapsible diffs or annotated snippets.
- Findings table ordered by severity.
- Before/after or data-flow diagram for behavior changes.
- Test evidence and residual risk.

Keep normal chat review rules for final responses; the HTML artifact is the readable companion.

## Common Mistakes

- Drawing every file and every import until the map becomes unreadable.
- Explaining APIs without showing where they are called.
- Turning a code walkthrough into generated docs. Teach the path, not the whole repo.
