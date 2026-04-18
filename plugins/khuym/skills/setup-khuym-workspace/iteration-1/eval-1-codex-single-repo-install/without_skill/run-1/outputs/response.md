# Cài Khuym cho riêng repo này trong Codex

Với nhu cầu **chỉ dùng cho repo này**, scope hợp lý nhất là **cài plugin `khuym` từ local marketplace của chính repo hiện tại**, không cần làm global hay sync sang tool khác.

## Cách cài trong Codex

Repo này đã có sẵn marketplace và plugin manifest:

- Marketplace: `/var/www/khuym-skills/.agents/plugins/marketplace.json`
- Plugin: `/var/www/khuym-skills/plugins/khuym`

Trong Codex, thêm local marketplace bằng đường dẫn:

```text
/var/www/khuym-skills/.agents/plugins/marketplace.json
```

Sau đó:

1. Mở danh sách plugin/marketplace trong Codex
2. Chọn marketplace vừa thêm
3. Cài plugin **`khuym`**
4. Nếu Codex chưa hiện ngay, restart Codex rồi kiểm tra lại

## Lưu ý quan trọng

Có **2 bước khác nhau**:

1. **Install plugin vào Codex** → để Codex biết và dùng được Khuym
2. **Onboard repo vào workflow Khuym** → để bắt đầu chain làm việc cho chính repo này

Bạn đang hỏi cho **repo này thôi**, nên ở bước cài đặt chỉ cần local marketplace ở trên là đủ.

## Bước tiếp theo để bắt đầu workflow

Sau khi cài plugin xong, mở một session Codex mới ngay trong repo này và bắt đầu bằng:

```text
Dùng khuym:using-khuym cho repo này và bootstrap workflow giúp tôi.
```

Nếu muốn đi luôn full flow cho một yêu cầu cụ thể, có thể nói thẳng kiểu:

```text
Dùng khuym:using-khuym rồi đưa request này vào workflow Khuym: <mô tả bài toán>
```
