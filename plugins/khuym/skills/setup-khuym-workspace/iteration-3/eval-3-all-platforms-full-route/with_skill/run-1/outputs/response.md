# Chosen platform

`all 3` — vì bạn yêu cầu cài Khuym trên cả **Codex**, **Factory Droid** và **Kiro**, rồi đi tiếp vào full workflow.

# Chosen scope

- **Install scope**
  - **Codex:** runtime/user-level qua local marketplace.
  - **Factory Droid:** runtime/user-level qua Droid plugin marketplace.
  - **Kiro:** nên dùng **workspace** cho repo này; chỉ dùng **global** nếu bạn muốn bật Khuym cho nhiều repo.

- **Repo onboarding scope**
  - Với cả 3 nền tảng, onboarding Khuym vẫn là **repo-local** cho repo hiện tại: `/var/www/khuym-skills`.
  - Nghĩa là: cài plugin/bundle chỉ làm Khuym xuất hiện trong tool; còn bootstrap workflow mới là bước chuẩn bị repo để Khuym ghi state và route đúng chain.

# Install steps

## Codex

1. Thêm local marketplace của repo này vào Codex:

   ```text
   /var/www/khuym-skills/.agents/plugins/marketplace.json
   ```

2. Nếu Codex chưa hiện marketplace mới, restart Codex.
3. Cài plugin `khuym` từ marketplace đó.

## Factory Droid

Chạy:

```bash
droid plugin marketplace add "/var/www/khuym-skills"
droid plugin install "khuym@khuym-skills"
droid plugin list
```

## Kiro

Khuyến nghị cho repo này: **workspace scope**.

```bash
node /var/www/khuym-skills/plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /var/www/khuym-skills
```

Nếu bạn muốn bật Khuym cho nhiều repo trong Kiro:

```bash
node /var/www/khuym-skills/plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

Tuỳ chọn UI:

- Trong Kiro, add một Power từ local path
- Chọn thư mục:

  ```text
  /var/www/khuym-skills/plugins/khuym-kiro/
  ```

# Bootstrap next step

1. Skill bootstrap cần gọi tiếp là:
   - **Codex:** `khuym:using-khuym`
   - **Factory Droid:** `khuym:using-khuym`
   - **Kiro:** `using-khuym`
2. Cài đặt **không đồng nghĩa** với onboarding; sau khi plugin/bundle đã sẵn sàng, bạn vẫn phải chạy `using-khuym` để bootstrap repo hiện tại.
3. Vì bạn muốn đi vào **full workflow**, route tiếp theo là:

   ```text
   using-khuym → exploring → planning → validating → swarming → executing → reviewing → compounding
   ```

4. Bước ngắn gọn để vào workflow:
   - Mở session trên nền tảng bạn muốn dùng.
   - Gọi skill bootstrap tương ứng ở trên.
   - Để `using-khuym` onboard repo `/var/www/khuym-skills` rồi route vào full workflow.
