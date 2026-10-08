import { versionNav } from './versions.mjs';

// 唯一的导航来源。config.mjs 直接引用这里，不再重复定义。

export const rootNav = [
  { text: '首页', link: '/' },
  { text: '指南', link: '/guide/overview' },
  { text: 'Skills', link: '/skills/' },
  { text: '架构', link: '/architecture/overview' },
  { text: '参考', link: '/reference/commands' },
  { text: '案例', link: '/showcase/workflow-example' },
  versionNav()
];

export const rootSidebar = [
  {
    text: '简介',
    items: [
      { text: '为什么需要 Harness', link: '/background/why-harness' },
      { text: '解决的问题', link: '/background/problems' },
      { text: '设计原则', link: '/background/principles' }
    ]
  },
  {
    text: '指南',
    items: [
      { text: '工作流', link: '/guide/overview' },
      { text: '项目接入', link: '/guide/ai-first' },
      { text: '创建或接入项目', link: '/guide/getting-started' },
      { text: '输入与证据', link: '/guide/evidence' },
      { text: '任务、恢复与快照', link: '/guide/tasks-and-resume' },
      { text: '验证', link: '/guide/verification' },
      { text: 'Agent 协作', link: '/guide/agent-workflow' }
    ]
  },
  {
    text: '进阶',
    items: [
      { text: '创建新项目', link: '/sop/create-project' },
      { text: '接入已有项目', link: '/sop/init-existing-project' },
      { text: '输入登记', link: '/sop/inputs' },
      { text: '任务与实现', link: '/sop/task-and-implementation' },
      { text: '验证与快照', link: '/sop/verification-and-snapshot' },
      { text: '项目结构', link: '/sop/project-structure' }
    ]
  },
  {
    text: 'Skills',
    items: [
      { text: '安装 Skills', link: '/skills/install' },
      { text: '内置 Skills', link: '/skills/' },
      { text: '执行步骤', link: '/skills/steps' }
    ]
  },
  {
    text: '架构',
    items: [
      { text: '架构', link: '/architecture/overview' },
      { text: 'Core', link: '/architecture/core' },
      { text: '适配器', link: '/architecture/adapters' },
      { text: 'CLI', link: '/architecture/cli' },
      { text: '输入', link: '/architecture/inputs' },
      { text: 'OpenAPI', link: '/architecture/openapi' },
      { text: 'UI System', link: '/architecture/ui-system' },
      { text: 'Design Token', link: '/architecture/design-tokens' },
      { text: '模板与 Preset', link: '/architecture/templates-presets' }
    ]
  },
  {
    text: '参考',
    items: [
      { text: '命令', link: '/reference/commands' },
      { text: '配置与文件', link: '/reference/config-and-files' },
      { text: '验证模式', link: '/reference/verification-modes' },
      { text: '术语表', link: '/reference/glossary' }
    ]
  },
  {
    text: '案例',
    items: [
      { text: '只读命令示例', link: '/showcase/workflow-example' },
      { text: '项目案例', link: '/showcase/case-study' },
      { text: '真实项目 Pilot', link: '/showcase/real-project-pilot' },
      { text: 'demo-h5 证据记录', link: '/showcase/demo-h5-capture' },
      { text: '构建与部署', link: '/deploy/build' },
      { text: '文档维护规则', link: '/maintenance/docs-as-contract' }
    ]
  }
];

export const englishNav = [
  { text: 'Home', link: '/en/' },
  { text: 'Guide', link: '/en/guide/overview' },
  { text: 'Skills', link: '/en/skills/' },
  { text: 'Architecture', link: '/en/architecture/overview' },
  { text: 'Reference', link: '/en/reference/commands' },
  { text: 'Examples', link: '/en/showcase/workflow-example' },
  versionNav()
];

export const englishSidebar = [
  {
    text: 'Introduction',
    items: [
      { text: 'Why a harness', link: '/en/background/why-harness' },
      { text: 'Problems addressed', link: '/en/background/problems' },
      { text: 'Design principles', link: '/en/background/principles' }
    ]
  },
  {
    text: 'Guide',
    items: [
      { text: 'Workflow', link: '/en/guide/overview' },
      { text: 'Project adoption', link: '/en/guide/ai-first' },
      { text: 'Create or adopt a project', link: '/en/guide/getting-started' },
      { text: 'Inputs and evidence', link: '/en/guide/evidence' },
      { text: 'Tasks, resume, and snapshots', link: '/en/guide/tasks-and-resume' },
      { text: 'Verification', link: '/en/guide/verification' },
      { text: 'Agent collaboration', link: '/en/guide/agent-workflow' }
    ]
  },
  {
    text: 'Advanced',
    items: [
      { text: 'Create a project', link: '/en/sop/create-project' },
      { text: 'Adopt an existing project', link: '/en/sop/init-existing-project' },
      { text: 'Input registration', link: '/en/sop/inputs' },
      { text: 'Task and implementation', link: '/en/sop/task-and-implementation' },
      { text: 'Verification and snapshots', link: '/en/sop/verification-and-snapshot' },
      { text: 'Project structure', link: '/en/sop/project-structure' }
    ]
  },
  {
    text: 'Skills',
    items: [
      { text: 'Install skills', link: '/en/skills/install' },
      { text: 'Built-in skills', link: '/en/skills/' },
      { text: 'Execution steps', link: '/en/skills/steps' }
    ]
  },
  {
    text: 'Architecture',
    items: [
      { text: 'Architecture', link: '/en/architecture/overview' },
      { text: 'Core', link: '/en/architecture/core' },
      { text: 'Adapters', link: '/en/architecture/adapters' },
      { text: 'CLI', link: '/en/architecture/cli' },
      { text: 'Inputs', link: '/en/architecture/inputs' },
      { text: 'OpenAPI', link: '/en/architecture/openapi' },
      { text: 'UI System', link: '/en/architecture/ui-system' },
      { text: 'Design Token', link: '/en/architecture/design-tokens' },
      { text: 'Templates and presets', link: '/en/architecture/templates-presets' }
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'CLI', link: '/en/reference/commands' },
      { text: 'Configuration and files', link: '/en/reference/config-and-files' },
      { text: 'Verification modes', link: '/en/reference/verification-modes' },
      { text: 'Glossary', link: '/en/reference/glossary' }
    ]
  },
  {
    text: 'Examples',
    items: [
      { text: 'Read-only command examples', link: '/en/showcase/workflow-example' },
      { text: 'Case study', link: '/en/showcase/case-study' },
      { text: 'Real-project Pilot', link: '/en/showcase/real-project-pilot' },
      { text: 'demo-h5 evidence record', link: '/en/showcase/demo-h5-capture' },
      { text: 'Build and deploy', link: '/en/deploy/build' },
      { text: 'Documentation maintenance', link: '/en/maintenance/docs-as-contract' }
    ]
  }
];
