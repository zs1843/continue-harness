# 术语表

## Harness

一套围绕项目事实、约束、验证和留痕的工程协议。

## Core

业务无关运行时，负责配置、诊断、验证、报告和安全写入。

## Product Profile

产品形态规则，比如 Consumer H5。

## Platform Adapter

运行平台规则，比如 Web Mobile。

## Stack Adapter

框架和工具链规则，比如 uni-app。

## Input

原始证据，包括 PRD、RP、UI、API 和 assets。

## Design Token

项目唯一机器可读视觉真值。它保存颜色、字号、间距、圆角、阴影、层级和动效等语义值，并记录来源状态。

## Token Authority

Token 取值的权威来源。优先级为：高保真 UI、RP、用户临时视觉要求、项目既有 Token、DESIGN 原则、Harness 默认值、Agent 推断。

## Requirement Closure

需求闭环。要求 PRD/RP 中可达页面、状态、动作和返回路径都被验证、延期或记录为外部阻塞。

## Managed File

由 Harness 生成并带 metadata 保护的文件。手工修改后，后续生成应拒绝覆盖。

## Aggregate Skill

默认安装的聚合工作流 Skill，例如 `consumer-h5-harness`。

## Command-specific Skill

针对单个命令或专项能力的 Skill，例如 `continue-harness-api`、`continue-harness-design-tokens`。
