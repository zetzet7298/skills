# Chọn platform

Mình khuyên bạn chọn **Kiro (scope: workspace)** cho bài toán **dùng Khuym cho một repo nội bộ**.

**Vì sao:**
- Nhu cầu của bạn là **một repo cụ thể**, nên Kiro `workspace` là lựa chọn hẹp và đúng ngữ cảnh nhất.
- Nó giúp bật Khuym cho **workspace/repo hiện tại** thay vì mở rộng ra mọi nơi.
- So với đó, **Factory Droid** trong repo này cài theo kiểu **runtime/user-level**, tức là plugin khả dụng cho toàn bộ Droid, còn phần “gắn với repo nào” chỉ xảy ra ở bước onboarding sau.

## Khác nhau giữa project / workspace / global

Cần tách rõ **platform install** và **repo onboarding**:

- **Platform install**: làm cho skill Khuym xuất hiện trong tool.
- **Repo onboarding**: khi bạn chạy `using-khuym`, Khuym mới ghi state/file vào repo hiện tại.

### Với Kiro
- **Workspace**: cài cho **workspace/repo hiện tại**. Đây là lựa chọn phù hợp nhất nếu bạn chỉ dùng Khuym cho một repo nội bộ.
- **Global**: cài cho **mọi workspace** trong Kiro trên máy đó. Hợp khi bạn muốn dùng Khuym lặp lại trên nhiều repo.

### Với Factory Droid
- Trong repo này, Factory Droid **không có tách biệt project/workspace/global như Kiro** ở bước plugin install.
- Cài plugin là ở mức **runtime/user-level** của Droid.
- Nhưng sau đó, khi bắt đầu workflow bằng `using-khuym`, phần onboarding vẫn là **repo-local** cho repo bạn đang làm.

## Scope mình chọn

Mình chọn **Kiro + workspace**.

Đây là scope hợp lý nhất vì:
- bạn chỉ nói đến **một repo nội bộ**
- nó là lựa chọn **nhỏ nhất đủ dùng**
- tránh biến Khuym thành mặc định cho mọi workspace nếu bạn chưa chắc cần

## Cách cài

Từ root của repo skills này, chạy:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /absolute/path/to/repo
```

Nếu bạn muốn cài rộng cho mọi workspace về sau thì mới dùng:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

## Nếu vẫn muốn dùng Factory Droid

Cách cài là:

```bash
droid plugin marketplace add "/absolute/path/to/skills"
droid plugin install "khuym@khuym-skills"
droid plugin list
```

Lựa chọn này hợp hơn khi bạn muốn **dùng Factory Droid như runtime chính** trên nhiều repo, hơn là chỉ nhắm một workspace duy nhất.

## Bước tiếp theo sau khi cài

Sau khi cài xong, bước tiếp theo vẫn là **load `using-khuym`**.

Nói ngắn gọn:
- **muốn tối ưu cho 1 repo nội bộ** → chọn **Kiro workspace**
- **muốn Khuym sẵn trong Droid cho nhiều repo hơn** → chọn **Factory Droid**
