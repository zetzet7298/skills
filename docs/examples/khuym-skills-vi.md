# Hướng dẫn tiếng Việt: cách dùng toàn bộ skill trong repo Khuym

Tài liệu này giải thích cách dùng toàn bộ skill canonical nằm trong `plugins/khuym/skills/`.

Các bundle theo platform như `plugins/khuym-droid/`, `plugins/khuym-kiro/`, `plugins/khuym-opencode/`, `plugins/khuym-gemini-cli/` chỉ là bản mirror để cài theo runtime. Nguồn chuẩn để hiểu skill vẫn là cây `plugins/khuym/skills/`.

## Cách gọi skill theo platform

- **Codex / Factory Droid**: skill thường được gọi với prefix `khuym:`  
  Ví dụ: `khuym:setup-khuym`, `khuym:project-bootstrap`, `khuym:using-khuym`
- **Kiro / Antigravity / Pi / OpenCode / Gemini CLI**: thường dùng tên trần  
  Ví dụ: `setup-khuym`, `project-bootstrap`, `using-khuym`

## Luồng khuyến nghị

### 1. Cài và chọn platform

Nếu chưa cài Khuym cho runtime hiện tại, bắt đầu bằng:

- `setup-khuym`

Skill này giúp:

- chọn platform phù hợp
- chọn scope cài đặt
- đưa ra lệnh cài đúng
- route sang bước tiếp theo sau khi cài xong

### 2. Khởi tạo initiative trước Khuym

Nếu đây là initiative mới, repo greenfield, hoặc brownfield cần research và roadmap trước khi vào Khuym:

1. `project-bootstrap`
2. `project-roadmap`

Hai skill này tạo artifact dưới:

`history/bootstrap/<initiative-slug>/`

Bao gồm:

- `INITIATIVE.md`
- `RESEARCH-BRIEF.md`
- `ROADMAP.md`
- `KHUYM-HANDOFF.md`

### 3. Vào Khuym proper

Khi initiative đã được framing đủ rõ để đi vào workflow Khuym:

1. `using-khuym`
2. `exploring`
3. `planning`
4. `validating`
5. `swarming`
6. `executing`
7. `reviewing`
8. `compounding`

## Bảng toàn bộ skill

## Nhóm cài đặt và vào hệ thống

| Skill | Dùng khi nào | Kết quả chính |
|---|---|---|
| `setup-khuym` | Khi cần cài Khuym, chọn platform, hoặc chọn scope cài | Platform sẵn sàng, route sang front stage hoặc `using-khuym` |
| `using-khuym` | Khi đã sẵn sàng đi vào workflow Khuym | Scout repo, chọn mode, route sang skill tiếp theo |

## Nhóm front stage trước Khuym

| Skill | Dùng khi nào | Kết quả chính |
|---|---|---|
| `project-bootstrap` | Khi bắt đầu initiative mới, greenfield, hoặc brownfield cần framing | Viết `INITIATIVE.md` và `RESEARCH-BRIEF.md` |
| `project-roadmap` | Khi đã có bootstrap artifacts và cần roadmap trước khi vào Khuym | Viết `ROADMAP.md` và `KHUYM-HANDOFF.md` |

### Khi nào nên dùng front stage

Nên dùng `project-bootstrap -> project-roadmap` nếu:

- bài toán còn mơ hồ ở level initiative
- chưa rõ scope v1
- repo brownfield có nhiều reuse/risk chưa map
- cần chốt hướng đi trước khi bẻ nhỏ thành feature Khuym

Không cần front stage nếu:

- bạn đã có framing rõ
- feature slice đã đủ rõ để đi thẳng vào `using-khuym`

## Nhóm Khuym core

| Skill | Dùng khi nào | Kết quả chính |
|---|---|---|
| `exploring` | Khi feature còn gray areas hoặc cần khóa quyết định | Viết `history/<feature>/CONTEXT.md` |
| `planning` | Khi `CONTEXT.md` đã đủ rõ và cần phase plan + current phase prep | Viết `discovery.md`, `approach.md`, `phase-plan.md`, contract/story map, beads |
| `validating` | Khi current phase đã được plan và cần execution gate | Verify phase, spike risky items, chặn execution nếu chưa sẵn sàng |
| `swarming` | Khi phase đã được validate và cần chạy nhiều worker | Orchestrate worker qua Agent Mail và bead graph |
| `executing` | Khi agent đang đóng vai worker thực thi bead | Claim file, implement, verify, close bead |
| `reviewing` | Khi implementation xong và cần quality gate | Review findings P1/P2/P3, UAT, merge gate |
| `compounding` | Khi feature đã xong và cần rút kinh nghiệm | Viết learnings vào `history/learnings/` |

## Nhóm research, context, và discovery support

