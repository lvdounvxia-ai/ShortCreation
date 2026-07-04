# 剧出格 ShortCreation

剧出格是一个面向内部员工使用的 AI 内容生产平台原型，覆盖漫剧制作、短视频制作和批量切片制作。

## 当前目录

```text
juchuge-prototype/   当前 GitHub Pages 静态前端原型
apps/
  api/               后端 API 雏形，当前使用内存数据
  web/               后续正式前端工程预留目录
packages/
  shared/            前后端共用枚举和权限定义
docs/
  backend/           后端数据和模型接入设计
```

## 本地运行前端

```bash
python3 -m http.server 43218
```

然后打开：

```text
http://127.0.0.1:43218/
```

## 本地运行 API

```bash
cd apps/api
npm run dev
```

默认地址：

```text
http://127.0.0.1:8787
```

