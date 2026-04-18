# Chosen platform

Mình chọn **Kiro** cho trường hợp này. Với nhu cầu dùng Khuym cho **một repo nội bộ duy nhất**, Kiro hợp hơn vì nó có **scope `workspace`** nên bạn có thể cài hẹp đúng repo đang làm, thay vì cài kiểu runtime-level như **Factory Droid** rồi mới onboard repo sau.

# Chosen scope

- **Install scope:** `workspace`
- **Repo onboarding scope:** `project` (repo hiện tại)

Phân biệt ngắn gọn:

- **`project`**: phạm vi **repo onboarding** — lúc bắt đầu Khuym, nó sẽ ghi state/artifact vào **repo hiện tại**.
- **`workspace`**: phạm vi **cài Kiro** chỉ cho **workspace/repo hiện tại**.
- **`global`**: phạm vi **cài Kiro** cho **nhiều repo** trên máy của bạn.

Với bài toán của bạn, lựa chọn đúng là:

- cài **Kiro ở scope `workspace`**
- rồi để **Khuym onboard ở scope `project`** cho repo nội bộ này

Factory Droid vẫn dùng được, nhưng trong repo này nó phù hợp hơn khi bạn muốn Khuym sẵn ở mức tool/runtime cho nhiều repo, không phải tối ưu nhất cho case một repo.

# Install steps

Chạy từ root của repo:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope workspace --repo-root /absolute/path/to/repo
```

Nếu sau này bạn muốn dùng Khuym cho nhiều repo, lúc đó mới cân nhắc `global`:

```bash
node plugins/khuym-kiro/scripts/install_khuym_kiro.mjs --scope global
```

# Bootstrap next step

Sau khi cài xong, load skill **`using-khuym`**.

Cài platform **không đồng nghĩa** với onboard repo: cài xong mới bắt đầu bước Khuym chuẩn bị state/workflow cho repo hiện tại.
