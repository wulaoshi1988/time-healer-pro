# AI对话功能集成指南

## 已集成内容

✅ 后端服务器（Express.js）
✅ 智谱AI API集成
✅ 前端API调用接口
✅ 配置文件管理

## 快速开始

### 1. 配置API密钥

创建 `.env` 文件并填入你的智谱AI API密钥：

```env
ZHIPU_API_KEY=你的API密钥
```

#### 如何获取智谱AI API密钥：

1. 访问 https://open.bigmodel.cn/
2. 注册/登录账号
3. 进入控制台
4. 创建API Key
5. 复制密钥到 `.env` 文件

### 2. 启动服务

**方式一：一键启动（推荐）**
```bash
双击 start-all.bat
```

**方式二：命令行启动**
```bash
npm run dev:all
```

**方式三：分别启动**
```bash
# 终端1 - 启动后端
npm run server

# 终端2 - 启动前端
npm run dev
```

### 3. 访问应用

- 前端：http://localhost:5173
- 后端API：http://localhost:3001

## 功能说明

### AI对话特性

1. **角色设定**：AI以"小光"的身份，温暖、耐心地与用户对话
2. **上下文感知**：AI会根据用户的当前状态（心情、自信、压力）调整回复
3. **章节感知**：AI会根据当前游戏章节提供相应内容
4. **情绪识别**：AI会根据对话内容识别用户情绪状态
5. **引导式提问**：AI会通过提问引导用户深入探索

### 系统提示词

AI的回复风格经过专门设计：
- 温暖、耐心、善解人意
- 用词简单，避免专业术语
- 多用共情式表达
- 适当使用emoji增加亲和力
- 引导式提问，而非说教

## 文件结构

```
time-healer-pro/
├── server.js              # 后端服务器（Express）
├── .env                   # 环境变量（需要手动创建）
├── .env.example          # 环境变量模板
├── src/App.jsx           # 前端组件（已集成API调用）
├── start-all.bat         # 一键启动脚本
├── CONFIG.md             # 详细配置说明
└── AI对话功能集成指南.md  # 本文件
```

## API接口

### POST /api/chat

**请求体：**
```json
{
  "messages": [
    { "role": "user", "content": "我感到很焦虑" },
    { "role": "ai", "content": "我理解你的感受..." }
  ],
  "playerStats": {
    "mood": 65,
    "confidence": 50,
    "stress": 40
  },
  "chapter": "启程"
}
```

**响应：**
```json
{
  "success": true,
  "message": "AI的回复内容"
}
```

### GET /api/health

健康检查接口

## 故障排除

### 后端无法启动

1. 检查3001端口是否被占用
2. 确保已安装所有依赖：`npm install`
3. 查看错误日志

### AI回复失败

1. 检查 `.env` 文件中的API密钥是否正确
2. 检查网络连接是否正常
3. 确认智谱AI账户余额充足

### 前端无法连接后端

1. 确保后端服务器正在运行（3001端口）
2. 检查CORS配置（已默认配置）
3. 查看浏览器控制台错误

## 费用说明

智谱AI API定价：
- 免费额度：新用户有免费使用额度
- 付费后：按tokens计费
- 使用 `glm-4-flash` 模型，费用较低

详细定价：https://open.bigmodel.cn/pricing

## 自定义配置

### 修改AI模型

编辑 `server.js` 中的 `model` 参数：

```javascript
{
  model: 'glm-4',  // 更强大的模型
  // 或
  model: 'glm-4-flash'  // 更快的模型
}
```

### 调整回复长度

修改 `max_tokens` 参数：

```javascript
{
  max_tokens: 200  // 回复最大字数
}
```

### 修改创意度

调整 `temperature` 参数（0-1）：

```javascript
{
  temperature: 0.7  // 越高越有创意
}
```

## 下一步计划

- [ ] 添加对话历史持久化
- [ ] 实现情绪追踪和可视化
- [ ] 添加多章节剧情
- [ ] 集成语音输入/输出
- [ ] 添加家长端同步功能

## 技术支持

如遇到问题，请检查：
1. CONFIG.md 中的配置说明
2. 后端日志输出
3. 浏览器控制台错误
4. 智谱AI API文档

---

**版本**: 1.0  
**更新时间**: 2026-01-19