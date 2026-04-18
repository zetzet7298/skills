# Chosen platform

`all 3` — vì bạn nói rõ muốn cài Khuym trên cả `Codex`, `Factory Droid` và `Kiro`, rồi đi tiếp vào full workflow.

# Chosen scope

- **Install scope**
  - **Codex:** cài ở mức runtime/user thông qua local marketplace.
  - **Factory Droid:** cài ở mức runtime/user thông qua plugin marketplace của Droid.
  - **Kiro:** nên dùng **workspace scope** cho repo hiện tại, vì bạn muốn đi bootstrap ngay cho repo này; chỉ dùng global nếu muốn bật Khuym cho nhiều repo.

- **Repo onboarding scope**
  - Với cả 3 nền tảng, onboarding Khuym vẫn là **repo-local**.
  - Nghĩa là: cài plugin/bundle chỉ làm Khuym xuất hiện trong công cụ; còn bootstrap workflow sẽ ghi state/onboarding vào chính repo hiện tại.

# Install steps

## Codex

1. Thêm marketplace local của repo này vào Codex:

   ```text
   /var/www/khuym-skills/.agents/plugins/marketplace.json
   ```

2. Nếu Codex chưa hiện marketplace mới, restart Codex.
3. Trong Codex, cài plugin `khuym` từ marketplace đó.

## Factory Droid

Chạy từ bất kỳ đâu với đường dẫn repo này:

```bash
droid plugin marketplace add "/var/www/khuym-skills"
droid plugin install "khuym@khuym-skills"
droid plugin list
```

## Kiro

Khuyến nghị cho repo hiện tại: **workspace scope**.

```bash
node /var/www/khuym-skills/plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /var/www/khuym-skills
```

Nếu bạn muốn bật Khuym cho mọi repo trong Kiro, dùng global:

```bash
node /var/www/khuym-skills/plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

Tuỳ chọn UI trong Kiro:

- Add a Power from local path
- Chọn thư mục:

```text
/var/www/khuym-skills/plugins/khuym-kiro/
```

# Bootstrap next step

- Skill cần load tiếp theo trên cả 3 nền tảng là: **`using-khuym`**.
- Cài đặt **không đồng nghĩa** với onboarding: sau khi plugin/bundle đã có mặt, bạn vẫn phải chạy `using-khuym` để bootstrap repo hiện tại.
- Vì bạn muốn vào **full workflow**, route tiếp theo là:

```text
using-khuym → exploring → planning → validating → swarming → executing → reviewing → compounding
```

- Bước bootstrap ngắn gọn:
  1. Mở session trên nền tảng bạn muốn dùng.
  2. Load skill `using-khuym`.
  3. Để `using-khuym` thực hiện onboarding repo và route vào full workflow ở trên.
