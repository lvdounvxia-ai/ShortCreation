# 剧出格 API

这是第一版后端数据 API 雏形，暂时使用内存数据，方便快速验证前端接入方式。

## 运行

```bash
cd apps/api
npm run dev
```

默认端口：

```text
http://127.0.0.1:8787
```

## 已有接口

- `GET /health`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/me`
- `GET /api/team/members`
- `GET /api/projects`
- `GET /api/assets?type=role`
- `GET /api/asset-variants?assetId=asset_001`
- `GET /api/scripts?projectId=project_001`
- `GET /api/model-jobs`
- `POST /api/model-jobs`
- `POST /api/model-jobs/:id/run`

## 下一步

1. 把 `data/store.js` 换成 PostgreSQL。
2. 把 `model-jobs` 接到 worker 队列。
3. 给前端加 API client，用真实接口替换页面内 mock 数据。

