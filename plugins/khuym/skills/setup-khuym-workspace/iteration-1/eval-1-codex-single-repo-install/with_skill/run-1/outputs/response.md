# Chọn nền tảng

- **Nền tảng:** `Codex`
- **Vì sao:** bạn nói rõ muốn dùng Khuym trong **Codex** và chỉ cho **repo này**, nên phương án gọn nhất là cài plugin Khuym vào Codex rồi onboard đúng repo hiện tại.

## Chọn scope

- **Scope phù hợp nhất:** dùng cho **repo hiện tại**
- **Lưu ý quan trọng:** với Codex, phần **cài plugin** là ở mức runtime/user của Codex, nhưng phần **onboarding Khuym** vẫn ghi trạng thái vào chính repo này. Nói ngắn gọn:
  - **Platform install** = làm cho Khuym xuất hiện trong Codex
  - **Repo onboarding** = chuẩn bị repo này để chạy workflow Khuym

## Các bước cài

### 1) Trỏ Codex tới marketplace của repo này

Thêm file marketplace sau vào Codex:

```text
/var/www/khuym-skills/.agents/plugins/marketplace.json
```

Nếu Codex cần đường dẫn repo gốc để nhận plugin local, dùng:

```text
/var/www/khuym-skills
```

### 2) Khởi động lại Codex nếu cần

Sau khi add marketplace local, restart Codex nếu plugin chưa hiện ra ngay.

### 3) Cài plugin `khuym`

Trong Codex marketplace, cài plugin **`khuym`** từ marketplace vừa thêm.

## Bước tiếp theo để bắt đầu workflow

Sau khi cài xong, bước tiếp theo là **load skill `using-khuym`** trong repo này.

Sau đó workflow sẽ bắt đầu theo chuỗi:

```text
using-khuym → exploring → planning → validating → swarming → executing → reviewing → compounding
```

Nếu bạn muốn bắt đầu ngay cho repo này, câu lệnh/ý định tiếp theo nên là:

```text
Use khuym:using-khuym for this repo
```
