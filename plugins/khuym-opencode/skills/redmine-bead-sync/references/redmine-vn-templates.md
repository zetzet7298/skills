# Redmine Vietnamese templates

Use these templates after the human has chosen a mapping.

Do not paste them blindly. Fill them with bead evidence, then run the anti-AI cleanup pass.

## Subject template

Good subject shape:

```text
[<feature hoặc nhóm việc>] <việc cụ thể cần làm>
```

Examples:

- `[Sync lịch sử chat] Chuẩn hóa timestamp fallback cho inbound message`
- `[Đăng nhập SSO] Sửa lỗi redirect lặp khi session hết hạn`
- `[Báo cáo tuần] Bổ sung export CSV cho danh sách ticket`

Rules:

- keep it short
- start with the real task, not a slogan
- avoid vague subjects like `Tối ưu`, `Nâng cấp`, `Cải thiện hệ thống`

## Description template

```markdown
## Bối cảnh
- <Vấn đề hoặc nhu cầu thực tế>

## Mục tiêu
- <Kết quả cần đạt>

## Phạm vi thực hiện
- <Những gì nằm trong bead này>

## Tiêu chí hoàn thành
- <Điều kiện kiểm chứng ngắn gọn>

## Phụ thuộc / liên quan
- <bead IDs, issue cha, phụ thuộc kỹ thuật nếu có>

## Ghi chú truy vết
- Nguồn sync: <br-xxx / nhóm bead>
```

Guidance:

- Use bullets for readability.
- Keep each bullet concrete.
- If the bead already contains acceptance criteria, preserve them in short Vietnamese.
- If there is no real dependency, say nothing instead of inventing one.

## Comment template

Use comments for progress or sync notes:

```markdown
Đã đồng bộ từ bead `<br-xxx>`.

- Trạng thái hiện tại: <đã làm / đang làm / còn chờ>
- Điểm chính: <1-2 ý ngắn>
- Lưu ý: <rủi ro hoặc blocker nếu có>
```

If the comment is only a quick update, shorten it:

```text
Đã cập nhật theo bead <br-xxx>: <ý chính>.
```

## Time log template

Time-log note should be short and operational:

```text
Thực hiện <việc cụ thể> theo bead <br-xxx>.
```

Examples:

- `Thực hiện chuẩn hóa timestamp fallback theo bead br-142.`
- `Kiểm tra và cập nhật mapping issue cha/con theo bead br-318.`
- `Rà soát logic login và ghi chú blocker theo bead br-455.`

## Update template

When updating an existing Redmine issue, keep the delta clear:

```markdown
## Nội dung cập nhật
- <field hoặc tiến độ đã thay đổi>

## Lý do cập nhật
- <liên hệ với bead hoặc quyết định mới>

## Truy vết
- bead: <br-xxx>
```

## Style rules

- Prefer plain Vietnamese used by internal teams.
- Keep English technical terms only when they improve traceability.
- Keep bead IDs and exact identifiers when they matter operationally.
- Avoid decorative intros, sales language, and generic conclusions.
