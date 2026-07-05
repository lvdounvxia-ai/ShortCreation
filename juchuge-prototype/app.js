const state = {
  isAuthenticated: false,
  loginMode: "login",
  loginRole: "owner",
  section: "studio",
  studioTab: "manga",
  mangaStage: "import",
  shortStage: "topics",
  clipStage: "upload",
  assetFilter: "roles",
  libraryAssetFilter: "roles",
  projectFilter: "全部",
  selectedProject: 0,
  selectedLibraryAsset: 0,
  selectedTopic: 0,
  shortTopicFilter: "全部",
  selectedAssetCard: 0,
  selectedAssetVariant: 0,
  assetEditorOpen: false,
  selectedMangaScene: "1-1",
  selectedShortShot: 0,
  selectedClipSegment: 0,
  teamFilter: "全部",
  selectedTeamMember: 0,
  selectedMemberRole: "owner",
  toast: ""
};

const navItems = [
  { id: "workbench", label: "生产工作台", desc: "任务首页", icon: "layout" },
  { id: "projects", label: "项目", desc: "漫剧 / 短视频 / 切片", icon: "folder" },
  { id: "assets", label: "资产", desc: "角色 / 场景 / 音乐", icon: "asset" },
  { id: "studio", label: "制作", desc: "三类生产模式", icon: "board" },
  { id: "team", label: "团队管理", desc: "账号 / 角色 / 权限", icon: "users", permission: "team:view" }
];

const studioTabs = [
  { id: "manga", label: "漫剧制作", tone: "iris" },
  { id: "short", label: "短视频制作", tone: "blue" },
  { id: "clips", label: "批量切片制作", tone: "red" }
];

const roleDefinitions = [
  { id: "owner", label: "管理员", desc: "团队、权限、成本与全部项目", permissions: ["team:view", "team:manage", "project:create", "project:edit", "asset:edit", "model:run", "review:approve", "export:create"] },
  { id: "producer", label: "制作负责人", desc: "创建项目、推进流程、提交生成", permissions: ["project:create", "project:edit", "asset:edit", "model:run", "export:create"] },
  { id: "script", label: "编剧", desc: "选题、剧本、脚本与分镜文本", permissions: ["project:edit", "model:run"] },
  { id: "asset", label: "资产师", desc: "角色、场景、道具、音乐与模板", permissions: ["asset:edit", "model:run"] },
  { id: "reviewer", label: "审核", desc: "审核成片、打回修改、确认导出", permissions: ["review:approve", "export:create"] }
];

const permissionGroups = [
  { id: "team:view", label: "查看团队" },
  { id: "team:manage", label: "管理账号" },
  { id: "project:create", label: "新建项目" },
  { id: "project:edit", label: "编辑项目" },
  { id: "asset:edit", label: "编辑资产" },
  { id: "model:run", label: "提交生成" },
  { id: "review:approve", label: "审核通过" },
  { id: "export:create", label: "导出成片" }
];

const teamMembers = [
  { name: "绿豆", role: "owner", status: "在线", scope: "全部项目", usage: "3,420", lastActive: "刚刚" },
  { name: "林七", role: "producer", status: "在线", scope: "短视频 / 切片", usage: "1,860", lastActive: "12分钟前" },
  { name: "小月月", role: "asset", status: "忙碌", scope: "漫剧资产", usage: "2,140", lastActive: "34分钟前" },
  { name: "阿川", role: "script", status: "离线", scope: "短剧切片", usage: "960", lastActive: "昨天" },
  { name: "闻一", role: "reviewer", status: "在线", scope: "审核 / 导出", usage: "740", lastActive: "5分钟前" }
];

const mangaStages = [
  { id: "import", label: "剧本导入" },
  { id: "episodes", label: "剧集内容" },
  { id: "assets", label: "资产拆解" },
  { id: "storyboard", label: "分镜制作" }
];

const shortStages = [
  { id: "topics", label: "热点选题" },
  { id: "script", label: "脚本制作" },
  { id: "assets", label: "提取资产" },
  { id: "video", label: "视频制作" }
];

const clipStages = [
  { id: "upload", label: "上传原剧本" },
  { id: "extract", label: "提取脚本" },
  { id: "plan", label: "切片方案" },
  { id: "batch", label: "批量成片" }
];

const projects = [
  { type: "漫剧", name: "都市异能录", owner: "小月月", progress: 62, status: "资产确认", due: "今天 18:00", count: "20集" },
  { type: "短视频", name: "真假千金热点测试", owner: "林七", progress: 44, status: "脚本制作", due: "今天 15:30", count: "6条" },
  { type: "切片", name: "短剧第 08 集切片包", owner: "阿川", progress: 78, status: "批量导出", due: "明天 11:00", count: "32条" },
  { type: "漫剧", name: "雨夜法医", owner: "闻一", progress: 35, status: "分镜拆解", due: "周五", count: "12集" }
];

const roleAssets = [
  { name: "苏念薇", meta: "女主 / 红色嫁衣 / 冷静反击", used: "第1-5集", status: "已生成 3/3" },
  { name: "萧景川", meta: "少年将军 / 白色铠甲 / 虚伪深情", used: "第1-2集", status: "待补全" },
  { name: "柳如烟", meta: "反派 / 粉裙 / 柔弱伪装", used: "第1-3集", status: "已确认" },
  { name: "宇文渊", meta: "帝王 / 玄色长袍 / 压迫感", used: "第1-8集", status: "待生成" }
];

const sceneAssets = [
  { name: "皇宫长街", meta: "外景 / 红毯 / 宫门压迫感", used: "第1集", status: "已生成" },
  { name: "凤仪殿", meta: "内景 / 烛火 / 权力交锋", used: "第1-4集", status: "待确认" },
  { name: "冷宫偏院", meta: "雨夜 / 石阶积水 / 悬疑", used: "第2集", status: "已确认" }
];

const propAssets = [
  { name: "红绣鸳鸯帕", meta: "定情信物 / 反击道具 / 特写", used: "第1集", status: "已生成" },
  { name: "鎏金花轿", meta: "和亲视觉中心 / 压抑华丽", used: "第1集", status: "已确认" },
  { name: "禁军长枪", meta: "宫门秩序 / 压迫氛围", used: "第1-2集", status: "复用资产" }
];

const musicAssets = [
  { name: "冷雨悬疑", meta: "悬疑 / 低频铺底 / 适合反转前奏", used: "漫剧 / 短视频", status: "可复用" },
  { name: "宫廷压迫", meta: "鼓点 / 弦乐 / 权谋冲突", used: "漫剧分镜", status: "已确认" },
  { name: "追妻情绪", meta: "情感 / 钢琴 / 高潮铺垫", used: "切片成片", status: "待试听" }
];

const templateAssets = [
  { name: "剧情反转封面", meta: "大字标题 / 人物特写 / 强冲突", used: "短视频", status: "默认模板" },
  { name: "漫剧分镜提示词", meta: "角色引用 / 场景约束 / 镜头语言", used: "漫剧制作", status: "已上线" },
  { name: "切片标题模板", meta: "悬念开头 / 身份反转 / 爽点收束", used: "批量切片", status: "可复用" }
];

const assetLibraryTabs = [
  { id: "roles", label: "角色", count: 22 },
  { id: "scenes", label: "场景", count: 67 },
  { id: "props", label: "道具", count: 34 },
  { id: "music", label: "音乐", count: 18 },
  { id: "templates", label: "模板", count: 12 }
];

const episodeScenes = [
  {
    id: "1-1",
    title: "皇宫长街",
    meta: "1-1 皇宫长街 · 日 · 外",
    people: ["苏念薇", "萧景川", "柳如烟"],
    summary: "订婚当天，苏念薇被迫和亲。她当众拆穿萧景川用婚约换前程的真相，并用红绣鸳鸯帕撕开这段关系。",
    lines: ["汉白玉石路上，红毯铺地，鎏金花轿停在宫门中央。", "萧景川护在花轿旁，柳如烟假意垂泪。", "苏念薇掀帘而出，将红帕砸在萧景川脸上。"]
  },
  {
    id: "1-2",
    title: "宫门外",
    meta: "1-2 宫门外 · 日 · 外",
    people: ["苏念薇", "萧景川", "禁军"],
    summary: "禁军列队，宫门开启。苏念薇与萧家彻底割席，花轿驶入皇宫。",
    lines: ["宫门缓缓开启，禁军长枪如墙。", "萧景川试图追上前，却被禁军挡住。", "苏念薇回头冷声告别。"]
  },
  {
    id: "1-3",
    title: "凤仪殿",
    meta: "1-3 凤仪殿 · 夜 · 内",
    people: ["苏念薇", "宇文渊"],
    summary: "凤仪殿烛火摇曳，苏念薇第一次见到传闻中嗜血的帝王宇文渊。",
    lines: ["苏念薇摘下凤冠，抬眸看向屏风后的高大身影。", "宇文渊低声试探她是否害怕。", "她淡笑回答：怕一个人，和利用一个人，从来不是一回事。"]
  }
];

