import { useState, useRef, useEffect } from 'react'

function App() {
    const [currentView, setCurrentView] = useState('dialogue')
    const [playerStats, setPlayerStats] = useState({
        mood: 65,
        confidence: 50,
        stress: 40,
        progress: 0
    })

    const viewComponents = {
        dialogue: DialogueView,
        activity: ActivityView,
        dashboard: DashboardView
    }

    const CurrentComponent = viewComponents[currentView]

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Header 
                    currentView={currentView} 
                    setCurrentView={setCurrentView}
                    playerStats={playerStats}
                />
                <CurrentComponent 
                    playerStats={playerStats}
                    setPlayerStats={setPlayerStats}
                    setCurrentView={setCurrentView}
                />
            </div>
        </div>
    )
}

function Header({ currentView, setCurrentView, playerStats }) {
    const viewLabels = {
        dialogue: '💬 对话',
        activity: '📝 活动',
        dashboard: '📊 数据'
    }

    return (
        <nav className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow p-4 mb-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl animate-pulse-soft">
                        ✨
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">时光治愈者</h1>
                        <p className="text-sm text-gray-500">初中生心理治愈时光之旅</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">心情:</span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">{playerStats.mood > 60 ? '😊' : playerStats.mood > 30 ? '😐' : '😢'}</span>
                        <span className="font-medium text-purple-600">{playerStats.mood}/100</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    {Object.keys(viewLabels).map(view => (
                        <button
                            key={view}
                            onClick={() => setCurrentView(view)}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                currentView === view
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {viewLabels[view]}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}

function DialogueView({ playerStats, setPlayerStats }) {
    const [messages, setMessages] = useState([
        { role: 'ai', content: '欢迎来到时光治愈空间！我是你的伙伴"小光"。最近有什么让你感到困扰的事情吗？' }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [selectedOptions] = useState([
        '学习压力很大，成绩让我很焦虑',
        '和同学相处不太好',
        '感觉自己不如别人',
        '家庭有些问题',
        '说不上来，就是不太开心'
    ])
    const [chapter] = useState('启程')
    const messagesEndRef = useRef(null)

    // 自动滚动到最新消息
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    const handleSend = async (content) => {
        if (!content.trim()) return

        const newMessages = [...messages, { role: 'user', content }]
        setMessages(newMessages)
        setInputValue('')
        setIsTyping(true)

        try {
            const apiUrl = process.env.NODE_ENV === 'production' 
                ? '/api/chat' 
                : 'http://localhost:3001/api/chat'
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: newMessages,
                    playerStats,
                    chapter
                })
            })

            const data = await response.json()

            if (data.success) {
                setMessages([...newMessages, { role: 'ai', content: data.message }])
                setPlayerStats(prev => ({
                    ...prev,
                    mood: Math.min(100, prev.mood + 5),
                    progress: Math.min(100, prev.progress + 10)
                }))
            } else {
                setMessages([...newMessages, { role: 'ai', content: '抱歉，我现在无法回复。请稍后再试。' }])
            }
        } catch (error) {
            console.error('AI对话错误:', error)
            setMessages([...newMessages, { role: 'ai', content: '连接失败，请确保后端服务器正在运行。' }])
        }

        setIsTyping(false)
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow p-6 animate-fade-in">
            <div className="mb-4">
                <span className="text-xs text-purple-500 font-medium">当前章节：启程</span>
                <div className="w-full bg-purple-100 rounded-full h-2 mt-2">
                    <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${playerStats.progress}%` }}
                    />
                </div>
            </div>

            <div className="space-y-4 mb-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-4 rounded-2xl ${
                                msg.role === 'user'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md'
                                    : 'bg-purple-50 text-gray-700 rounded-bl-md'
                            }`}
                        >
                            {msg.role === 'ai' && (
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">✨</span>
                                    <span className="text-xs text-purple-400 font-medium">时光治愈者</span>
                                </div>
                            )}
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-purple-50 p-4 rounded-2xl rounded-bl-md">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-typing" style={{ animationDelay: '0s' }}></span>
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2 mb-4">
                    {selectedOptions.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSend(option)}
                            className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl text-left text-sm text-gray-700 btn-soft"
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                        placeholder="或者自己输入你想说的话..."
                        className="flex-1 p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-purple-300 focus:outline-none transition-all"
                    />
                    <button
                        onClick={() => handleSend(inputValue)}
                        className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium btn-soft"
                    >
                        发送
                    </button>
                </div>
            </div>
        </div>
    )
}

function ActivityView({ playerStats, setPlayerStats }) {
    const [task, setTask] = useState('mirror')
    const [submitted, setSubmitted] = useState(false)
    const [inputs, setInputs] = useState({})

    const tasks = {
        mirror: {
            title: '【成长任务】优点镜',
            description: '请写下3个你的优点（无论多么微小）',
            placeholder1: '比如：我很善良，会帮助同学',
            placeholder2: '比如：我会弹吉他',
            placeholder3: '比如：我喜欢读书',
            reward: '解锁彩虹心情主题'
        },
        journal: {
            title: '【成长任务】情绪日记',
            description: '今天让你印象最深的一件事是什么？它带给你什么感受？',
            placeholder1: '发生了什么...',
            placeholder2: '当时的感受是...',
            placeholder3: '现在回看这件事...',
            reward: '获得冷静徽章'
        },
        future: {
            title: '【成长任务】给未来的信',
            description: '写一封信给一年后的自己',
            placeholder1: '亲爱的未来的我...',
            placeholder2: '现在的我...',
            placeholder3: '希望未来的你...',
            reward: '解锁时光胶囊'
        }
    }

    const currentTask = tasks[task]

    const handleSubmit = () => {
        setSubmitted(true)
        setPlayerStats(prev => ({
            ...prev,
            confidence: Math.min(100, prev.confidence + 10),
            stress: Math.max(0, prev.stress - 10)
        }))
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow p-6 animate-fade-in">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {Object.keys(tasks).map(key => (
                    <button
                        key={key}
                        onClick={() => {
                            setTask(key)
                            setSubmitted(false)
                            setInputs({})
                        }}
                        className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                            task === key
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {tasks[key].title.split('】')[1]}
                    </button>
                ))}
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{currentTask.title}</h2>
                <p className="text-gray-600 mb-4">{currentTask.description}</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                    <span className="text-sm text-yellow-700">🎁 完成奖励：{currentTask.reward}</span>
                </div>
            </div>

            {submitted ? (
                <div className="text-center py-12 animate-fade-in">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">太棒了！</h3>
                    <p className="text-gray-600 mb-6">你完成了这个任务，收获了成长！</p>
                    <button
                        onClick={() => {
                            setSubmitted(false)
                            setInputs({})
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium btn-soft"
                    >
                        再来一个
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i}>
                            <textarea
                                value={inputs[i] || ''}
                                onChange={(e) => setInputs({...inputs, [i]: e.target.value})}
                                placeholder={currentTask[`placeholder${i}`]}
                                rows={3}
                                className="w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-purple-300 focus:outline-none transition-all resize-none"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium btn-soft"
                    >
                        提交任务
                    </button>
                </div>
            )}
        </div>
    )
}

