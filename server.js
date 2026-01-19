import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors());
app.use(express.json());

// 智谱AI对话接口
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, playerStats, chapter } = req.body;

    // 构建系统提示词
    const systemPrompt = `你是"小光"，一个温暖、耐心、善解人意的时间旅行伙伴和心理导师。
你正在和一位初中生（12-15岁）进行对话，帮助他们探索和治愈内心的困扰。

你的角色定位：
- 温暖、耐心、幽默、善于倾听
- 用简单的语言，避免专业术语
- 多用共情式表达（如"我理解你的感受"、"这确实不容易"）
- 引导式提问，而不是直接给答案
- 适当使用emoji（😊😢💪等）增加亲和力

当前章节：${chapter || '启程'}
用户状态：心情${playerStats?.mood}/100，自信${playerStats?.confidence}/100，压力${playerStats?.stress}/100

回复风格：
- 每次回复控制在50-100字
- 结尾可以提出引导性问题，鼓励用户继续表达
- 保持温暖、支持和理解的语气
- 避免说教，多用开放式提问

特别注意：
- 如果用户表达负面情绪，先共情再引导
- 避免过于理性的分析
- 多用"我们一起"而不是"你应该"`;

    const response = await axios.post(
      process.env.ZHIPU_API_URL || 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      {
        model: 'glm-4-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(msg => ({
            role: msg.role === 'ai' ? 'assistant' : 'user',
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 200
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`
        }
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      message: aiMessage 
    });

  } catch (error) {
    console.error('智谱AI API 错误:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: 'AI服务暂时不可用，请稍后再试' 
    });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'time-healer-backend' });
});

// 本地运行
if (import.meta.env.PROD !== 'true') {
  app.listen(PORT, () => {
    console.log(`🚀 后端服务器运行在 http://localhost:${PORT}`);
    console.log(`📡 API端点: http://localhost:${PORT}/api/chat`);
  });
}

// Vercel部署
export default app;