const scriptEditorNav = ["剧本大纲", "人物小传", "前置钩子"];

const scriptEditorGroups = [
  {
    title: "第一集",
    count: "3 场",
    scenes: [
      { id: "1-1", title: "苏晚星卧室醒来", active: true },
      { id: "1-2", title: "街道、马路追车" },
      { id: "1-3", title: "儿童医院急诊", alert: true }
    ]
  },
  {
    title: "第二集",
    count: "2 场",
    scenes: [
      { id: "2-1", title: "空地点 日景", alert: true },
      { id: "2-2", title: "医院走廊争执" }
    ]
  }
];

const activeScriptLines = [
  { text: "出场人物：苏晚星", strong: true },
  { text: "苏晚星是被一通电话吵醒的。凌晨四点，手机屏幕在黑暗里发出刺眼的白光。她伸手摸过去，指尖还沾着昨夜命案现场的福尔马林味。" },
  { text: "“喂。”她的声音沙哑。" },
  { text: "电话那头传来声音：“苏小姐，您的儿子高烧39度8，请尽快来儿童医院。”" },
  { text: "苏晚星愣了三秒，平静地回：“打错了。”挂断。" },
  { text: "▲三秒后，电话再次响起。这次是个带着哭腔的护士：“孩子一直在喊妈妈，他爸爸傅先生还在手术台上下不来，孩子已经抽搐了一次，求您快点过来。”" },
  { text: "▲啪地一声，床头的玻璃杯被她碰倒，碎在地板上。" },
  { text: "傅。先。生。" },
  { text: "这个姓氏在她脑子里炸开。整个S市姓傅、又是外科医生的，只有一个人--傅景衍。" },
  { text: "她的医学院死对头，互看不顺眼整整六年的那个男人。" },
  { text: "▲上一次见他，是四年前的毕业典礼。他西装笔挺地站在台上致辞，她坐在台下咬着牙发誓，这辈子都不要再和这个男人有任何交集。" },
  { text: "现在告诉她，她和他，有个儿子？" },
  { text: "▲苏晚星赤脚踩过碎玻璃，疼也感觉不到。她抓起外套冲出门。" }
];

const hotTopics = [
  { title: "真假千金身份曝光", heat: "92", angle: "前三秒反转", status: "可认领" },
  { title: "替身三年后她转身离开", heat: "86", angle: "情绪拉扯", status: "脚本中" },
  { title: "雨夜来电暴露旧案", heat: "81", angle: "悬疑钩子", status: "待拆解" }
];

const clipRows = [
  { title: "女主身份暴露", span: "00:02:14 - 00:03:05", score: 94, label: "身份反转", status: "可成片" },
  { title: "男主反悔追妻", span: "00:07:41 - 00:08:28", score: 88, label: "情绪拉扯", status: "可成片" },
  { title: "反派当众被打脸", span: "00:11:09 - 00:12:22", score: 84, label: "爽点", status: "待改标题" },
  { title: "遗嘱公开", span: "00:15:02 - 00:16:02", score: 81, label: "强冲突", status: "可成片" }
];

function icon(name) {
  return `<svg class="icon"><use href="#i-${name}"></use></svg>`;
}

function toneFor(value) {
  if (value === "漫剧") return "iris";
  if (value === "短视频") return "blue";
  if (value === "切片") return "red";
  return "green";
}

function roleById(roleId) {
  return roleDefinitions.find(role => role.id === roleId) || roleDefinitions[0];
}

function currentUser() {
  return teamMembers.find(member => member.role === state.loginRole) || teamMembers[0];
}

function hasPermission(permission) {
  return roleById(state.loginRole).permissions.includes(permission);
}

function guardedButton(permission, className, label, message) {
  if (hasPermission(permission)) {
    return `<button class="${className}" data-action="toast" data-message="${message}">${label}</button>`;
  }
  return `<button class="${className} disabled" data-action="forbidden" data-message="当前角色没有${label.replace(/<[^>]+>/g, "")}权限">${label}</button>`;
}

function setState(next) {
  Object.assign(state, next);
  render();
}

function notify(message) {
  state.toast = message;
  render();
  window.clearTimeout(window.__toastTimer);
  window.__toastTimer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 2200);
}

function renderLogin() {
  const isRegister = state.loginMode === "register";
  return `
    <main class="login-screen">
      <section class="login-hero-card">
        <div class="login-brand">
          <div class="brand-mark">剧</div>
          <div>
            <div class="brand-name">剧出格</div>
            <div class="brand-sub">AI内容生产平台</div>
          </div>
        </div>
        <div class="login-copy">
          <p class="eyebrow">剧出格工作台</p>
          <h1>登录后开始内容生产</h1>
          <p>统一管理项目、资产、模型生成与成片导出。</p>
        </div>
      </section>

      <section class="login-panel">
        <div class="auth-tabs">
          <button class="${state.loginMode === "login" ? "active" : ""}" data-login-mode="login">登录</button>
          <button class="${state.loginMode === "register" ? "active" : ""}" data-login-mode="register">注册</button>
        </div>
        <div class="login-copy compact">
          <p class="eyebrow">${isRegister ? "创建账号" : "账号登录"}</p>
          <h1>${isRegister ? "注册剧出格" : "欢迎回来"}</h1>
        </div>
        <div class="login-form">
          ${isRegister ? `<label><span>姓名</span><input value="绿豆" /></label>` : ""}
          <label><span>手机号 / 企业邮箱</span><input value="lvdou@juchuge.ai" /></label>
          <label><span>密码</span><input value="••••••••" type="password" /></label>
          ${isRegister ? `<label><span>邀请码</span><input value="JCG-2026" /></label>` : `<label><span>邀请码</span><input value="JCG-2026" /></label>`}
          <button class="primary-button login-submit" data-login>${isRegister ? "注册并进入" : "登录"}</button>
        </div>
        <p class="auth-footnote">${isRegister ? "已有账号？切换到登录继续使用。" : "没有账号？使用邀请码注册团队账号。"}</p>
      </section>
    </main>
  `;
}

function shell(content) {
  const user = currentUser();
  const visibleNavItems = navItems.filter(item => !item.permission || hasPermission(item.permission));
  return `
    <div class="product-shell">
      <aside class="sidebar">
        <div class="brand-block">
          <div class="brand-mark">剧</div>
          <div>
            <div class="brand-name">剧出格</div>
            <div class="brand-sub">AI内容生产平台</div>
          </div>
        </div>
        <nav class="nav-list">
          ${visibleNavItems.map(item => `
            <button class="nav-item ${state.section === item.id ? "active" : ""}" data-section="${item.id}">
              ${icon(item.icon)}
              <span><b>${item.label}</b><em>${item.desc}</em></span>
            </button>
          `).join("")}
        </nav>
        <button class="profile-entry" data-action="toast" data-message="已打开个人资料">
          <span class="profile-avatar">${user.name.slice(0, 1)}</span>
          <span class="profile-copy"><b>${user.name}</b><em>${roleById(state.loginRole).label}</em></span>
          <span class="profile-arrow">›</span>
        </button>
      </aside>
      <main class="main">
        <header class="topbar">
          <div class="top-studio-tabs" aria-label="制作模式">
            ${studioTabs.map(tab => `
              <button class="studio-tab ${state.studioTab === tab.id ? "active" : ""} ${tab.tone}" data-studio-tab="${tab.id}">
                ${tab.label}
              </button>
            `).join("")}
          </div>
          <div class="top-actions">
            <button class="icon-button" data-action="toast" data-message="暂无新通知">${icon("bell")}</button>
            ${hasPermission("project:create")
              ? `<button class="primary-button" data-action="new-project">${icon("plus")}新建项目</button>`
              : `<button class="primary-button disabled" data-action="forbidden" data-message="当前角色没有新建项目权限">${icon("plus")}新建项目</button>`}
            <button class="ghost-button" data-logout>退出</button>
          </div>
        </header>
        ${content}
      </main>
      ${state.assetEditorOpen ? assetEditorModal() : ""}
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
    </div>
  `;
}

function renderStudio() {
  return `
    <section class="workspace">
      <div class="workspace-head">
        <div>
          <p class="eyebrow">制作工作区</p>
          <h1>${studioTabs.find(tab => tab.id === state.studioTab).label}</h1>
        </div>
      </div>
      ${state.studioTab === "manga" ? mangaStudio() : state.studioTab === "short" ? shortStudio() : clipsStudio()}
    </section>
  `;
}

