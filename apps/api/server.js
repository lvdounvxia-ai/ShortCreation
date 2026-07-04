const http = require("http");
const { randomUUID } = require("crypto");
const { URL } = require("url");
const store = require("./data/store");
const { JOB_STATUS } = require("../../packages/shared/constants");

const PORT = Number(process.env.PORT || 8787);
const INVITE_CODE = process.env.INVITE_CODE || "JCG-2026";

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  res.end(JSON.stringify(payload, null, 2));
}

function notFound(res) {
  sendJson(res, 404, { error: "not_found" });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("body_too_large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function getUserFromRequest(req) {
  const userId = req.headers.authorization?.replace("Bearer ", "") || "user_001";
  return store.users.find(user => user.id === userId) || store.users[0];
}

function withOwner(project) {
  const owner = store.users.find(user => user.id === project.ownerId);
  return { ...project, owner };
}

function routeGet(req, res, url) {
  if (url.pathname === "/health") {
    return sendJson(res, 200, { ok: true, service: "juchuge-api", time: new Date().toISOString() });
  }

  if (url.pathname === "/api/me") {
    const user = getUserFromRequest(req);
    const role = store.roleDefinitions.find(item => item.id === user.role);
    return sendJson(res, 200, { user, role });
  }

  if (url.pathname === "/api/team/members") {
    return sendJson(res, 200, { members: store.users, roles: store.roleDefinitions });
  }

  if (url.pathname === "/api/projects") {
    const type = url.searchParams.get("type");
    const projects = store.projects
      .filter(project => !type || project.type === type)
      .map(withOwner);
    return sendJson(res, 200, { projects });
  }

  if (url.pathname === "/api/assets") {
    const type = url.searchParams.get("type");
    const projectId = url.searchParams.get("projectId");
    const assets = store.assets.filter(asset => {
      if (type && asset.type !== type) return false;
      if (projectId && asset.projectId !== projectId) return false;
      return true;
    });
    return sendJson(res, 200, { assets });
  }

  if (url.pathname === "/api/asset-variants") {
    const assetId = url.searchParams.get("assetId");
    const variants = store.assetVariants.filter(variant => !assetId || variant.assetId === assetId);
    return sendJson(res, 200, { variants });
  }

  if (url.pathname === "/api/scripts") {
    const projectId = url.searchParams.get("projectId");
    const scripts = store.scripts.filter(script => !projectId || script.projectId === projectId);
    return sendJson(res, 200, { scripts });
  }

  if (url.pathname === "/api/model-jobs") {
    const projectId = url.searchParams.get("projectId");
    const jobs = store.modelJobs.filter(job => !projectId || job.projectId === projectId);
    return sendJson(res, 200, { jobs });
  }

  return notFound(res);
}

async function routePost(req, res, url) {
  const body = await readBody(req);

  if (url.pathname === "/api/auth/login") {
    const user = store.users.find(item => item.email === body.email) || store.users[0];
    const role = store.roleDefinitions.find(item => item.id === user.role);
    return sendJson(res, 200, { token: user.id, user, role });
  }

  if (url.pathname === "/api/auth/register") {
    if (body.inviteCode !== INVITE_CODE) {
      return sendJson(res, 403, { error: "invalid_invite_code" });
    }
    const user = {
      id: `user_${randomUUID().slice(0, 8)}`,
      name: body.name || "新员工",
      email: body.email,
      role: "producer",
      status: "active"
    };
    store.users.push(user);
    const role = store.roleDefinitions.find(item => item.id === user.role);
    return sendJson(res, 201, { token: user.id, user, role });
  }

  if (url.pathname === "/api/model-jobs") {
    const user = getUserFromRequest(req);
    const job = {
      id: `job_${randomUUID().slice(0, 8)}`,
      projectId: body.projectId,
      type: body.type,
      model: body.model || "mock-model",
      status: JOB_STATUS.QUEUED,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      input: body.input || {},
      output: null
    };
    store.modelJobs.unshift(job);
    return sendJson(res, 201, { job });
  }

  if (url.pathname.startsWith("/api/model-jobs/") && url.pathname.endsWith("/run")) {
    const id = url.pathname.split("/")[3];
    const job = store.modelJobs.find(item => item.id === id);
    if (!job) return notFound(res);
    job.status = JOB_STATUS.SUCCEEDED;
    job.output = {
      message: "mock job completed",
      completedAt: new Date().toISOString()
    };
    return sendJson(res, 200, { job });
  }

  return notFound(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "OPTIONS") {
    return sendJson(res, 204, {});
  }

  try {
    if (req.method === "GET") return routeGet(req, res, url);
    if (req.method === "POST") return routePost(req, res, url);
    return sendJson(res, 405, { error: "method_not_allowed" });
  } catch (error) {
    return sendJson(res, 500, { error: "internal_error", message: error.message });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Juchuge API listening on http://127.0.0.1:${PORT}`);
});