function DashboardView({ playerStats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow p-6 animate-fade-in">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📊</span> 心理状态
                </h3>
                <div className="space-y-4">
                    <StatBar label="心情指数" value={playerStats.mood} color="from-purple-500 to-pink-500" emoji="😊" />
                    <StatBar label="自信指数" value={playerStats.confidence} color="from-green-500 to-teal-500" emoji="💪" />
                    <StatBar label="压力水平" value={playerStats.stress} color="from-orange-500 to-red-500" emoji="😰" reverse />
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow p-6 animate-fade-in">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>🏆</span> 成就解锁
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <AchievementCard title="初次探索者" icon="🌟" unlocked />
                    <AchievementCard title="时间旅行家" icon="⏰" unlocked={false} />
                    <AchievementCard title="沟通大师" icon="💬" unlocked={false} />
                    <AchievementCard title="自我关怀者" icon="💗" unlocked={false} />
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow p-6 animate-fade-in md:col-span-2">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📍</span> 成长进度
                </h3>
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>总进度</span>
                        <span>{playerStats.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${playerStats.progress}%` }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {['启程', '幼儿园', '小学', '初中', '未来'].map((chapter, idx) => (
                        <ChapterCard
                            key={idx}
                            name={chapter}
                            status={idx < Math.floor(playerStats.progress / 20) ? 'completed' : idx === Math.floor(playerStats.progress / 20) ? 'current' : 'locked'}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function StatBar({ label, value, color, emoji, reverse }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-xl">{emoji}</span>
                    <span className="font-medium text-gray-800">{value}/100</span>
                </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${color}`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    )
}

function AchievementCard({ title, icon, unlocked }) {
    return (
        <div className={`p-4 rounded-xl border-2 ${unlocked ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50 opacity-50'}`}>
            <div className="text-3xl mb-2">{unlocked ? icon : '🔒'}</div>
            <div className="text-sm font-medium text-gray-700">{title}</div>
        </div>
    )
}

function ChapterCard({ name, status }) {
    const statusConfig = {
        completed: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
        current: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-400', pulse: true },
        locked: { bg: 'bg-gray-100', text: 'text-gray-400', border: 'border-gray-200' }
    }

    const config = statusConfig[status]

    return (
        <div className={`p-3 rounded-xl border-2 text-center ${config.bg} ${config.text} ${config.border} ${config.pulse ? 'animate-pulse-soft' : ''}`}>
            <div className="text-xs font-medium">{name}</div>
            <div className="text-lg mt-1">
                {status === 'completed' ? '✅' : status === 'current' ? '📍' : '🔒'}
            </div>
        </div>
    )
}

export default App