function stageRail() {
  const currentIndex = mangaStages.findIndex(stage => stage.id === state.mangaStage);
  return `
    <div class="stage-rail">
      ${mangaStages.map((stage, index) => {
        const status = index < currentIndex ? "done" : index === currentIndex ? "active" : "todo";
        return `
        <button class="stage-chip ${state.mangaStage === stage.id ? "active" : ""} ${status}" data-manga-stage="${stage.id}">
          <span>${index + 1}</span>${stage.label}
        </button>
      `;
      }).join("")}
    </div>
  `;
}

function mangaStudio() {
  return `
    ${stageRail()}
    ${mangaStagePage()}
  `;
}

function mangaStagePage() {
  if (state.mangaStage === "import") return mangaImportPage();
  if (state.mangaStage === "episodes") return mangaEpisodesPage();
  if (state.mangaStage === "assets") return mangaAssetsPage();
  return mangaStoryboardPage();
}

function mangaPageShell(eyebrow, title, desc, content, footer, options = {}) {
  return `
    <div class="manga-page">
      <div class="manga-page-main">
        ${options.hideTitle ? "" : `<div class="manga-page-title">
          <div>
            <p class="eyebrow">${eyebrow}</p>
            <h2>${title}</h2>
            <span>${desc}</span>
          </div>
        </div>`}
        ${content}
        ${footer || ""}
      </div>
    </div>
  `;
}

function flowFooter(prev, next, primaryLabel) {
  return `
    <div class="flow-footer">
      ${prev ? `<button class="ghost-button" data-go-stage="${prev}">上一步</button>` : `<span></span>`}
      <div>
        <button class="ghost-button" data-action="toast" data-message="当前页面草稿已保存">${icon("check")}保存草稿</button>
        ${next ? `<button class="primary-button" data-go-stage="${next}">${primaryLabel || "下一步"}</button>` : ""}
      </div>
    </div>
  `;
}

function mangaImportPage() {
  return mangaPageShell(
    "Step 01",
    "剧本导入",
    "上传剧本或小说内容，设置模型、风格与画幅，解析出后续可编辑的剧集结构。",
    `
      <div class="import-page-grid">
        <section class="panel">
          <div class="import-tabs-line">
            <button class="active" data-action="toast" data-message="已切换为模板导入">${icon("upload")}模板导入</button>
            <button data-action="toast" data-message="已切换为 AI 自动拆解">${icon("wand")}AI自动拆解小说</button>
          </div>
          <div class="upload-zone">
            <div class="file-badge">DOCX</div>
            <div>
              <h3>都市异能录_第1季.docx</h3>
              <p>支持 DOCX / PDF / TXT / Markdown / Excel；当前识别 20 集、23 场、约 18,600 字。</p>
            </div>
            <button class="ghost-button" data-action="toast" data-message="请选择新的剧本文档">${icon("upload")}替换</button>
          </div>
          <div class="field-grid-compact">
            <label>解析模型<button data-action="toast" data-message="已打开解析模型选择">seedance 2.0fast</button></label>
            <label>视觉风格<button data-action="toast" data-message="已打开视觉风格选择">国漫二次元</button></label>
            <label>画面比例<button data-action="toast" data-message="已打开画面比例选择">9:16 竖屏</button></label>
            <label>内容类型<button data-action="toast" data-message="已打开内容类型选择">都市异能 / 爽文反转</button></label>
          </div>
          <button class="wide-action import-action" data-go-stage="episodes">${icon("wand")}剧本解析</button>
        </section>
      </div>
    `,
    flowFooter(null, "episodes", "进入剧集内容")
  );
}

function mangaEpisodesPage() {
  return mangaPageShell(
    "Step 02",
    "剧集内容",
    "确认项目基础信息、分集结构和每一场导入内容，再进入资产拆解。",
    `
      <section class="panel script-editor-panel">
        <div class="script-editor-head">
          <div>
            <b>剧本编辑</b>
            <span>都市异能录 · AI拆解后脚本</span>
          </div>
          <button class="primary-button" data-action="toast" data-message="已添加新的场次草稿">${icon("plus")}添加</button>
        </div>
        <div class="script-editor-layout">
          <aside class="script-sidebar">
            <div class="script-nav">
              ${scriptEditorNav.map((item, index) => `<button class="${index === 0 ? "active" : ""}" data-action="toast" data-message="已切换到${item}">${item}</button>`).join("")}
            </div>
            <div class="script-tree">
              ${scriptEditorGroups.map(group => `
                <section class="script-tree-group">
                  <div class="script-tree-title"><b>${group.title}</b><span>${group.count}</span></div>
                  ${group.scenes.map(scene => `
                    <button class="script-scene-item ${scene.active ? "active" : ""}" data-action="toast" data-message="已打开 ${scene.id} ${scene.title}">
                      <span class="${scene.alert ? "alert-dot" : ""}"></span>
                      <b>${scene.id} ${scene.title}</b>
                    </button>
                  `).join("")}
                </section>
              `).join("")}
            </div>
          </aside>
          <section class="script-main">
            <div class="scene-field-grid">
              <label>场次号<button data-action="toast" data-message="已打开场次号设置">1-1</button></label>
              <label>地点<button data-action="toast" data-message="已打开地点设置">苏晚星卧室</button></label>
              <label>内/外景<button data-action="toast" data-message="已打开内外景设置">内景</button></label>
              <label>日/夜景<button data-action="toast" data-message="已打开日夜景设置">未填</button></label>
            </div>
            <div class="script-text-box">
              ${activeScriptLines.map((line, index) => `
                <p class="${line.strong ? "strong-line" : ""}">
                  <span>${index + 1}</span><b>${line.text}</b>
                </p>
              `).join("")}
            </div>
          </section>
        </div>
      </section>
    `,
    flowFooter("import", "assets", "进入资产拆解"),
    { hideTitle: true }
  );
}

function mangaAssetsPage() {
  const tabs = [
    ["roles", "全部角色 22"],
    ["scenes", "全部场景 67"],
    ["props", "全部道具 34"]
  ];
  const { typeLabel, assetCards } = getMangaAssetContext();
  return mangaPageShell(
    "Step 03",
    "资产拆解",
    "从剧本中提取人物、场景、道具，并在资产库中完成选择、确认与批量生成。",
    `
      <div class="asset-library-page">
        <div class="asset-library-tabs">
          ${tabs.map(([id, label]) => `<button class="${state.assetFilter === id ? "active" : ""}" data-asset-filter="${id}">${label}</button>`).join("")}
        </div>
        <section class="panel asset-library-board">
          <div class="asset-selection-strip">
            <label class="select-all-pill"><span></span><b>全选</b><em>请选择要生成所有形象图的${typeLabel}</em></label>
            <div class="asset-selection-actions">
              <button class="ghost-button" data-action="toast" data-message="已取消当前选择">取消选择</button>
              <button class="primary-button" data-action="toast" data-message="已创建${typeLabel}批量生成任务">AI生成 ✦ 3</button>
            </div>
          </div>
          <div class="asset-card-grid">
            ${assetCards.map((asset, index) => assetLibraryCard(asset, index, typeLabel)).join("")}
          </div>
        </section>
      </div>
    `,
    "",
    { hideTitle: true }
  );
}

function assetLibraryCard(asset, index, typeLabel) {
  const progressLabel = typeLabel === "角色" ? "形象 8/8" : typeLabel === "场景" ? "场景图 6/6" : "道具图 4/4";
  return `
    <article class="asset-library-card ${state.selectedAssetCard === index ? "selected" : ""}" data-asset-card="${index}">
      <div class="asset-card-preview"><span>${icon("check")}</span></div>
      <div class="asset-card-copy">
        <h3>${asset.name}<em>${progressLabel}</em></h3>
        <p>${asset.meta}，${asset.used}，适合在后续分镜中复用...</p>
        <div class="asset-prompt-snippet">
          <b>提示词</b>
          <span>${asset.meta}，清醒果决，擅长在危局中反击。</span>
        </div>
      </div>
      <button class="asset-edit-button" data-open-asset-editor="${index}">${icon("board")}编辑</button>
    </article>
  `;
}

function getMangaAssetContext() {
  const assets = state.assetFilter === "scenes" ? sceneAssets : state.assetFilter === "props" ? propAssets : roleAssets;
  const typeLabel = state.assetFilter === "scenes" ? "场景" : state.assetFilter === "props" ? "道具" : "角色";
  return {
    assets,
    typeLabel,
    assetCards: Array.from({ length: 6 }, (_, index) => assets[index % assets.length])
  };
}

