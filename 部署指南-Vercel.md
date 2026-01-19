# 🚀 Vercel 快速部署指南

## 部署方式一：使用 Vercel（推荐）

### 优点
- ✅ 完全免费
- ✅ 支持前端+后端
- ✅ 自动HTTPS
- ✅ 自动部署（连接GitHub）
- ✅ 全球CDN加速

### 步骤

#### 1. 准备代码仓库

```bash
# 初始化Git仓库（如果还没有）
cd time-healer-pro
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到GitHub
# 先在GitHub创建新仓库，然后：
git remote add origin https://github.com/你的用户名/time-healer-pro.git
git branch -M main
git push -u origin main
```

#### 2. 注册 Vercel

1. 访问 https://vercel.com/
2. 使用GitHub账号登录
3. 点击 "Add New" → "Project"

#### 3. 配置项目

1. 选择你的GitHub仓库 `time-healer-pro`
2. Vercel会自动检测项目配置
3. 点击 "Deploy"

#### 4. 配置环境变量

部署完成后，在项目设置中添加环境变量：

1. 进入项目的 **Settings** → **Environment Variables**
2. 添加以下变量：
   - Name: `ZHIPU_API_KEY`
   - Value: `076d51eef15c496c844b27cdb23a7eeb.cPXG4U0Hu6bWMgaR`
3. 点击 "Save"

#### 5. 重新部署

添加环境变量后，需要重新部署：

1. 进入 **Deployments** 标签
2. 找到最新的部署
3. 点击右上角 **⋯** → **Redeploy**

#### 6. 访问你的网站

部署成功后，Vercel会提供一个URL，例如：
https://time-healer-pro.vercel.app

---

## 部署方式二：使用 Render

### 优点
- ✅ 免费额度充足
- ✅ 支持Node.js后端
- ✅ 更容易配置后端服务

### 步骤

#### 1. 准备代码仓库

同Vercel方式一

#### 2. 注册 Render

1. 访问 https://render.com/
2. 使用GitHub账号登录

#### 3. 部署Web服务

1. 点击 "New" → "Web Service"
2. 选择你的GitHub仓库
3. 配置：
   - Name: `time-healer-pro`
   - Environment: `Node`
   - Build Command: `npm run build`
   - Start Command: `node server.js`
4. 点击 "Create Web Service"

#### 4. 配置环境变量

在Environment Variables部分添加：
- Key: `ZHIPU_API_KEY`
- Value: `你的API密钥`

#### 5. 等待部署

Render会自动构建和部署，通常需要3-5分钟

---

## 部署方式三：使用 Railway

### 优点
- ✅ 免费额度$5/月
- ✅ 非常简单易用
- ✅ 自动生成HTTPS

### 步骤

#### 1. 注册 Railway

1. 访问 https://railway.app/
2. 使用GitHub账号登录

#### 2. 新建项目

1. 点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择你的 `time-healer-pro` 仓库

#### 3. 配置项目

Railway会自动检测项目配置，确认：
- Build Command: `npm install && npm run build`
- Start Command: `node server.js`

#### 4. 添加环境变量

在项目的 "Variables" 标签中添加：
- Key: `ZHIPU_API_KEY`
- Value: `你的API密钥`

#### 5. 部署

点击 "Deploy" 开始部署

---

## 重要配置文件

### 创建 `vercel.json`（Vercel需要）

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

### 更新 `package.json`

确保有以下脚本：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "node server.js",
    "preview": "vite preview"
  }
}
```

---

## 部署前检查清单

- [ ] 代码已提交到GitHub
- [ ] API密钥已配置
- [ ] `package.json` 包含正确的启动脚本
- [ ] `.gitignore` 已配置（不要提交.env）
- [ ] 已创建 `vercel.json`（如果使用Vercel）

---

## 常见问题

### Q1: 部署后AI无法回复？

**A:**
1. 检查环境变量是否正确配置
2. 确认API密钥有效
3. 查看部署日志

### Q2: 如何更新网站？

**A:**
- Git提交代码到GitHub
- Vercel/Render会自动重新部署

### Q3: 如何查看部署日志？

**A:**
- Vercel: 进入项目 → Deployments → 点击部署 → Logs
- Render: 进入项目 → Logs
- Railway: 进入项目 → Logs

### Q4: 免费额度够用吗？

**A:**
- Vercel: 个人项目完全免费
- Render: 750小时/月免费
- Railway: $5/月免费额度

---

## 推荐方案

**如果你：**
- 想要最简单的部署 → **Vercel**
- 想要更好的后端支持 → **Render**
- 想要国内访问更快 → 腾讯云/阿里云

---

## 需要帮助？

查看详细文档：
- [Vercel文档](https://vercel.com/docs)
- [Render文档](https://render.com/docs)
- [Railway文档](https://docs.railway.app/)

---

**开始部署吧！** 🚀