const {
  PROJECT_TYPES,
  ASSET_TYPES,
  MODEL_JOB_TYPES,
  JOB_STATUS,
  ROLES,
  PERMISSIONS
} = require("../../../packages/shared/constants");

const roleDefinitions = [
  {
    id: ROLES.OWNER,
    label: "管理员",
    permissions: Object.values(PERMISSIONS)
  },
  {
    id: ROLES.PRODUCER,
    label: "制作负责人",
    permissions: [
      PERMISSIONS.PROJECT_CREATE,
      PERMISSIONS.PROJECT_EDIT,
      PERMISSIONS.ASSET_EDIT,
      PERMISSIONS.MODEL_RUN,
      PERMISSIONS.EXPORT_CREATE
    ]
  },
  {
    id: ROLES.SCRIPT,
    label: "编剧",
    permissions: [PERMISSIONS.PROJECT_EDIT, PERMISSIONS.MODEL_RUN]
  },
  {
    id: ROLES.ASSET,
    label: "资产师",
    permissions: [PERMISSIONS.ASSET_EDIT, PERMISSIONS.MODEL_RUN]
  },
  {
    id: ROLES.REVIEWER,
    label: "审核",
    permissions: [PERMISSIONS.REVIEW_APPROVE, PERMISSIONS.EXPORT_CREATE]
  }
];

const users = [
  {
    id: "user_001",
    name: "绿豆",
    email: "lvdou@juchuge.ai",
    role: ROLES.OWNER,
    status: "active"
  },
  {
    id: "user_002",
    name: "林七",
    email: "linqi@juchuge.ai",
    role: ROLES.PRODUCER,
    status: "active"
  },
  {
    id: "user_003",
    name: "小月月",
    email: "xiaoyue@juchuge.ai",
    role: ROLES.ASSET,
    status: "active"
  },
  {
    id: "user_004",
    name: "阿川",
    email: "achuan@juchuge.ai",
    role: ROLES.SCRIPT,
    status: "inactive"
  },
  {
    id: "user_005",
    name: "闻一",
    email: "wenyi@juchuge.ai",
    role: ROLES.REVIEWER,
    status: "active"
  }
];

const projects = [
  {
    id: "project_001",
    type: PROJECT_TYPES.MANGA,
    name: "都市异能录",
    ownerId: "user_003",
    status: "asset_review",
    progress: 62,
    episodeCount: 20,
    computeCost: 9860
  },
  {
    id: "project_002",
    type: PROJECT_TYPES.SHORT_VIDEO,
    name: "真假千金热点测试",
    ownerId: "user_002",
    status: "script",
    progress: 44,
    videoCount: 6,
    computeCost: 4210
  },
  {
    id: "project_003",
    type: PROJECT_TYPES.CLIP_BATCH,
    name: "短剧第 08 集切片包",
    ownerId: "user_004",
    status: "batch_export",
    progress: 78,
    clipCount: 32,
    computeCost: 4350
  }
];

const assets = [
  {
    id: "asset_001",
    projectId: "project_001",
    type: ASSET_TYPES.ROLE,
    name: "苏念薇",
    description: "女主 / 红色嫁衣 / 冷静反击",
    status: "confirmed",
    usageScope: "第1-5集"
  },
  {
    id: "asset_002",
    projectId: "project_001",
    type: ASSET_TYPES.SCENE,
    name: "皇宫长街",
    description: "外景 / 红毯 / 宫门压迫感",
    status: "generated",
    usageScope: "第1集"
  },
  {
    id: "asset_003",
    projectId: "project_001",
    type: ASSET_TYPES.PROP,
    name: "红绣鸳鸯帕",
    description: "定情信物 / 反击道具 / 特写",
    status: "generated",
    usageScope: "第1集"
  },
  {
    id: "asset_004",
    projectId: "project_002",
    type: ASSET_TYPES.MUSIC,
    name: "冷雨悬疑",
    description: "悬疑 / 低频铺底 / 适合反转前奏",
    status: "reusable",
    usageScope: "短视频 / 漫剧"
  },
  {
    id: "asset_005",
    projectId: "project_003",
    type: ASSET_TYPES.TEMPLATE,
    name: "切片标题模板",
    description: "悬念开头 / 身份反转 / 爽点收束",
    status: "published",
    usageScope: "批量切片"
  }
];

const assetVariants = [
  {
    id: "variant_001",
    assetId: "asset_001",
    name: "基础形象",
    prompt: "苏念薇，红色嫁衣，冷静反击，国漫二次元，角色一致性强",
    model: "Seedance 2.0",
    ratio: "9:16",
    status: "succeeded"
  },
  {
    id: "variant_002",
    assetId: "asset_001",
    name: "冷宫夜行",
    prompt: "苏念薇，雨夜披风，暗光，压抑氛围，角色一致性强",
    model: "Seedance 2.0",
    ratio: "9:16",
    status: "queued"
  }
];

const scripts = [
  {
    id: "script_001",
    projectId: "project_001",
    title: "第1集：订婚惊变妹妹夺爱",
    format: "episode_scene",
    content: [
      {
        sceneNo: "1-1",
        location: "皇宫长街",
        dayNight: "日",
        interiorExterior: "外",
        text: "订婚当天，苏念薇被迫和亲。她当众拆穿萧景川用婚约换前程的真相。"
      }
    ]
  },
  {
    id: "script_002",
    projectId: "project_002",
    title: "真假千金全身仿爆光",
    format: "shot_table",
    content: [
      {
        shotNo: "镜1",
        time: "0-3s",
        visual: "宴会厅门口，女主被保安拦下，镜头快速推进她抬眼。",
        voiceover: "所有人都以为她只是被抛弃的替身。",
        subtitle: "所有人都以为她只是替身"
      }
    ]
  }
];

const modelJobs = [
  {
    id: "job_001",
    projectId: "project_001",
    type: MODEL_JOB_TYPES.ASSET_EXTRACT,
    model: "gpt-script-parser",
    status: JOB_STATUS.SUCCEEDED,
    createdBy: "user_001",
    createdAt: "2026-07-04T16:00:00.000Z",
    input: { scriptId: "script_001" },
    output: { assetCount: 22 }
  }
];

module.exports = {
  roleDefinitions,
  users,
  projects,
  assets,
  assetVariants,
  scripts,
  modelJobs
};

