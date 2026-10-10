# 输入

输入模块通过 `.continue-harness/inputs/manifest.yaml` 登记原始依据。本页说明目录职责、inspect 与 analyze 的行为和解析范围。需要操作输入时，可由 Agent 使用 `continue-harness-inputs` Skill，也可调用 CLI。

## 目录职责

| 文件或目录 | 职责 |
| --- | --- |
| `.continue-harness/inputs/manifest.yaml` | 登记输入清单；Core 读取 `id`、`type`、`path`、`task_id`、`status`、`sha256`、`supersedes`，其余字段（如 `source`、`version`）原样保留 |
| `.continue-harness/inputs/<type>/` | 按类型存放输入文件；`prd/`、`rp/`、`ui/`、`api/`、`assets/` 是内置类型的示例，不是白名单 |

输入条目的 `path` 指向项目中的真实文件，也可以放在仓库任意位置；自定义类型同样可以建立自己的目录。

## inspect

inspect 比对 manifest 和实际文件：

- 逐条解析类型：优先取条目上的 `type`；缺少类型时，只有位于 `.continue-harness/inputs/prd|rp|ui|api|assets/` 下的路径才按目录名推断。
- 类型名匹配小写字母、数字、下划线或连字符（如 `requirements`、`brand-assets`）时按自定义类型处理，显示名直接使用该类型；无法解析为有效类型时记为待确认，显示名退回原始类型或「待确认输入」。
- 遍历 `.continue-harness/inputs/` 的每个子目录查找未登记文件，目录集合是内置类型加实际存在的自定义目录，跳过 `README.md` 和 `metadata.yaml`；发现未登记文件记为待确认。
- 找到登记但缺失的文件，以及仍是占位内容的文件。
- 报告冲突：同一类型、同一任务（或同一标识/路径）下存在多个 `active` 输入时记为冲突，除非其中一个声明 `supersedes` 覆盖另一个。
- 输出稳定 JSON。

## analyze

analyze 对全部已登记、文件存在且 `status: active` 的输入做轻量文本分析，不限定类型：

- 按 UTF-8 读取文件并抽取带标签的结论。
- 归类规则：`rp` 记为 interaction；`ui` 命中视觉模式时记录对应维度，否则只标记为 `input:ui`；`prd`、`api`、`assets` 按已知业务模式提取线索，未命中时保留为 `input:<type>`；其他自定义类型不推断业务维度，统一标记为 `input:<type>`。
- 报告同 key 冲突。
- 二进制或不可直接读取的输入记为一条「需要 Agent 人工解析」的事实。
- 不修改原始输入。

## 边界

当前只解析 UTF-8 文本输入；PDF、图片、二进制与在线同步不在 0.1.0 范围。不可直接读取的输入会被标记为需要 Agent 人工解析。
