# Khuyến nghị: chọn **Kiro (scope: workspace)** cho **một repo nội bộ**

Nếu mục tiêu của bạn là dùng Khuym cho **đúng 1 repo nội bộ**, mình sẽ chọn **Kiro với scope `workspace`** thay vì Factory Droid.

## Vì sao chọn Kiro ở case này?

- **Fit hơn với phạm vi 1 repo**: Kiro có scope `workspace`, tức là cài theo đúng repo/workspace hiện tại.
- **Boundary rõ hơn**: bạn tách được rất rõ phần nào là **cài platform**, phần nào là **onboard repo Khuym**.
- **Ít “tràn” ra môi trường chung** hơn so với Factory Droid, vì Factory Droid trong repo này là kiểu cài ở mức runtime/user, không phải riêng từng repo.

## Kiro vs Factory Droid trong bài toán này

### Kiro
- Hỗ trợ **`workspace`** và **`global`**.
- Với **1 repo**, bạn chọn `workspace` là gọn nhất.
- Cài xong Kiro bundle xong thì **repo vẫn cần onboarding Khuym riêng** khi bắt đầu workflow.

### Factory Droid
- Phù hợp nếu bạn đã xác định dùng Factory Droid như platform chính lâu dài.
- Nhưng trong repo này, plugin install của Droid là **runtime-level** hơn là repo-level.
- Nghĩa là với nhu cầu **chỉ 1 repo**, nó không “khít scope” bằng Kiro `workspace`.

## `project` / `workspace` / `global` khác nhau thế nào?

### `project`
Đây là **phạm vi của chính repo đang chạy Khuym**.

Nói đơn giản: sau khi bạn đã cài platform, lúc bắt đầu dùng Khuym thì repo sẽ được onboard và sinh ra các file/state **nằm trong repo** (ví dụ `.khuym/`, `AGENTS.md`, và các file support theo platform).

=> **`project` là phạm vi dữ liệu/trạng thái của repo**, không phải nơi cài plugin/platform.

### `workspace`
Đây là **scope cài đặt của Kiro cho repo hiện tại**.

Với Kiro, `workspace` nghĩa là bundle được cài vào `.kiro/` của repo đang làm việc, nên chỉ workspace đó dùng Khuym theo cấu hình này.

=> **Dùng khi bạn chỉ muốn Khuym cho một repo cụ thể.**

### `global`
Đây là **scope cài đặt dùng chung cho nhiều repo**.

Với Kiro, `global` nghĩa là cài vào `~/.kiro/`, để nhiều workspace/repo trên máy đều có thể dùng chung bundle đó.

=> **Dùng khi bạn muốn bật Khuym mặc định cho nhiều repo**, không chỉ một repo.

## Boundary đúng nên hiểu là gì?

Có 2 lớp tách biệt:

1. **Platform install**
   - Kiro: cài bundle vào `workspace` hoặc `global`
   - Factory Droid: cài plugin vào Droid runtime

2. **Repo onboarding**
   - Sau khi platform đã có Khuym, repo cụ thể vẫn cần đi qua bước bootstrap/onboarding để tạo state Khuym trong repo.
   - Tức là: **cài platform xong chưa có nghĩa là repo đã onboard xong**.

## Lệnh nên dùng cho case của bạn

Nếu repo nội bộ của bạn nằm ở `/absolute/path/to/repo`, lệnh phù hợp là:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /absolute/path/to/repo
```

## Kết luận ngắn

- **Một repo nội bộ duy nhất** → chọn **Kiro + `workspace`**.
- **Nhiều repo / muốn dùng rộng trên máy** → mới cân nhắc **Kiro `global`** hoặc chuẩn hóa sang **Factory Droid**.
- Và nhớ rằng **platform install** với **repo onboarding** là 2 bước khác nhau: cài xong platform thì repo vẫn cần bootstrap Khuym riêng.
