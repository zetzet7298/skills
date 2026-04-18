# Chọn nền tảng

Bạn yêu cầu cài trên **cả 3 nền tảng: Codex, Factory Droid và Kiro** rồi đi luôn vào **full workflow**, nên lựa chọn phù hợp là **all 3** để bạn có cùng bộ Khuym skills trên mọi runtime.

# Chọn phạm vi

- **Codex:** cài ở mức runtime/user qua marketplace cục bộ
- **Factory Droid:** cài ở mức runtime/user qua plugin marketplace cục bộ
- **Kiro:** nên dùng **workspace scope** nếu mục tiêu là làm việc với repo hiện tại

Lưu ý quan trọng:

- **Platform install** chỉ làm cho Khuym xuất hiện trong công cụ
- **Repo onboarding/bootstrap** mới chuẩn bị repo hiện tại để chạy workflow Khuym

# Các bước cài đặt

Giả sử repo này nằm tại:

```bash
/absolute/path/to/skills
```

## 1) Codex

1. Thêm marketplace cục bộ của repo vào Codex:

   ```text
   /absolute/path/to/skills/.agents/plugins/marketplace.json
   ```

2. Nếu Codex chưa hiện marketplace mới, hãy restart Codex.
3. Trong Codex, cài plugin **`khuym`** từ marketplace đó.

## 2) Factory Droid

Chạy từ máy đang chứa repo:

```bash
droid plugin marketplace add "/absolute/path/to/skills"
droid plugin install "khuym@khuym-skills"
droid plugin list
```

## 3) Kiro

Với nhu cầu cho repo hiện tại, dùng **workspace scope**:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /absolute/path/to/repo
```

Nếu bạn muốn dùng Khuym cho nhiều repo trong Kiro, có thể cài global:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

Tuỳ chọn UI trong Kiro:

- Add a Power from local path
- Chọn thư mục: `plugins/khuym-kiro/`

# Bước bootstrap tiếp theo

Sau khi cài xong trên các nền tảng, bước tiếp theo là **load `using-khuym`**.

Nếu bạn muốn đi vào **full workflow**, thứ tự là:

1. `khuym:using-khuym`
2. `khuym:exploring`
3. `khuym:planning`
4. `khuym:validating`
5. `khuym:swarming`
6. `khuym:executing`
7. `khuym:reviewing`
8. `khuym:compounding`

## Bootstrap ngắn gọn

Sau khi platform đã sẵn sàng, trong runtime bạn muốn dùng, hãy bắt đầu bằng cách yêu cầu:

```text
Use khuym:using-khuym for this repo and bootstrap me into the full workflow.
```

Ý nghĩa:

- `using-khuym` sẽ lo bước bootstrap/onboarding cho repo hiện tại
- sau đó nó sẽ route bạn vào full chain phù hợp của Khuym