| Skill | Dùng khi nào | Kết quả chính |
|---|---|---|
| `xia` | Khi cần research-first discovery trước khi build | Research brief kiểu `Local / Upstream / Docs / Inference` |
| `bootstrap-project-context` | Khi cần onboard một repo lạ hoặc viết prompt bootstrap cho repo | Repo orientation summary hoặc prompt bootstrap |
| `gkg` | Khi gkg MCP đã sẵn sàng và cần intelligence về codebase | Repo map, definitions, symbol trace |
| `prompt-leverage` | Khi user có prompt thô và muốn nâng cấp thành prompt chạy được | Prompt mạnh hơn, rõ hơn, execution-ready |

## Nhóm maintenance, recovery, và meta-workflow

| Skill | Dùng khi nào | Kết quả chính |
|---|---|---|
| `debugging` | Khi worker hoặc workflow bị block do lỗi build/test/runtime/integration | Root-cause analysis và hướng fix |
| `dream` | Khi cần consolidation pass trên learnings / Codex artifacts | Cập nhật learnings và gợi ý promote critical patterns |
| `writing-khuym-skills` | Khi tạo skill Khuym mới hoặc sửa skill hiện có | Skill theo RED -> GREEN -> REFACTOR cùng pressure testing |
| `refresh-project-docs` | Khi cần refresh docs/README cho repo sau thay đổi | Docs hiện trạng, không còn stale |

## Nhóm specialized / ít gặp hơn

| Skill | Dùng khi nào | Kết quả chính |
|---|---|---|
| `book-sft-pipeline` | Khi làm SFT dataset từ sách, ePub, hoặc fine-tune style từ long-form books | Pipeline tách sách, segment dữ liệu, chuẩn bị training input |

## Cách chọn skill nhanh

### Trường hợp 1: chưa cài runtime

- `setup-khuym`

### Trường hợp 2: initiative mới hoàn toàn

- `project-bootstrap`
- `project-roadmap`
- `using-khuym`

### Trường hợp 3: feature đã khá rõ, chỉ muốn vào Khuym

- `using-khuym`

### Trường hợp 4: repo lạ, chưa hiểu gì

- `bootstrap-project-context`
hoặc
- `xia`

### Trường hợp 5: đang kẹt lỗi

- `debugging`

### Trường hợp 6: muốn review chất lượng sau khi code xong

- `reviewing`

### Trường hợp 7: muốn tạo hoặc sửa skill Khuym

- `writing-khuym-skills`

## Hai ví dụ thực tế

## Ví dụ A: repo greenfield

1. `setup-khuym`
2. `project-bootstrap`
3. `project-roadmap`
4. `using-khuym`
5. `exploring`
6. `planning`
7. `validating`
8. `swarming` / `executing`
9. `reviewing`
10. `compounding`

## Ví dụ B: repo brownfield đã có request khá rõ

1. `setup-khuym` nếu chưa cài
2. `project-bootstrap` nếu cần brownfield scan và roadmap trước
3. `project-roadmap`
4. `using-khuym`
5. `exploring`
6. các bước còn lại

Nếu bài toán đã framed rất rõ từ đầu, có thể bỏ qua front stage và vào:

- `using-khuym`

## Nguyên tắc nhớ nhanh

- `setup-khuym` = cài và route
- `project-bootstrap` = khởi tạo initiative
- `project-roadmap` = chọn đường đi và first slice
- `using-khuym` = vào Khuym proper
- `exploring -> planning -> validating -> swarming/executing -> reviewing -> compounding` = chain chính
- `xia`, `bootstrap-project-context`, `gkg` = hỗ trợ research và repo understanding
- `debugging`, `dream`, `writing-khuym-skills`, `refresh-project-docs` = nhóm support/meta

## File và artifact quan trọng cần nhớ

### Front stage

- `history/bootstrap/<initiative>/INITIATIVE.md`
- `history/bootstrap/<initiative>/RESEARCH-BRIEF.md`
- `history/bootstrap/<initiative>/ROADMAP.md`
- `history/bootstrap/<initiative>/KHUYM-HANDOFF.md`

### Khuym proper

- `history/<feature>/CONTEXT.md`
- `history/<feature>/discovery.md`
- `history/<feature>/approach.md`
- `history/<feature>/phase-plan.md`
- `.khuym/state.json`
- `.khuym/STATE.md`
- `.khuym/HANDOFF.json`

## Kết luận

Nếu cần nhớ ngắn nhất, hãy dùng công thức này:

```text
Cài runtime -> setup-khuym
Initiative mới -> project-bootstrap -> project-roadmap
Vào Khuym -> using-khuym
Chạy chain -> exploring -> planning -> validating -> swarming/executing -> reviewing -> compounding
```

Đó là cách dùng toàn bộ skill chính trong repo này theo best practice hiện tại.
