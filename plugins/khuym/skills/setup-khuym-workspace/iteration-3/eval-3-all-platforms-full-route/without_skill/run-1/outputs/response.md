# Chosen platform

`Codex`, `Factory Droid`, và `Kiro`.

# Chosen scope

- **Install scope**
  - **Codex**: cài plugin ở mức runtime/user bằng local marketplace của repo.
  - **Factory Droid**: cài plugin ở mức runtime/user từ marketplace của repo này.
  - **Kiro**: có thể cài ở mức `workspace` hoặc `global`; nếu chỉ dùng cho repo hiện tại thì ưu tiên `workspace`.
- **Repo onboarding scope**
  - Sau khi cài trên bất kỳ platform nào, bước onboarding Khuym vẫn là **repo-local**: nó sẽ bootstrap state/workflow ngay trong repo bạn đang làm việc, không phải cài toàn cục là xong workflow.

# Install steps

## Codex

1. Thêm marketplace của repo này vào Codex bằng file:
   - `/absolute/path/to/skills/.agents/plugins/marketplace.json`
2. Nếu marketplace chưa hiện ngay, restart Codex.
3. Cài plugin `khuym` từ marketplace đó.

## Factory Droid

Chạy từ repo root:

```bash
droid plugin marketplace add "/absolute/path/to/skills"
droid plugin install "khuym@khuym-skills"
droid plugin list
```

## Kiro

Nếu muốn gắn vào đúng repo hiện tại, dùng `workspace`:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /absolute/path/to/repo
```

Nếu muốn cài global cho mọi workspace:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

Nếu cài qua UI của Kiro thì thêm Power từ **Local Path** và chọn:

- `plugins/khuym-kiro/`

# Bootstrap next step

- **Codex**: bắt đầu bằng `khuym:using-khuym`
- **Factory Droid**: bắt đầu bằng `khuym:using-khuym`
- **Kiro**: bắt đầu bằng `using-khuym`

Cài plugin/bundle mới chỉ làm cho Khuym khả dụng trên platform; nó chưa bootstrap workflow cho repo của bạn.

Để đi vào full workflow, sau `using-khuym` hãy đi tiếp theo chain:

`exploring → planning → validating → swarming → executing → reviewing → compounding`
