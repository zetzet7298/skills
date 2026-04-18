# Chosen platform

Chọn **Kiro**.

Với nhu cầu dùng Khuym cho **một repo nội bộ**, Kiro phù hợp hơn vì nó hỗ trợ **cài theo workspace** — tức là gắn vào đúng repo/workspace đang làm. So với Factory Droid (thiên về plugin ở mức runtime/user), Kiro cho bài toán một-repo gọn hơn và ít “mở rộng phạm vi” hơn.

# Chosen scope

- **Install scope:** **workspace**
- **Repo onboarding scope:** **project/repo-local**

Giải thích khác nhau:

- **Project / repo onboarding scope**: là các file Khuym sẽ ghi vào **chính repo hiện tại** khi bắt đầu workflow (ví dụ trạng thái, handoff, artifact trong repo). Cái này là phạm vi của **repo**.
- **Workspace scope**: là cách **cài Kiro bundle cho đúng workspace/repo hiện tại**. Phù hợp khi bạn chỉ muốn dùng Khuym cho một repo nội bộ.
- **Global scope**: là cài Khuym để dùng lại cho **nhiều repo** trong Kiro trên máy đó.
- **Factory Droid** trong ngữ cảnh này không có lựa chọn project/workspace/global theo kiểu Kiro; plugin của nó về bản chất là **runtime-level/user-level**, còn onboarding Khuym vẫn là **repo-local** khi workflow bắt đầu.

=> Nếu mục tiêu là **chỉ một repo**, chọn **Kiro + workspace** là hợp lý nhất.

# Install steps

Cài theo **workspace** cho repo hiện tại:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /var/www/khuym-skills
```

Nếu bạn muốn dùng qua Kiro UI thay vì chỉ installer:

- Trong Kiro, thêm một Power từ local path
- Chọn thư mục: `plugins/khuym-kiro/`

Nếu sau này muốn mở rộng cho nhiều repo, khi đó mới cân nhắc **global**:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

# Bootstrap next step

Skill cần chạy tiếp theo là **`using-khuym`**.

Cài platform xong **không có nghĩa là repo đã được onboard**; bước onboarding workflow vẫn diễn ra sau đó qua `using-khuym`.
