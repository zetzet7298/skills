# Chosen platform

Mình chọn **Codex** cho yêu cầu này.

# Chosen scope

- **Install scope:** chỉ cài plugin **Khuym** vào Codex từ local marketplace của repo này.
- **Repo onboarding scope:** sau khi cài xong, chỉ onboard và chạy workflow Khuym cho **repo hiện tại** là `/var/www/khuym-skills`.

Ranh giới giữa hai phần là:
- **Install** = làm cho Codex nhìn thấy và cài được plugin `khuym`.
- **Onboarding** = bắt đầu dùng Khuym bên trong repo này để vào workflow thật.

Với nhu cầu “repo này thôi”, scope hợp lý nhất là **cài plugin từ local marketplace của chính repo này, rồi onboard đúng repo hiện tại**.

# Install steps

1. Trong Codex, thêm marketplace local của repo này:

   ```text
   /var/www/khuym-skills/.agents/plugins/marketplace.json
   ```

2. Nếu Codex chưa hiện marketplace mới ngay, hãy restart Codex.

3. Cài plugin **`khuym`** từ marketplace đó.

4. Plugin sẽ lấy nội dung từ package local:

   ```text
   /var/www/khuym-skills/plugins/khuym
   ```

5. Sau khi cài xong, mở session Codex mới trong chính repo:

   ```text
   /var/www/khuym-skills
   ```

# Bootstrap next step

Bước tiếp theo để bắt đầu workflow là nói với Codex:

```text
Use khuym:using-khuym for this repository and bootstrap the workflow.
```

Nếu muốn nói ngắn gọn hơn theo ý của bạn:

```text
Dùng Khuym cho repo này và bắt đầu từ using-khuym.
```
