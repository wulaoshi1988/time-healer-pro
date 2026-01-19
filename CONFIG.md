# 时光治愈者 - 配置说明

## 环境变量配置

复制 `.env.example` 为 `.env` 并填入你的API密钥

## 智谱AI API配置

1. 访问智谱AI开放平台：https://open.bigmodel.cn/
2. 注册账号并获取API Key
3. 将API Key填入 `.env` 文件中的 `ZHIPU_API_KEY`

### 环境变量说明

- `ZHIPU_API_KEY`: 智谱AI的API密钥（必填）
- `ZHIPU_API_URL`: 智谱AI的API地址（可选，默认已配置）
- `SERVER_PORT`: 后端服务器端口（可选，默认3001）

## 启动方式

### 完整启动（前端+后端）
```bash
npm run dev:all
```

### 单独启动
```bash
# 启动前端（端口5173）
npm run dev

# 启动后端（端口3001）
npm run server
```

## 注意事项

1. 确保 `.env` 文件中的API密钥有效
2. 后端服务器需要在3001端口运行
3. 前端会在5173端口运行
4. 如果API调用失败，请检查：
   - API密钥是否正确
   - 网络连接是否正常
   - 后端服务器是否启动