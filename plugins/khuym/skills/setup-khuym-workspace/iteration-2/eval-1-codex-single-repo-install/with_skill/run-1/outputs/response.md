# Chosen platform

- **Codex**
- Vì bạn muốn dùng Khuym **trong Codex** và **chỉ cho repo này**, lựa chọn phù hợp nhất là cài plugin `khuym` vào Codex qua local marketplace của chính repo hiện tại.

# Chosen scope

- **Install scope:** mức runtime/user của Codex  
  Codex cài plugin ở mức công cụ, không gắn riêng cho từng repo.
- **Repo onboarding scope:** chỉ **repo hiện tại**  
  Sau khi cài plugin, phần onboarding của Khuym vẫn sẽ ghi state cục bộ trong repo này khi bạn bắt đầu workflow.

# Install steps

1. Trong Codex, thêm marketplace file của repo này:

   ```text
   /var/www/khuym-skills/.agents/plugins/marketplace.json
   ```

2. Nếu Codex chưa hiện marketplace mới, hãy restart Codex.

3. Trong Codex, cài plugin **`khuym`** từ marketplace vừa thêm.

# Bootstrap next step

1. Skill cần chạy tiếp theo là **`khuym:using-khuym`**.
2. Cài plugin **không đồng nghĩa** với onboarding repo; `using-khuym` mới là bước bootstrap Khuym cho repo này.
3. Để bắt đầu workflow, vào session Codex ở repo này rồi yêu cầu:

   ```text
   Dùng khuym:using-khuym cho repo này để bắt đầu workflow.
   ```

4. Sau đó `using-khuym` sẽ route sang các bước tiếp theo khi phù hợp, thường là:
   `exploring → planning → validating → swarming → executing → reviewing → compounding`.
