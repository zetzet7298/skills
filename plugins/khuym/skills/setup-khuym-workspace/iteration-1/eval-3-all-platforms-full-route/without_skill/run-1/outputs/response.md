# Cài Khuym trên cả Codex, Factory Droid và Kiro

Mình tách làm 2 lớp để khỏi nhầm:

- **Platform install**: cài plugin/bundle để runtime thấy Khuym.
- **Repo bootstrap**: sau khi cài xong, chạy `using-khuym` để onboard repo và đi vào full workflow.

---

## 1) Codex

### Cài plugin
1. Clone repo này nếu máy bạn chưa có:

```bash
git clone https://github.com/hoangnb24/skills.git
cd skills
```

2. Trong Codex, thêm local marketplace bằng file:

```text
/var/www/khuym-skills/.agents/plugins/marketplace.json
```

3. Nếu Codex chưa hiện marketplace mới thì restart Codex.
4. Cài plugin **`khuym`** từ marketplace đó.

### Sau khi cài xong
Bắt đầu bằng skill:

```text
khuym:using-khuym
```

---

## 2) Factory Droid

### Cài plugin
Từ repo root:

```bash
droid plugin marketplace add "/var/www/khuym-skills"
droid plugin install "khuym@khuym-skills"
droid plugin list
```

### Sau khi cài xong
Bắt đầu bằng skill:

```text
khuym:using-khuym
```

---

## 3) Kiro

Repo này hỗ trợ Kiro bằng **bundled installer** hoặc **Local Path Power**.

### Cách chuẩn: installer

#### Workspace scope
Dùng khi bạn muốn cài cho một repo/workspace cụ thể:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /duong/dan/toi/repo
```

#### Global scope
Dùng khi bạn muốn Khuym có sẵn ở mức user:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

### Cách UI tùy chọn
Trong Kiro, thêm Power từ **Local Path** và chọn thư mục:

```text
/var/www/khuym-skills/plugins/khuym-kiro/
```

> Lưu ý: repo này **không** hỗ trợ one-click GitHub Power install cho Kiro trong layout hiện tại.

### Sau khi cài xong
Bắt đầu bằng skill:

```text
using-khuym
```

---

# Bước bootstrap để vào full workflow

Sau khi cài xong trên từng platform, bước tiếp theo luôn là **load `using-khuym`**.

## Codex
- Gọi `khuym:using-khuym`
- Skill này sẽ kiểm tra Node.js, kiểm tra repo đã onboard chưa, rồi chạy flow bootstrap.
- Scout tiếp theo thường là:

```bash
node .codex/khuym_status.mjs --json
```

## Factory Droid
- Gọi `khuym:using-khuym`
- Skill sẽ kiểm tra/onboard repo cho Droid.
- Scout tiếp theo thường là:

```bash
node .factory/khuym_status.mjs --json
```

## Kiro
- Gọi `using-khuym`
- Skill sẽ kiểm tra/onboard repo cho Kiro.
- Scout tiếp theo thường là:

```bash
node .kiro/khuym_status.mjs --json
```

---

# Full workflow sau bootstrap

Sau `using-khuym`, route chuẩn là:

```text
using-khuym
→ exploring
→ planning
→ validating
→ swarming
→ executing
→ reviewing
→ compounding
```

Nếu bạn muốn đi thẳng vào full workflow ngay sau khi cài, câu lệnh/ý định tiếp theo là:

- **Codex / Factory Droid**: `khuym:using-khuym`
- **Kiro**: `using-khuym`

Rồi để nó bootstrap repo và handoff sang phần còn lại của chain.