function assetEditorModal() {
  const { assetCards, typeLabel } = getMangaAssetContext();
  const asset = assetCards[state.selectedAssetCard] || assetCards[0] || roleAssets[0];
  const variants = [
    { name: "基础形象", scene: "通用", status: "已生成", tone: "正面半身 / 统一角色脸" },
    { name: "红色嫁衣", scene: "1-1", status: "已确认", tone: "宫门反击 / 情绪克制" },
    { name: "冷宫夜行", scene: "1-3", status: "待补图", tone: "雨夜披风 / 暗光" },
    { name: "特写表情", scene: "分镜复用", status: "草稿", tone: "眼神坚定 / 近景" }
  ];
  const currentVariant = variants[state.selectedAssetVariant] || variants[0];
  return `
    <div class="modal-backdrop" data-close-asset-editor>
      <section class="asset-editor-modal" role="dialog" aria-modal="true" aria-label="${typeLabel}编辑" data-modal-surface>
        <div class="asset-editor-head">
          <div>
            <p class="eyebrow">${typeLabel}资产编辑</p>
            <h2>${asset.name}</h2>
          </div>
          <button class="icon-button" data-close-asset-editor>×</button>
        </div>

        <div class="asset-editor-top">
          <label>
            <span>${typeLabel}名称</span>
            <input value="${asset.name}" />
          </label>
          <label>
            <span>${typeLabel}描述</span>
            <input value="${asset.meta}" />
          </label>
        </div>

        <div class="asset-editor-grid">
          <div class="asset-editor-left">
            <section class="editor-section variant-list-panel">
              <div class="editor-section-head">
                <span>子形象列表</span>
                <button class="ghost-button" data-action="toast" data-message="已新增子形象草稿">${icon("plus")}新增</button>
              </div>
              <div class="variant-list">
                ${variants.map((variant, index) => `
                  <button class="variant-card ${state.selectedAssetVariant === index ? "active" : ""}" data-asset-variant="${index}">
                    <b>${index + 1}</b>
                    <span>${asset.name} · ${variant.name}</span>
                    <em>${variant.scene} / ${variant.status}</em>
                  </button>
                `).join("")}
              </div>
            </section>

            <section class="editor-section text-image-panel">
              <div class="editor-section-head">
                <span>文生图</span>
                <button class="ghost-button" data-action="toast" data-message="请选择参考图文件">${icon("upload")}参考图</button>
              </div>
              <textarea>生成${asset.name}${currentVariant.name}，${asset.meta}，${currentVariant.tone}，国漫二次元，角色一致性强，干净背景。</textarea>
              <div class="generation-control-row">
                <button class="control-pill active" data-action="toast" data-message="已选择 Seedance 2.0">Seedance 2.0</button>
                <button class="control-pill" data-action="toast" data-message="已切换为 9:16">9:16</button>
                <button class="primary-button" data-action="toast" data-message="已提交${asset.name}形象生成任务">生成形象</button>
              </div>
            </section>
          </div>

          <section class="editor-section role-edit-panel">
            <div class="editor-section-head">
              <span>${typeLabel}编辑区</span>
              <button class="ghost-button" data-action="toast" data-message="已保存${asset.name}编辑内容">${icon("check")}保存</button>
            </div>
            <div class="role-edit-body">
              <div class="role-image-preview"><span>${asset.name.slice(0, 1)}</span></div>
              <div class="role-field-grid">
                <label><span>${typeLabel}名称</span><input value="${asset.name}" /></label>
                <label><span>音色</span><input value="${typeLabel === "角色" ? "冷静女声 / 克制反击" : "默认旁白"}" /></label>
                <label class="wide"><span>出现场次</span><input value="${asset.used} / ${currentVariant.scene}" /></label>
                <label class="wide"><span>当前子形象</span><input value="${currentVariant.name} · ${currentVariant.status}" /></label>
              </div>
              <div class="role-meta-box">
                <b>角色描述</b>
                <p>${asset.meta}，${currentVariant.tone}。用于后续分镜复用，生成时保持五官、服饰主色和气质一致。</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  `;
}

function mangaStoryboardPage() {
  const roleTiles = ["苏念薇-基础形象", "萧景川-基础形象", "柳如烟-柔弱伪装", "宇文渊-压迫感"];
  const sceneTiles = ["家别墅的薰衣草花园", "皇宫长街", "凤仪殿", "冷宫偏院"];
  const shotCards = [
    ["1", "全景", "3s", "皇宫长街建立空间", "scene"],
    ["2", "中景", "3s", "萧景川假意深情", "rain"],
    ["2", "中景", "3s", "苏念薇掀帘", "girl"],
    ["2", "特写", "3s", "红帕砸脸反击", "face"],
    ["2", "中景", "3s", "花轿驶入宫门", "sun"],
    ["2", "中景", "3s", "宫门禁军列队", "sun"],
    ["2", "中景", "3s", "柳如烟落泪", "sun"],
    ["2", "中景", "3s", "宇文渊初现", "sun"]
  ];
  return mangaPageShell(
    "Step 04",
    "分镜制作",
    "选择集数与场次，把剧本、资产、镜头提示词和视频生成结果放在同一个编辑页面。",
    `
      <div class="storyboard-workbench">
        <aside class="story-switcher">
          <span>切换剧集</span>
          ${["第一集", "第二集", "第三集", "第四集", "第四集", "第四集"].map((ep, index) => `
            <section>
              <button class="story-episode-head" data-action="toast" data-message="已切换${ep}场次列表">${ep}<span>${index === 0 ? "⌄" : "⌃"}</span></button>
              ${index === 0 ? `
	                ${["1-1", "1-2", "1-3", "1-4"].map(id => `<button class="story-scene-link ${state.selectedMangaScene === id ? "active" : ""}" data-manga-scene="${id}">${id}</button>`).join("")}
              ` : ""}
            </section>
          `).join("")}
        </aside>

        <section class="panel story-asset-panel">
          <div class="panel-head"><span>资产库</span><button class="ghost-button" data-action="toast" data-message="请选择要上传的资产">${icon("upload")}上传</button></div>
          <div class="story-asset-scroll">
            <div class="story-asset-group">
              <h3>${icon("asset")}角色</h3>
              <div class="story-asset-grid">${roleTiles.map((item, index) => storyboardAssetTile(item, index, "role")).join("")}</div>
            </div>
            <div class="story-asset-group">
              <h3>${icon("layout")}场景</h3>
              <div class="story-asset-grid">${sceneTiles.map((item, index) => storyboardAssetTile(item, index, "scene")).join("")}</div>
            </div>
          </div>
        </section>

        <section class="story-script-stack">
          <section class="panel story-source-panel">
            <div class="panel-head"><span>原文</span><button class="ghost-button" data-action="toast" data-message="已提交分镜拆解任务">${icon("board")}分镜拆解</button></div>
            <div class="story-source-text">
              <p>雨水敲在青瓦上，冷宫偏院里灯影摇晃。柳如烟披着斗篷，悄悄推门而入。</p>
              <p>柳如烟（压低声音）：姐姐，你以为进了宫，就能翻身吗？</p>
              <p>苏念薇（抬眼）：我能不能翻身不重要，重要的是，你快藏不住了。</p>
              <p>雨水敲在青瓦上，冷宫偏院里灯影摇晃。柳如烟披着斗篷，悄悄推门而入。</p>
            </div>
          </section>
          <section class="panel story-prompt-panel">
            <div class="panel-head"><span>提示词</span><button class="ghost-button" data-action="toast" data-message="已打开创作指南">创作指南</button></div>
            <div class="story-prompt-area">描述你的想法，@ 引用角色/资产/场景...</div>
            <div class="story-prompt-footer">
              <label class="reference-select"><span>@</span><select><option>全能参考</option><option>收尾帧</option></select></label>
              <span>Seedance 2.0 · Fast</span><span>${icon("clock")}15s</span><button class="send-dot" data-action="toast" data-message="已提交镜头生成任务">↑</button>
            </div>
          </section>
        </section>

        <section class="panel story-preview-panel">
          <div class="story-preview-actions"><button data-action="toast" data-message="已打开历史版本">${icon("clock")}历史</button><button data-action="toast" data-message="已创建导出任务">${icon("download")}导出</button></div>
          <div class="story-video-frame">
            <div class="city-window"></div>
            <div class="video-control"><b>Ⅱ</b><span>00:00 / 05:30</span></div>
          </div>
        </section>

        <section class="panel story-shot-rail">
          <div class="shot-card-row">
            ${shotCards.map((shot, index) => storyboardShotCard(shot, index)).join("")}
          </div>
        </section>
      </div>
    `,
    flowFooter("assets", null, ""),
    { hideTitle: true }
  );
}

function storyboardAssetTile(title, index, type) {
  return `
    <article class="story-asset-tile">
      <div class="story-asset-thumb ${type}"><span>${index % 2 === 0 ? "◌" : "◎"}</span></div>
      <b>${title}</b>
    </article>
  `;
}

