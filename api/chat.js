import { zhipu } from '@zhipuai/sdk';

export default async function handler(req, res) {
  // CORS设置
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    // 调用智谱AI API
    const zhipuResponse = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`
      },
      body: JSON.stringify({
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
      })
    });

    const data = await zhipuResponse.json();

    if (!zhipuResponse.ok) {
      console.error('智谱AI API 错误:', data);
      return res.status(500).json({ 
        success: false, 
        error: 'AI服务暂时不可用，请稍后再试' 
      });
    }

    const aiMessage = data.choices[0].message.content;

    res.json({ 
      success: true, 
      message: aiMessage 
    });

  } catch (error) {
    console.error('AI对话错误:', error);
    res.status(500).json({ 
      success: false, 
      error: 'AI服务暂时不可用，请稍后再试' 
    });
  }
}