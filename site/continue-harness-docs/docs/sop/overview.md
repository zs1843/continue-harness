# 使用 SOP 总览

continue-harness 的 SOP 分成七步：

1. 创建新项目或接入已有项目。
2. 放入原始输入。
3. 检查和分析输入。
4. 创建稳定任务编号。
5. 按任务类型加载证据。
6. 实现并选择验证模式。
7. 创建快照，更新历史和状态。

## 新项目主路径

```bash
continue-harness create my-h5
cd my-h5
continue-harness intake inspect --json
continue-harness inputs inspect --json
continue-harness inputs analyze --json
continue-harness task create --title "根据首批输入实现项目" --json
continue-harness verify feature
```

Consumer H5 preset 默认会安装依赖；generic preset 不包含 `package.json`，不会执行依赖安装。对于包含项目依赖的 preset，离线或网络不可用时使用：

```bash
continue-harness create my-h5 --skip-install
```

## 已有项目主路径

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
continue-harness doctor
```

已有项目一定先 dry-run。初始化流程会报告目标文件状态，并在冲突时拒绝写入。

## 为什么 SOP 要这么拆

创建项目、登记输入、建立任务和执行验证分别解决不同问题：

| 阶段 | 解决的问题 |
| --- | --- |
| create/init | 项目先获得稳定结构和约束 |
| inputs | 原始证据进入项目，而不是留在聊天记录 |
| task | 需求、接口、实现、验证有共同编号 |
| implementation | Agent 按任务类型读取证据，避免猜测 |
| verify | 完成标准可执行、可记录 |
| snapshot | 交付结果可追踪、可审计 |
