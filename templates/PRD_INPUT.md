# PRD 输入

## 用途

保存业务范围、用户角色、页面范围、字段含义、权限、流程、状态机、金额规则、校验规则、异常处理和验收标准。

## 支持形式

Markdown、PDF、HTML、图片、JSON、YAML、Office 导出文件或其他项目提供的 PRD 证据。

## 命名与版本

推荐按任务模块维护：`modules/T001/PRD.md`、`modules/T001/metadata.yaml`、`modules/T001/attachments/`。编号稳定，不因排序变化重排，不复用废弃编号。

## 优先级

业务规则优先参考最新有效 PRD。PRD 与 RP/UI 冲突时，必须记录冲突；涉及核心流程、金额、权限、认证、支付或数据结构时询问用户。

## 修改规则

原始 PRD 默认只读。抽取结论写入 `docs/PRODUCT.md`、`docs/IMPLEMENTATION_COVERAGE.md` 和任务快照。
