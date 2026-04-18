# Anti-AI Vietnamese checklist

Run this checklist on every Redmine subject, description, comment, and time-log note before sending.

The goal is not literary writing. The goal is internal team text that sounds like a real teammate wrote it.

## Keep

- direct wording
- concrete nouns and verbs
- short sentences when possible
- operational details that help the next reader
- uncertainty only when it is real

## Remove

- inflated phrases like `tối ưu trải nghiệm`, `nâng cao hiệu quả`, `giải pháp toàn diện`
- vague filler like `nhằm đảm bảo`, `góp phần`, `mang lại giá trị`
- translated stiffness like `thực hiện việc`, `tiến hành triển khai`, `trong bối cảnh hiện tại`
- fake certainty when the bead evidence is partial
- summary lines that say nothing concrete

## Rewrite patterns

### 1. Replace abstract claims with concrete actions

Bad:

`Cập nhật giải pháp nhằm tối ưu luồng xử lý dữ liệu.`

Better:

`Cập nhật logic xử lý timestamp để tránh ghi đè dữ liệu cũ.`

### 2. Remove promotional tone

Bad:

`Đây là bước cải tiến quan trọng giúp hệ thống vận hành hiệu quả hơn.`

Better:

`Bước này giúp tránh lỗi cập nhật sai thời điểm của message.`

### 3. Prefer team language over translated formality

Bad:

`Tiến hành triển khai điều chỉnh theo yêu cầu đã được xác lập.`

Better:

`Đã chỉnh lại theo yêu cầu đã chốt.`

### 4. Keep comments short

Bad:

`Đã hoàn tất việc thực hiện các nội dung cần thiết liên quan đến đầu việc này.`

Better:

`Đã cập nhật logic fallback và kiểm tra lại case lỗi cũ.`

### 5. Keep time-log notes factual

Bad:

`Thực hiện hoạt động hỗ trợ tối ưu hóa và hoàn thiện luồng xử lý.`

Better:

`Rà soát và sửa luồng xử lý redirect sau khi session hết hạn.`

## Final pass questions

Before sending, ask:

1. Nếu đồng đội đọc ticket này sau 2 tuần, họ có hiểu mình đã làm gì không?
2. Có câu nào nghe giống copywriter hoặc máy dịch không?
3. Có chỗ nào đang nói chung chung thay vì nói đúng hành động không?
4. Có chi tiết nào cần giữ lại để trace về bead hoặc bug cũ không?

If the answer to `2` or `3` is yes, rewrite once more.
