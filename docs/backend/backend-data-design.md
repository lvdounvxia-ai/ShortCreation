# 剧出格后端数据与模型接入设计

## 目录约定

```text
ShortCreation/
  juchuge-prototype/   当前可上线静态原型
  apps/
    api/               后端 API
    web/               后续正式前端工程目录
    worker/            后续模型任务 worker
  packages/
    shared/            前后端共用枚举和类型
  docs/
    backend/           后端设计文档
```

## 第一阶段目标

先把产品从“纯前端 mock”推进到“有真实后端接口的数据原型”：

- 登录 / 注册 / 邀请码
- 团队成员与角色权限
- 项目列表
- 资产列表
- 剧本与分镜脚本
- 模型任务创建与状态查询

## 核心实体

- `users`: 员工账号
- `roles`: 角色与权限
- `projects`: 漫剧、短视频、批量切片项目
- `scripts`: 剧本、分集、场次、镜号脚本
- `assets`: 角色、场景、道具、音乐、模板
- `asset_variants`: 角色子形象、场景变体、道具变体
- `model_jobs`: 模型任务
- `generated_outputs`: 生成图片、视频、字幕、导出文件
- `reviews`: 审核记录
- `usage_logs`: 算力消耗

## 模型接入原则

前端不直接调用模型。所有模型调用统一走后端：

1. 前端提交生成请求。
2. API 创建 `model_jobs`。
3. Worker 消费任务并调用模型。
4. Worker 写回生成结果。
5. 前端轮询或订阅任务状态。

## 第二阶段建议

- API 框架升级为 Fastify / NestJS / FastAPI。
- 数据库接 PostgreSQL。
- 文件接对象存储。
- 模型任务接 Redis 队列或云任务队列。
- 前端迁移到 `apps/web`，使用 API client 拉数据。

