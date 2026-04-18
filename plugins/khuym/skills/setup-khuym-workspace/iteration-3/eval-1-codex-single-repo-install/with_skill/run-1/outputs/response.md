# Chosen platform

- **Codex**
- Vì bạn nói rõ muốn dùng Khuym **trong Codex** và **chỉ cho repo này**, lựa chọn hợp lý nhất là cài plugin `khuym` vào Codex qua local marketplace của chính repo hiện tại.

# Chosen scope

- **Install scope:** mức runtime/user của Codex.  
  Phần cài đặt này chỉ làm cho plugin xuất hiện trong Codex, không gắn riêng vào một repo duy nhất.
- **Repo onboarding scope:** chỉ repo hiện tại là `/var/www/khuym-skills`.  
  Khi bạn bắt đầu workflow, Khuym sẽ ghi state/onboarding cục bộ trong repo này.

Tóm lại: **platform install** làm Khuym khả dụng trong Codex, còn **repo onboarding** mới là bước chuẩn bị riêng cho repo này để đi vào workflow.

# Install steps

1. Trong Codex, thêm marketplace file của repo này:

   ```text
   /var/www/khuym-skills/.agents/plugins/marketplace.json
   ```

2. Nếu Codex chưa hiện marketplace mới ngay, hãy restart Codex.

3. Trong Codex, cài plugin **`khuym`** từ marketplace vừa thêm.

# Bootstrap next step

1. Skill cần chạy tiếp theo là **`khuym:using-khuym`**.
2. Cài plugin **không đồng nghĩa** với việc repo đã được onboard; `khuym:using-khuym` mới là bước bootstrap Khuym cho `/var/www/khuym-skills`.
3. Để bắt đầu workflow, mở session Codex ở repo này rồi yêu cầu:

   ```text
   Dùng khuym:using-khuym cho repo này để bắt đầu workflow.
   ```

4. Sau đó Khuym sẽ route sang các bước tiếp theo khi phù hợp:
   `exploring → planning → validating → swarming → executing → reviewing → compounding`.
