# Chosen platform

**Kiro** cho trường hợp này.

Với nhu cầu chỉ dùng cho **một repo nội bộ** và **chưa cần cài ngay**, Kiro hợp hơn Codex vì nó hỗ trợ cách nghĩ theo **workspace scope** rõ ràng hơn: bật Khuym cho đúng workspace hiện tại thay vì nghiêng về một plugin mang tính runtime-level như Codex. Nói ngắn gọn: nếu mục tiêu là một repo cụ thể, Kiro là lựa chọn hẹp và khớp nhu cầu hơn.

# Chosen scope

- **Install scope:** nên nghĩ theo **workspace** cho 1 repo này; chỉ khi muốn dùng Khuym cho nhiều repo mới nên chuyển sang **global**.  
- **Repo onboarding scope:** vẫn là **repo-local**. Nghĩa là dù chọn Kiro hay Codex, phần onboarding workflow sau đó vẫn ghi state/file vào chính repo này, không phải “cài global là xong repo”.

Tóm lại:
- **workspace** = bật Khuym cho đúng repo/workspace đang làm
- **global** = làm Khuym sẵn sàng cho nhiều workspace về sau
- **repo onboarding** = bước riêng để chuẩn bị repo hiện tại cho workflow, tách biệt với chuyện cài platform
