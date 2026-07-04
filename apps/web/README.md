# Web App

当前线上原型仍在仓库根目录的 `juchuge-prototype/` 中，以免影响 GitHub Pages。

后续升级为真正前端工程时，建议把前端迁移到这里：

```text
apps/web/
  src/
  public/
  package.json
```

迁移完成后再调整 GitHub Actions，让它构建 `apps/web` 并发布 `dist`。

