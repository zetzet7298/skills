# Consumer Artifact Layout

The reusable distiller writes only repo-local artifacts:

```text
.ai-distill/
├── catalog/
│   ├── accepted-knowledge.yaml
│   ├── accepted-knowledge.md
│   └── session-provenance-ledger.json
├── drafts/
│   ├── <target>/<existing-instruction-path>
│   └── review-manifest.json
├── patches/
│   └── <target>/<existing-instruction-path>.patch
└── reports/
    └── daily-report.json|md
```

Notes:

- Draft generation is conservative. It will not create new live instruction files.
- Target resolution is review-first. Ambiguity is surfaced in `review-manifest.json`.
- The managed draft section is bounded by `ai-distill:reviewed-guidance` markers so repeated draft runs stay stable.
