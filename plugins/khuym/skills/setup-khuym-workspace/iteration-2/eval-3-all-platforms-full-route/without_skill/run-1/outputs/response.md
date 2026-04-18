# Cài Khuym trên cả Codex, Factory Droid và Kiro

## Phạm vi
- **Cài plugin/bundle ở cả 3 runtime**: Codex, Factory Droid, Kiro.
- **Bootstrap workflow cho repo hiện tại** là bước riêng, làm **sau khi cài xong**.

## Các bước cài đặt

### 1) Codex
1. Clone repo này về máy nếu bạn chưa có:
   ```bash
   git clone https://github.com/hoangnb24/skills.git
   cd skills
   ```
2. Trong Codex, thêm marketplace của repo này:
   ```text
   /absolute/path/to/skills/.agents/plugins/marketplace.json
   ```
3. Nếu Codex chưa hiện marketplace mới, restart Codex.
4. Cài plugin **`khuym`** từ marketplace đó.

### 2) Factory Droid
Từ root của repo:

```bash
droid plugin marketplace add "/absolute/path/to/skills"
droid plugin install "khuym@khuym-skills"
droid plugin list
```

### 3) Kiro
Repo này hỗ trợ Kiro qua **bundled installer** hoặc **Local Path Power**.

#### Cài theo workspace
```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /absolute/path/to/repo
```

#### Hoặc cài global
```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

#### Hoặc qua Kiro UI
- Trong Kiro, thêm Power từ **Local Path**
- Chọn thư mục:
  ```text
  /absolute/path/to/skills/plugins/khuym-kiro
  ```

## Bước bootstrap để vào full workflow
Sau khi cài xong trên các runtime, bước tiếp theo là:

### Bootstrap
- **Codex / Factory Droid:** load skill **`khuym:using-khuym`**
- **Kiro:** load skill **`using-khuym`**

Skill này sẽ:
1. kiểm tra repo đã onboard Khuym chưa,
2. chạy bootstrap/onboarding nếu còn thiếu,
3. dựng các file trạng thái như `.khuym/`, `AGENTS.md`, và script hỗ trợ runtime.

## Route full workflow sau bootstrap
Sau `using-khuym`, Khuym sẽ đi vào full workflow:

```text
exploring → planning → validating → swarming → executing → reviewing → compounding
```

## Tóm tắt ngắn
- **Cài trước**: Codex plugin, Factory Droid plugin, Kiro bundle/Power.
- **Bootstrap sau**: chạy **`using-khuym`**.
- **Full workflow** bắt đầu từ bootstrap rồi route sang chuỗi Khuym đầy đủ.
