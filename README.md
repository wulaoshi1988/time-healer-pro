# 时光治愈者 - 初中生心理治愈时光之旅

一个基于React + Vite + Tailwind CSS + Express.js开发的文字冒险心理治愈游戏，帮助初中生认识情绪、建立自信、学会应对压力。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动完整应用（前端+后端+AI）

```bash
npm run dev:all
```

或双击运行 `start-all.bat`

### 单独启动

```bash
# 前端开发服务器
npm run dev

# 后端服务器
npm run server
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## ✨ 功能特性

### 当前已实现

- **💬 AI对话界面**
  - 智能AI对话互动（集成智谱AI）
  - 情绪识别与共情回复
  - 预设选项快速回复
  - 自由输入对话
  - 打字动画效果
  - 对话历史记录
  - 上下文感知回复

- **📝 活动界面**
  - 优点镜任务
  - 情绪日记任务
  - 给未来的信任务
  - 任务提交反馈
  - 成就奖励系统

- **📊 数据看板**
  - 心理状态可视化（心情、自信、压力）
  - 成就解锁展示
  - 章节进度追踪
  - 动态数据更新

- **🤖 AI后端服务**
  - Express.js后端服务器
  - 智谱AI API集成
  - 上下文管理
  - 错误处理

## 🎨 技术栈

### 前端
- **框架**: React 19
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **语言**: JavaScript (JSX)

### 后端
- **框架**: Express.js
- **HTTP客户端**: Axios
- **环境管理**: dotenv
- **跨域处理**: CORS

### AI服务
- **AI模型**: 智谱AI GLM-4-Flash
- **API**: OpenAI兼容接口

## 📁 项目结构

```
time-healer-pro/
├── public/              # 静态资源
├── src/
│   ├── App.jsx         # 主应用组件（含所有UI组件）
│   ├── index.css       # 全局样式（Tailwind）
│   └── main.jsx        # 应用入口
├── server.js           # 后端服务器（Express + AI API）
├── .env.example       # 环境变量模板
├── .env               # 环境变量（需手动创建）
├── index.html          # HTML模板
├── package.json        # 项目配置
├── tailwind.config.js  # Tailwind配置
├── postcss.config.js   # PostCSS配置
├── start-all.bat      # 一键启动脚本
└── docs/              # 文档目录
    ├── CONFIG.md      # 配置说明
    ├── AI对话功能集成指南.md  # AI功能指南
    └── 快速开始AI功能.md     # 快速入门
```

## 🎯 核心组件说明

### App
主应用组件，管理视图切换和全局状态

### Header
顶部导航栏，显示当前状态和切换视图按钮

### DialogueView
对话界面，包含AI对话和选项回复

### ActivityView
活动界面，包含各类成长任务

### DashboardView
数据看板，展示心理状态和成就进度

### 子组件
- **StatBar**: 状态条组件
- **AchievementCard**: 成就卡片
- **ChapterCard**: 章节进度卡片

## 🎨 设计特色

- 柔和的渐变配色（紫粉色系）
- 圆角卡片设计
- 流畅的动画效果
- 响应式布局（适配移动端）
- 治愈系的视觉风格

## 🔧 开发计划

### ✅ 阶段1：UI基础
- [x] 对话界面
- [x] 活动界面
- [x] 数据看板
- [x] 基础交互

### 🔄 阶段2：内容完善
- [ ] 完善各章节对话内容
- [ ] 增加更多活动任务
- [ ] 添加心理知识点卡片

### ✅ 阶段3：功能扩展
- [x] 后端API集成
- [x] AI对话系统（智谱AI）
- [x] API密钥管理

### 🔄 阶段4：优化完善
- [ ] 对话历史持久化
- [ ] 性能优化
- [ ] 用户体验改进
- [ ] 测试与修复

## 🛡️ 安全与隐私

本游戏遵循以下原则：
- 用户数据优先本地存储
- 危机信号检测与干预
- 内容安全审核
- 隐私保护政策

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交问题和拉取请求！

## 🚀 AI对话功能快速配置

### 1. 获取智谱AI API密钥

访问 https://open.bigmodel.cn/ 注册并获取API Key

### 2. 配置环境变量

创建 `.env` 文件：

```env
ZHIPU_API_KEY=你的API密钥
```

### 3. 启动应用

```bash
npm run dev:all
```

### 详细文档

- [AI功能集成指南](AI对话功能集成指南.md)
- [详细配置说明](CONFIG.md)
- [快速开始AI功能](快速开始AI功能.md)

---

享受你的治愈时光之旅！💖