const PROJECT_TYPES = {
  MANGA: "manga",
  SHORT_VIDEO: "short_video",
  CLIP_BATCH: "clip_batch"
};

const ASSET_TYPES = {
  ROLE: "role",
  SCENE: "scene",
  PROP: "prop",
  MUSIC: "music",
  TEMPLATE: "template"
};

const MODEL_JOB_TYPES = {
  SCRIPT_PARSE: "script_parse",
  ASSET_EXTRACT: "asset_extract",
  PROMPT_GENERATE: "prompt_generate",
  IMAGE_GENERATE: "image_generate",
  VIDEO_GENERATE: "video_generate",
  CLIP_ANALYZE: "clip_analyze",
  EXPORT_RENDER: "export_render"
};

const JOB_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  SUCCEEDED: "succeeded",
  FAILED: "failed"
};

const ROLES = {
  OWNER: "owner",
  PRODUCER: "producer",
  SCRIPT: "script",
  ASSET: "asset",
  REVIEWER: "reviewer"
};

const PERMISSIONS = {
  TEAM_VIEW: "team:view",
  TEAM_MANAGE: "team:manage",
  PROJECT_CREATE: "project:create",
  PROJECT_EDIT: "project:edit",
  ASSET_EDIT: "asset:edit",
  MODEL_RUN: "model:run",
  REVIEW_APPROVE: "review:approve",
  EXPORT_CREATE: "export:create"
};

module.exports = {
  PROJECT_TYPES,
  ASSET_TYPES,
  MODEL_JOB_TYPES,
  JOB_STATUS,
  ROLES,
  PERMISSIONS
};