function storyboardShotCard(shot, index) {
  const [no, type, duration, title, tone] = shot;
  return `
    <article class="story-shot-card ${index === 0 ? "active" : ""}">
      ${index === 0 ? `<button class="shot-insert left" data-action="toast" data-message="已在当前镜头前插入空分镜">＋</button><button class="shot-insert right" data-action="toast" data-message="已在当前镜头后插入空分镜">＋</button>` : ""}
      <div class="shot-meta"><span>${no}</span><b>${type}</b><em>${duration}</em></div>
      <strong>第1集：订婚惊变妹妹夺爱</strong>
      <div class="shot-thumb ${tone}"></div>
    </article>
  `;
}
function assetRow(asset) {
  return `
    <article class="asset-row">
      <div class="asset-thumb">${asset.name.slice(0, 1)}</div>
      <div><b>${asset.name}</b><span>${asset.meta}</span><em>${asset.used}</em></div>
      <strong>${asset.status}</strong>
    </article>
  `;
}

function modeStageRail(stages, current, dataAttr, tone = "") {
  const currentIndex = stages.findIndex(stage => stage.id === current);
  return `
    <div class="stage-rail ${tone}">
      ${stages.map((stage, index) => {
        const status = index < currentIndex ? "done" : index === currentIndex ? "active" : "todo";
        return `
          <button class="stage-chip ${current === stage.id ? "active" : ""} ${status}" data-${dataAttr}="${stage.id}">
            <span>${index + 1}</span>${stage.label}
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function modePageShell(eyebrow, title, desc, content, footer = "", options = {}) {
  return `
    <div class="mode-page ${options.className || ""}">
      ${options.hideTitle ? "" : `<div class="mode-page-title">
        <div>
          <p class="eyebrow">${eyebrow}</p>
          <h2>${title}</h2>
          <span>${desc}</span>
        </div>
      </div>`}
      ${content}
      ${footer}
    </div>
  `;
}

function modeFlowFooter(prev, next, dataAttr, primaryLabel = "下一步") {
  return `
    <div class="flow-footer">
      ${prev ? `<button class="ghost-button" data-${dataAttr}="${prev}">上一步</button>` : `<span></span>`}
      <div>
        <button class="ghost-button" data-action="toast" data-message="当前页面草稿已保存">${icon("check")}保存草稿</button>
        ${next ? `<button class="primary-button" data-${dataAttr}="${next}">${primaryLabel}</button>` : ""}
      </div>
    </div>
  `;
}

function shortStudio() {
  return `
    ${modeStageRail(shortStages, state.shortStage, "short-stage", "blue")}
    ${shortStagePage()}
  `;
}

function shortStagePage() {
  if (state.shortStage === "topics") return shortTopicsPage();
  if (state.shortStage === "script") return shortScriptPage();
  if (state.shortStage === "assets") return shortAssetsPage();
  return shortVideoPage();
}

function shortTopicsPage() {
  return modePageShell(
    "Step 01",
    "热点选题",
    "从热点池筛选可制作选题，确认角度、目标账号和首屏钩子。",
    `
      <div class="feature-disabled-banner">
        <b>功能暂时无效</b>
        <span>热点选题工作流还在确认中，当前仅保留页面占位。</span>
      </div>
      <div class="short-topic-layout feature-disabled-content" aria-disabled="true">
        <section class="panel">
          <div class="panel-head"><span>热点池</span><button class="ghost-button disabled" data-action="forbidden" data-message="热点选题功能暂时无效">${icon("clock")}刷新</button></div>
          <div class="mini-filter-bar">${["全部", "剧情", "情感", "悬疑"].map(item => `<button class="${state.shortTopicFilter === item ? "active" : ""} disabled" data-action="forbidden" data-message="热点选题功能暂时无效">${item}</button>`).join("")}</div>
          <div class="topic-list roomy">
            ${hotTopics.map((topic, index) => `
              <button class="topic-card disabled ${state.selectedTopic === index ? "active" : ""}" data-action="forbidden" data-message="热点选题功能暂时无效">
                <b>${topic.title}</b><span>热度 ${topic.heat} · ${topic.angle}</span><em>${topic.status}</em>
              </button>
            `).join("")}
          </div>
        </section>
        <section class="panel topic-detail-card">
          <div class="panel-head"><span>选题详情</span><button class="ghost-button disabled" data-action="forbidden" data-message="热点选题功能暂时无效">认领</button></div>
          <div class="topic-score">
            <div><b>92</b><span>热度</span></div>
            <div><b>低</b><span>重复风险</span></div>
            <div><b>58s</b><span>建议时长</span></div>
          </div>
          <div class="script-card">
            <div class="script-meta">推荐角度</div>
            <h3>真假千金身份曝光</h3>
            <p>前三秒直接抛出“她以为自己是替身，其实她才是真千金”的反转，把身份错位、家族羞辱和继承权冲突压缩成一条短视频。</p>
            <div class="line-list"><span>目标账号：剧情反转号 A</span><span>首屏钩子：你以为她输了，其实全场都在等她摊牌。</span><span>风险：同题材素材多，需强调遗嘱和董事会场景。</span></div>
          </div>
          <div class="topic-angle-grid">
            <article><b>用户情绪</b><span>替身羞辱、身份逆转、迟来的后悔</span></article>
            <article><b>素材需求</b><span>宴会厅、遗嘱文件、女主冷脸特写</span></article>
          </div>
        </section>
      </div>
    `,
    `
      <div class="flow-footer feature-disabled-footer">
        <span></span>
        <div>
          <button class="ghost-button disabled" data-action="forbidden" data-message="热点选题功能暂时无效">${icon("check")}保存草稿</button>
          <button class="primary-button disabled" data-action="forbidden" data-message="热点选题功能暂时无效">进入脚本制作</button>
        </div>
      </div>
    `,
    { className: "short-topic-disabled" }
  );
}

function shortScriptPage() {
  const scriptRows = [
    { shot: "01", time: "0-3s", visual: "宴会厅门口，女主被保安拦下，镜头快速推近她抬眼。", voice: "所有人都以为她只是被抛弃的替身。", subtitle: "所有人都以为她只是替身" },
    { shot: "02", time: "3-12s", visual: "男主站在人群中央沉默，亲友低声嘲笑，女主攥紧手包。", voice: "可他们不知道，今晚真正该离场的人不是她。", subtitle: "今晚该离场的人不是她" },
    { shot: "03", time: "12-28s", visual: "律师推门进入，递上遗嘱文件，宴会厅瞬间安静。", voice: "遗嘱公开的那一刻，所有人的脸色都变了。", subtitle: "遗嘱公开，全场变脸" },
    { shot: "04", time: "28-45s", visual: "女主翻开文件，特写显示继承人姓名，男主猛地抬头。", voice: "她不是替身，她才是唯一继承人。", subtitle: "她才是唯一继承人" },
    { shot: "05", time: "45-58s", visual: "男主追到门口，女主坐进车里，没有回头。", voice: "他终于后悔，可她只说了两个字：晚了。", subtitle: "晚了" }
  ];
  return modePageShell(
    "Step 02",
    "脚本制作",
    "按固定分镜格式写短视频脚本：镜号、时间、画面、配音、字幕，方便后续提取资产和生成视频。",
    `
	      <div class="short-script-layout short-script-layout-full">
	        <section class="panel short-script-table-panel">
	          <div class="panel-head"><span>分镜脚本</span><button class="ghost-button" data-action="toast" data-message="已提交脚本补全任务">AI补全空格</button></div>
	          <div class="script-format-table-wrap">
            <table class="script-format-table">
              <thead>
                <tr><th>镜号</th><th>时间</th><th>画面</th><th>配音</th><th>字幕</th></tr>
              </thead>
              <tbody>
                ${scriptRows.map(row => `
                  <tr>
                    <td><b>${row.shot}</b></td>
                    <td>${row.time}</td>
                    <td>${row.visual}</td>
                    <td>${row.voice}</td>
                    <td>${row.subtitle}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
	          </div>
	          <button class="table-add-row" data-action="toast" data-message="已新增镜头草稿">${icon("plus")}新增镜头</button>
	        </section>
	      </div>
	    `,
    modeFlowFooter("topics", "assets", "go-short", "提取资产")
  );
}

function shortAssetsPage() {
  return modePageShell(
    "Step 03",
    "提取资产",
    "从脚本中抽取角色、场景、音乐和模板，生成视频制作所需资产。",
    `
      <div class="short-assets-layout">
        <section class="panel">
          <div class="panel-head"><span>资产清单</span><button class="ghost-button" data-action="toast" data-message="已创建短视频资产批量生成任务">批量生成</button></div>
          ${["角色：落魄女主 · 已复用", "场景：宴会厅 · 待生成", "道具：遗嘱文件 · 待生成", "音乐：冷感悬疑 · 已选择", "模板：剧情反转封面 · 已选择"].map((item, index) => `<div class="queue-row asset-task ${index === 1 ? "waiting" : ""}"><span></span><b>${item}</b><button data-action="toast" data-message="已打开${item.split("：")[0]}设置">${index < 2 ? "查看" : "更改"}</button></div>`).join("")}
        </section>
        <section class="panel">
          <div class="panel-head"><span>生成队列</span><button class="ghost-button" data-action="toast" data-message="生成队列已提交">提交生成</button></div>
          <div class="asset-preview-grid compact">
            ${["女", "宴", "遗", "音", "封", "字"].map((item, index) => `<button class="${index === 0 ? "active" : ""}" data-action="toast" data-message="已选中${["角色", "场景", "道具", "音乐", "封面", "字幕"][index]}资产"><b>${item}</b><span>${["角色", "场景", "道具", "音乐", "封面", "字幕"][index]}</span></button>`).join("")}
          </div>
          <div class="generation-note"><b>当前建议</b><span>先生成宴会厅和遗嘱文件，再进入视频制作页统一合成。</span></div>
        </section>
      </div>
    `,
    modeFlowFooter("script", "video", "go-short", "进入视频制作")
  );
}

function shortVideoPage() {
  const roleTiles = ["落魄女主-冷脸特写", "沉默男主-宴会西装", "律师-遗嘱宣读", "群演-宴会宾客"];
  const sceneTiles = ["宴会厅入口", "遗嘱宣读区", "门口车内", "冷色字幕模板"];
  const shortShots = [
    ["1", "近景", "3s", "女主被拦下", "girl"],
    ["2", "中景", "9s", "男主沉默", "rain"],
    ["3", "全景", "16s", "律师进入宴会厅", "scene"],
    ["4", "特写", "17s", "遗嘱继承人姓名", "face"],
    ["5", "中景", "13s", "女主上车离开", "sun"]
  ];
  return modePageShell(
    "Step 04",
    "视频制作",
    "把脚本、资产、配音和字幕组合成可预览、可导出的短视频。",
    `
      <div class="storyboard-workbench short-video-workbench">
        <aside class="story-switcher short-shot-switcher">
          <span>切换镜号</span>
          <section>
            ${shortShots.map((shot, index) => `
              <button class="story-scene-link ${state.selectedShortShot === index ? "active" : ""}" data-short-shot="${index}">
                镜${shot[0]}<em>${shot[2]}</em>
              </button>
            `).join("")}
          </section>
        </aside>

        <section class="panel story-asset-panel">
          <div class="panel-head"><span>资产库</span><button class="ghost-button" data-action="toast" data-message="请选择要上传的短视频资产">${icon("upload")}上传</button></div>
          <div class="story-asset-scroll">
            <div class="story-asset-group">
              <h3>${icon("asset")}角色</h3>
              <div class="story-asset-grid">${roleTiles.map((item, index) => storyboardAssetTile(item, index, "role")).join("")}</div>
            </div>
            <div class="story-asset-group">
              <h3>${icon("layout")}场景 / 模板</h3>
              <div class="story-asset-grid">${sceneTiles.map((item, index) => storyboardAssetTile(item, index, "scene")).join("")}</div>
            </div>
          </div>
        </section>

        <section class="story-script-stack">
          <section class="panel story-source-panel">
            <div class="panel-head"><span>脚本</span><button class="ghost-button" data-action="toast" data-message="已重新拆分镜头">${icon("board")}拆分镜头</button></div>
            <div class="story-source-text">
              <p><b>镜1 · 0-3s</b></p>
              <p>画面：宴会厅门口，女主被保安拦下，镜头快速推近她抬眼。</p>
              <p>配音：所有人都以为她只是被抛弃的替身。</p>
              <p>字幕：所有人都以为她只是替身</p>
            </div>
          </section>
          <section class="panel story-prompt-panel">
            <div class="panel-head"><span>提示词</span><button class="ghost-button" data-action="toast" data-message="已打开短视频创作指南">创作指南</button></div>
            <div class="story-prompt-area">描述镜头生成要求，@ 引用角色/资产/场景...</div>
            <div class="story-prompt-footer">
              <label class="reference-select"><span>@</span><select><option>全能参考</option><option>收尾帧</option></select></label>
              <span>Seedance 2.0 · Fast</span><span>${icon("clock")}15s</span><button class="send-dot" data-action="toast" data-message="已提交短视频镜头生成任务">↑</button>
            </div>
          </section>
        </section>

        <section class="panel story-preview-panel">
          <div class="story-preview-actions"><button data-action="toast" data-message="已打开短视频历史版本">${icon("clock")}历史</button><button data-action="toast" data-message="已创建短视频导出任务">${icon("download")}导出</button></div>
          <div class="story-video-frame short-story-frame">
            <div class="short-video-scene"></div>
            <div class="video-control"><b>Ⅱ</b><span>00:00 / 00:58</span></div>
          </div>
        </section>

        <section class="panel story-shot-rail">
          <div class="shot-card-row">
            ${shortShots.map((shot, index) => shortVideoShotCard(shot, index)).join("")}
          </div>
        </section>
      </div>
    `,
    modeFlowFooter("assets", null, "go-short", ""),
    { hideTitle: true }
  );
}

function shortVideoShotCard(shot, index) {
  const [no, type, duration, title, tone] = shot;
  return `
    <article class="story-shot-card ${state.selectedShortShot === index ? "active" : ""}" data-short-shot="${index}">
      ${index === 0 ? `<button class="shot-insert left" data-action="toast" data-message="已在当前镜头前插入空镜头">＋</button><button class="shot-insert right" data-action="toast" data-message="已在当前镜头后插入空镜头">＋</button>` : ""}
      <div class="shot-meta"><span>${no}</span><b>${type}</b><em>${duration}</em></div>
      <strong>短视频：真假千金身份曝光</strong>
      <div class="shot-thumb ${tone}"></div>
    </article>
  `;
}

function clipsStudio() {
  return `
    ${modeStageRail(clipStages, state.clipStage, "clip-stage", "red")}
    ${clipStagePage()}
  `;
}

function clipStagePage() {
  if (state.clipStage === "upload") return clipUploadPage();
  if (state.clipStage === "extract") return clipExtractPage();
  if (state.clipStage === "plan") return clipPlanPage();
  return clipBatchPage();
}

function clipUploadPage() {
  return modePageShell(
    "Step 01",
    "上传原剧本",
    "导入短剧原片或剧本文本，作为后续识别高能片段的来源。",
    `
      <div class="clip-upload-layout">
        <section class="panel">
          <div class="panel-head"><span>原片 / 原剧本</span><button class="ghost-button" data-action="toast" data-message="请选择新的原片或剧本文本">替换文件</button></div>
          <div class="upload-card red">
            <div class="file-badge">TXT</div>
            <div><b>短剧第08集_原剧本.txt</b><span>6,120 字 · 已匹配原片 18:40</span></div>
          </div>
          <div class="field-grid-compact">
            <label>识别模型<button data-action="toast" data-message="已打开识别模型选择">clip-parser 1.8</button></label>
            <label>切片目标<button data-action="toast" data-message="已打开切片目标选择">抖音 / 快手竖版</button></label>
            <label>输出比例<button data-action="toast" data-message="已打开输出比例选择">9:16</button></label>
            <label>语言<button data-action="toast" data-message="已打开语言选择">中文普通话</button></label>
          </div>
        </section>
        <section class="panel">
          <div class="panel-head"><span>识别概览</span><button class="ghost-button" data-action="toast" data-message="已重新提交识别任务">重新识别</button></div>
          <div class="extract-metrics">
            <div><b>31</b><span>金句</span></div>
            <div><b>7</b><span>反转</span></div>
            <div><b>18</b><span>冲突</span></div>
          </div>
          <div class="script-card"><div class="script-meta">建议</div><h3>先按冲突点生成候选切片</h3><p>第 08 集有身份暴露、追妻反悔、遗嘱公开三类高能片段，适合先生成 20-30 条候选。</p></div>
          <div class="clip-source-strip"><span>原片已对齐</span><span>字幕轨完整</span><span>音频可识别</span></div>
        </section>
      </div>
    `,
    modeFlowFooter(null, "extract", "go-clip", "提取脚本")
  );
}

function clipExtractPage() {
  return modePageShell(
    "Step 02",
    "提取脚本",
    "把原剧本拆成可切片的片段、金句、冲突点和上下文。",
    `
      <div class="clip-extract-layout">
        <section class="panel">
          <div class="panel-head"><span>脚本片段</span><button class="ghost-button" data-action="toast" data-message="已合并选中的脚本片段">合并片段</button></div>
          ${clipRows.map((row, index) => `<article class="clip-segment ${state.selectedClipSegment === index ? "active" : ""}" data-clip-segment="${index}"><b>${row.title}</b><span>${row.span}</span><p>${row.label} · ${row.status}</p></article>`).join("")}
        </section>
        <section class="panel">
          <div class="panel-head"><span>片段详情</span><button class="ghost-button" data-action="toast" data-message="已生成切片点建议">生成切片点</button></div>
          <div class="script-card"><div class="script-meta">00:02:14 - 00:03:05</div><h3>女主身份暴露</h3><p>宴会现场所有人都以为女主会被赶走，遗嘱公开后，镜头转到女主特写，形成身份反转。</p><div class="line-list"><span>保留前置上下文：2.5s</span><span>爆点开始：00:02:41</span><span>建议标题：她不是替身，她才是唯一继承人</span></div></div>
          <div class="clip-timeline"><span style="width:18%"></span><b style="left:32%">爆点</b><em style="left:68%">收束</em></div>
        </section>
      </div>
    `,
    modeFlowFooter("upload", "plan", "go-clip", "生成切片方案")
  );
}

function clipPlanPage() {
  return modePageShell(
    "Step 03",
    "切片方案",
    "选择要批量生成的切片，确认标题、封面、字幕和节奏模板。",
    `
      <section class="panel clip-plan-page">
        <div class="panel-head"><span>候选切片</span><button class="ghost-button" data-action="toast" data-message="已生成候选标题">生成标题</button></div>
        <div class="clip-plan-head"><span>已选 2 条</span><span>预计导出 8 个版本</span><span>平均爆点分 91</span></div>
        ${clipRows.map((row, index) => `
          <article class="clip-row ${index < 2 ? "selected" : ""}" data-action="toast" data-message="已更新切片选择">
            <label><input type="checkbox" ${index < 2 ? "checked" : ""} /> ${row.title}</label>
            <span>${row.span}</span>
            <b>${row.score}</b>
            <em>${row.label}</em>
            <strong>${row.status}</strong>
          </article>
        `).join("")}
      </section>
    `,
    modeFlowFooter("extract", "batch", "go-clip", "进入批量成片")
  );
}

function clipBatchPage() {
  return modePageShell(
    "Step 04",
    "批量成片",
    "统一设置标题、封面、字幕、输出规格，并创建批量导出队列。",
    `
      <div class="clip-batch-layout">
        <section class="panel batch-panel">
          <div class="panel-head"><span>成片设置</span><button class="ghost-button" data-action="toast" data-message="模板已保存">保存模板</button></div>
          ${["标题模板：悬念 + 反转", "封面模板：人物特写 + 大字", "字幕样式：白字黑描边", "输出规格：1080x1920 / H.264"].map(item => `<div class="setting-row"><span>${item}</span><button data-action="toast" data-message="已打开${item.split("：")[0]}配置">更改</button></div>`).join("")}
          <button class="wide-action red" data-action="toast" data-message="已创建 26 条切片成片任务">批量成片</button>
        </section>
        <section class="panel">
          <div class="panel-head"><span>导出队列</span><button class="ghost-button" data-action="toast" data-message="已打开导出队列">${icon("download")}导出队列</button></div>
          ${["女主身份暴露 · 生成中", "男主反悔追妻 · 等待中", "反派当众被打脸 · 等待中", "遗嘱公开 · 待改标题"].map((item, index) => `<div class="queue-row clip-export ${index === 0 ? "active" : ""}"><span></span><b>${item}</b><button data-action="toast" data-message="已打开导出任务菜单">${icon("more")}</button></div>`).join("")}
        </section>
      </div>
    `,
    modeFlowFooter("plan", null, "go-clip", "")
  );
}

function renderWorkbench() {
  return `
    <section class="page-block">
      <div class="page-title"><div><p class="eyebrow">任务首页</p><h1>生产工作台</h1></div></div>
      <div class="metric-grid">
        ${[
          ["项目总数", "46", "算力消耗", "18,420"],
          ["漫剧项目总数", "18", "算力消耗", "9,860"],
          ["短视频项目总数", "16", "算力消耗", "4,210"],
          ["切片项目总数", "12", "算力消耗", "4,350"]
        ].map(card => `
          <article class="metric-card">
            <div class="metric-pair"><span>${card[0]}</span><b>${card[1]}</b></div>
            <div class="metric-pair"><span>${card[2]}</span><b>${card[3]}</b></div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderProjects() {
  const projectTabs = ["全部", "漫剧", "短视频", "切片"];
  const visibleProjects = state.projectFilter === "全部"
    ? projects.map((project, index) => ({ project, index }))
    : projects.map((project, index) => ({ project, index })).filter(item => item.project.type === state.projectFilter);
  return `
    <section class="page-block">
      <div class="page-title"><div><p class="eyebrow">总项目容器</p><h1>项目</h1></div></div>
      <div class="project-toolbar">
        ${projectTabs.map(tab => `<button class="filter ${state.projectFilter === tab ? "active" : ""}" data-project-filter="${tab}">${tab}</button>`).join("")}
      </div>
      <div class="project-card-grid">
        ${visibleProjects.map(({ project, index }) => `
          <article class="project-tile ${index === state.selectedProject ? "active" : ""}" data-project-index="${index}">
            <div class="tile-head">
              <span class="tag ${toneFor(project.type)}">${project.type}</span>
              <div class="tile-head-right"><b>${project.due}</b><button data-action="toast" data-message="已打开项目菜单">${icon("more")}</button></div>
            </div>
            <h2>${project.name}</h2>
            <p>${project.status} · ${project.count}</p>
            <div class="progress"><span style="width:${project.progress}%"></span></div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderAssets() {
  const assetMap = {
    roles: roleAssets,
    scenes: sceneAssets,
    props: propAssets,
    music: musicAssets,
    templates: templateAssets
  };
  const assets = assetMap[state.libraryAssetFilter] || roleAssets;
  const currentTab = assetLibraryTabs.find(tab => tab.id === state.libraryAssetFilter) || assetLibraryTabs[0];
  return `
    <section class="page-block">
      <div class="page-title"><div><p class="eyebrow">可复用资产库</p><h1>资产</h1></div></div>
      <div class="asset-toolbar">
        ${assetLibraryTabs.map(tab => `<button class="filter ${state.libraryAssetFilter === tab.id ? "active" : ""}" data-library-asset-filter="${tab.id}">${tab.label} ${tab.count}</button>`).join("")}
      </div>
      <div class="library-grid">
        ${assets.map((asset, index) => `
          <article class="library-card ${state.selectedLibraryAsset === index ? "active" : ""}" data-library-asset-index="${index}">
            <div class="library-thumb">${asset.name.slice(0, 1)}</div>
            <h2>${asset.name}</h2>
            <p>${asset.meta}</p>
            <div><span>${currentTab.label}资产</span><b>${asset.status}</b></div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTeam() {
  if (!hasPermission("team:view")) {
    return `
      <section class="page-block">
        <div class="empty-state">
          <p class="eyebrow">权限控制</p>
          <h1>无团队管理权限</h1>
          <p>当前角色只能进入被授权的制作与项目页面。</p>
        </div>
      </section>
    `;
  }
  const roleTabs = ["全部", ...roleDefinitions.map(role => role.label)];
  const visibleMembers = state.teamFilter === "全部"
    ? teamMembers.map((member, index) => ({ member, index }))
    : teamMembers.map((member, index) => ({ member, index })).filter(item => roleById(item.member.role).label === state.teamFilter);
  const selected = teamMembers[state.selectedTeamMember] || teamMembers[0];
  const activeRole = roleById(state.selectedMemberRole || selected.role);
  return `
    <section class="page-block">
      <div class="page-title">
        <div><p class="eyebrow">账号与权限</p><h1>团队管理</h1></div>
        ${guardedButton("team:manage", "primary-button", `${icon("plus")}邀请员工`, "已打开邀请员工面板")}
      </div>
      <div class="team-layout">
        <section class="panel team-list-panel">
          <div class="panel-head"><span>员工账号</span><button class="ghost-button" data-action="toast" data-message="员工列表已刷新">${icon("clock")}刷新</button></div>
          <div class="team-filter-row">
            ${roleTabs.map(tab => `<button class="filter ${state.teamFilter === tab ? "active" : ""}" data-team-filter="${tab}">${tab}</button>`).join("")}
          </div>
          <div class="member-list">
            ${visibleMembers.map(({ member, index }) => `
              <article class="member-row ${state.selectedTeamMember === index ? "active" : ""}" data-team-member="${index}">
                <span class="member-avatar">${member.name.slice(0, 1)}</span>
                <div><b>${member.name}</b><em>${roleById(member.role).label} · ${member.scope}</em></div>
                <strong>${member.status}</strong>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="panel member-detail-panel">
          <div class="panel-head"><span>成员详情</span>${guardedButton("team:manage", "ghost-button", `${icon("check")}保存权限`, `已保存${selected.name}权限`)}</div>
          <div class="member-detail-body">
            <div class="member-profile-head">
              <span class="member-avatar large">${selected.name.slice(0, 1)}</span>
              <div><h2>${selected.name}</h2><p>${selected.status} · 最近活跃 ${selected.lastActive}</p></div>
            </div>
            <div class="member-stat-grid">
              <div><span>项目范围</span><b>${selected.scope}</b></div>
              <div><span>算力消耗</span><b>${selected.usage}</b></div>
              <div><span>当前角色</span><b>${activeRole.label}</b></div>
            </div>
            <div class="role-select-grid">
              ${roleDefinitions.map(role => `
                <button class="role-option ${activeRole.id === role.id ? "active" : ""}" data-member-role="${role.id}">
                  <b>${role.label}</b><span>${role.desc}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </section>

        <section class="panel permission-panel">
          <div class="panel-head"><span>权限矩阵</span><button class="ghost-button" data-action="toast" data-message="已复制权限配置">复制配置</button></div>
          <div class="permission-matrix">
            <div class="matrix-head"><span>角色</span>${permissionGroups.map(permission => `<span>${permission.label}</span>`).join("")}</div>
            ${roleDefinitions.map(role => `
              <div class="matrix-row">
                <b>${role.label}</b>
                ${permissionGroups.map(permission => `<span class="${role.permissions.includes(permission.id) ? "on" : ""}">${role.permissions.includes(permission.id) ? "✓" : "—"}</span>`).join("")}
              </div>
            `).join("")}
          </div>
        </section>
      </div>
    </section>
  `;
}

function render() {
  if (!state.isAuthenticated) {
    document.getElementById("app").innerHTML = renderLogin();
    return;
  }
  const content = state.section === "workbench"
    ? renderWorkbench()
    : state.section === "projects"
    ? renderProjects()
    : state.section === "assets"
    ? renderAssets()
    : state.section === "team"
    ? renderTeam()
    : renderStudio();
  document.getElementById("app").innerHTML = shell(content);
}

document.addEventListener("click", (event) => {
  const login = event.target.closest("[data-login]");
  const logout = event.target.closest("[data-logout]");
  const loginMode = event.target.closest("[data-login-mode]");
  const nav = event.target.closest("[data-section]");
  const studioTab = event.target.closest("[data-studio-tab]");
  const mangaStage = event.target.closest("[data-manga-stage]");
  const goStage = event.target.closest("[data-go-stage]");
  const shortStage = event.target.closest("[data-short-stage]");
  const goShort = event.target.closest("[data-go-short]");
  const clipStage = event.target.closest("[data-clip-stage]");
  const goClip = event.target.closest("[data-go-clip]");
  const assetFilter = event.target.closest("[data-asset-filter]");
  const libraryAssetFilter = event.target.closest("[data-library-asset-filter]");
  const assetCard = event.target.closest("[data-asset-card]");
  const openAssetEditor = event.target.closest("[data-open-asset-editor]");
  const closeAssetEditor = event.target.matches("[data-close-asset-editor]") || event.target.closest("button[data-close-asset-editor]");
  const assetVariant = event.target.closest("[data-asset-variant]");
  const libraryAsset = event.target.closest("[data-library-asset-index]");
  const mangaScene = event.target.closest("[data-manga-scene]");
  const topicFilter = event.target.closest("[data-topic-filter]");
  const topicCard = event.target.closest("[data-topic-index]");
  const shortShot = event.target.closest("[data-short-shot]");
  const clipSegment = event.target.closest("[data-clip-segment]");
  const projectFilter = event.target.closest("[data-project-filter]");
  const projectTile = event.target.closest("[data-project-index]");
  const teamFilter = event.target.closest("[data-team-filter]");
  const teamMember = event.target.closest("[data-team-member]");
  const memberRole = event.target.closest("[data-member-role]");
  const action = event.target.closest("[data-action]");
  const inertButton = event.target.closest("button");
  const handled = login || logout || loginMode || nav || studioTab || mangaStage || goStage || shortStage || goShort || clipStage || goClip || assetFilter || libraryAssetFilter || assetCard || openAssetEditor || closeAssetEditor || assetVariant || libraryAsset || mangaScene || topicFilter || topicCard || shortShot || clipSegment || projectFilter || projectTile || teamFilter || teamMember || memberRole || action;
  const nextState = {};

  if (loginMode) nextState.loginMode = loginMode.dataset.loginMode;
  if (login) {
    nextState.isAuthenticated = true;
    nextState.section = "workbench";
    nextState.selectedMemberRole = state.loginRole;
  }
  if (logout) {
    nextState.isAuthenticated = false;
    nextState.section = "workbench";
    nextState.assetEditorOpen = false;
  }
  if (nav) nextState.section = nav.dataset.section;
  if (studioTab) {
    nextState.section = "studio";
    nextState.studioTab = studioTab.dataset.studioTab;
  }
  if (mangaStage) nextState.mangaStage = mangaStage.dataset.mangaStage;
  if (goStage) nextState.mangaStage = goStage.dataset.goStage;
  if (shortStage) nextState.shortStage = shortStage.dataset.shortStage;
  if (goShort) nextState.shortStage = goShort.dataset.goShort;
  if (clipStage) nextState.clipStage = clipStage.dataset.clipStage;
  if (goClip) nextState.clipStage = goClip.dataset.goClip;
  if (assetFilter) nextState.assetFilter = assetFilter.dataset.assetFilter;
  if (libraryAssetFilter) {
    nextState.libraryAssetFilter = libraryAssetFilter.dataset.libraryAssetFilter;
    nextState.selectedLibraryAsset = 0;
  }
  if (assetCard) nextState.selectedAssetCard = Number(assetCard.dataset.assetCard) || 0;
  if (openAssetEditor) {
    nextState.selectedAssetCard = Number(openAssetEditor.dataset.openAssetEditor) || 0;
    nextState.selectedAssetVariant = 0;
    nextState.assetEditorOpen = true;
  }
  if (closeAssetEditor) nextState.assetEditorOpen = false;
  if (assetVariant) nextState.selectedAssetVariant = Number(assetVariant.dataset.assetVariant) || 0;
  if (libraryAsset) nextState.selectedLibraryAsset = Number(libraryAsset.dataset.libraryAssetIndex) || 0;
  if (mangaScene) nextState.selectedMangaScene = mangaScene.dataset.mangaScene;
  if (topicFilter) nextState.shortTopicFilter = topicFilter.dataset.topicFilter;
  if (topicCard) nextState.selectedTopic = Number(topicCard.dataset.topicIndex) || 0;
  if (shortShot) nextState.selectedShortShot = Number(shortShot.dataset.shortShot) || 0;
  if (clipSegment) nextState.selectedClipSegment = Number(clipSegment.dataset.clipSegment) || 0;
  if (projectFilter) {
    const filter = projectFilter.dataset.projectFilter;
    const firstVisibleIndex = filter === "全部" ? 0 : projects.findIndex(project => project.type === filter);
    nextState.projectFilter = filter;
    nextState.selectedProject = firstVisibleIndex >= 0 ? firstVisibleIndex : 0;
  }
  if (projectTile) nextState.selectedProject = Number(projectTile.dataset.projectIndex) || 0;
  if (teamFilter) {
    const filter = teamFilter.dataset.teamFilter;
    const firstVisibleIndex = filter === "全部" ? 0 : teamMembers.findIndex(member => roleById(member.role).label === filter);
    nextState.teamFilter = filter;
    nextState.selectedTeamMember = firstVisibleIndex >= 0 ? firstVisibleIndex : 0;
    nextState.selectedMemberRole = teamMembers[firstVisibleIndex >= 0 ? firstVisibleIndex : 0].role;
  }
  if (teamMember) {
    const index = Number(teamMember.dataset.teamMember) || 0;
    nextState.selectedTeamMember = index;
    nextState.selectedMemberRole = teamMembers[index].role;
  }
  if (memberRole) nextState.selectedMemberRole = memberRole.dataset.memberRole;

  if (Object.keys(nextState).length) setState(nextState);
  if (action) {
    if (action.dataset.action === "new-project") notify("已打开新建项目面板");
    if (action.dataset.action === "toast") notify(action.dataset.message || "已执行");
    if (action.dataset.action === "forbidden") notify(action.dataset.message || "当前角色无权限");
  } else if (inertButton && !handled) {
    notify("该配置项已选中，后续可接入后端配置接口");
  }
});

render();
