<template>
    <view class="container">
        <!-- 用户信息卡片 -->
        <view class="card user-card">
            <view class="avatar">
                <text class="avatar-icon">🍵</text>
            </view>
            <view class="user-info">
                <text class="user-name">养生达人</text>
                <text class="user-desc">四季养生，饮食有道</text>
            </view>
            <view class="user-badge" v-if="testResult">
                <text class="badge-text">{{ testResult.name }}</text>
            </view>
        </view>

        <!-- 数据统计 -->
        <view class="card stats-card">
            <view class="stats-item" @click="goCollect">
                <text class="stats-num">{{ stats.recipes }}</text>
                <text class="stats-label">食谱收藏</text>
            </view>
            <view class="stats-divider"></view>
            <view class="stats-item" @click="goCollect">
                <text class="stats-num">{{ stats.ingredients }}</text>
                <text class="stats-label">食材收藏</text>
            </view>
            <view class="stats-divider"></view>
            <view class="stats-item" @click="goSelfTest">
                <text class="stats-num">{{ stats.hasTest ? '已测' : '未测' }}</text>
                <text class="stats-label">体质测试</text>
            </view>
            <view class="stats-divider"></view>
            <view class="stats-item" @click="switchTab('ai')">
                <text class="stats-num">{{ stats.aiCount }}</text>
                <text class="stats-label">AI咨询</text>
            </view>
        </view>

        <!-- 功能切换 -->
        <view class="tab-switch">
            <view class="tab-btn" :class="{ active: currentSection === 'menu' }" @click="switchTab('menu')">
                <text class="tab-icon">📋</text>
                <text class="tab-text">功能菜单</text>
            </view>
            <view class="tab-btn" :class="{ active: currentSection === 'ai' }" @click="switchTab('ai')">
                <text class="tab-icon">🤖</text>
                <text class="tab-text">AI养生顾问</text>
            </view>
        </view>

        <!-- 功能菜单 -->
        <view v-if="currentSection === 'menu'" class="menu-section">
            <view class="card">
                <text class="section-title">养生服务</text>
                <view class="menu-list">
                    <view class="menu-item" @click="goSelfTest">
                        <view class="menu-left">
                            <text class="menu-icon">📊</text>
                            <text class="menu-name">体质自测</text>
                        </view>
                        <text class="menu-arrow">›</text>
                    </view>
                    <view class="menu-item" @click="goCollect">
                        <view class="menu-left">
                            <text class="menu-icon">⭐</text>
                            <text class="menu-name">我的收藏</text>
                        </view>
                        <text class="menu-arrow">›</text>
                    </view>
                    <view class="menu-item" @click="goIngredient">
                        <view class="menu-left">
                            <text class="menu-icon">🌿</text>
                            <text class="menu-name">食材科普</text>
                        </view>
                        <text class="menu-arrow">›</text>
                    </view>
                    <view class="menu-item" @click="goSeasonFood">
                        <view class="menu-left">
                            <text class="menu-icon">🍲</text>
                            <text class="menu-name">四季食谱</text>
                        </view>
                        <text class="menu-arrow">›</text>
                    </view>
                </view>
            </view>

            <view class="card">
                <text class="section-title">个性化设置</text>
                <view class="menu-list">
                    <view class="menu-item" @click="goSetting">
                        <view class="menu-left">
                            <text class="menu-icon">⚙️</text>
                            <text class="menu-name">设置</text>
                        </view>
                        <text class="menu-arrow">›</text>
                    </view>
                    <view class="menu-item" @click="clearChat">
                        <view class="menu-left">
                            <text class="menu-icon">🧹</text>
                            <text class="menu-name">清空AI对话记录</text>
                        </view>
                        <text class="menu-arrow">›</text>
                    </view>
                </view>
            </view>

            <!-- 养生小贴士 -->
            <view class="card tip-card">
                <text class="section-title">今日养生小贴士</text>
                <view class="tip-content">
                    <text class="tip-icon">💡</text>
                    <text class="tip-text">{{ dailyTip }}</text>
                </view>
            </view>
        </view>

        <!-- AI 询问功能 -->
        <view v-if="currentSection === 'ai'" class="ai-section">
            <view class="card ai-intro">
                <view class="ai-header">
                    <text class="ai-icon">🤖</text>
                    <text class="ai-title">AI养生顾问</text>
                </view>
                <text class="ai-desc">您好！我是您的专属养生顾问，可以为您解答饮食养生、食材搭配、季节调理等问题。请在下方输入您想咨询的内容~</text>
                <view class="quick-questions">
                    <view class="quick-item" v-for="(q, idx) in quickQuestions" :key="idx" @click="sendQuickQuestion(q)">
                        <text>{{ q }}</text>
                    </view>
                </view>
            </view>

            <!-- 对话列表 -->
            <scroll-view class="chat-container" scroll-y :scroll-top="scrollTop" :scroll-with-animation="true">
                <view v-for="(msg, idx) in messages" :key="idx" class="message-item" :class="{ 'user-message': msg.role === 'user', 'ai-message': msg.role === 'ai' }">
                    <view class="message-avatar">
                        <text class="avatar-text">{{ msg.role === 'user' ? '我' : 'AI' }}</text>
                    </view>
                    <view class="message-content">
                        <view class="message-bubble">
                            <text class="message-text">{{ msg.content }}</text>
                        </view>
                        <text class="message-time">{{ msg.time }}</text>
                    </view>
                </view>
                <view v-if="isLoading" class="message-item ai-message">
                    <view class="message-avatar">
                        <text class="avatar-text">AI</text>
                    </view>
                    <view class="message-content">
                        <view class="message-bubble">
                            <view class="loading-dots">
                                <text class="dot">●</text>
                                <text class="dot">●</text>
                                <text class="dot">●</text>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>

            <!-- 输入区域 -->
            <view class="input-container">
                <input class="chat-input" v-model="inputText" placeholder="输入您的养生问题..." placeholder-style="color: #886F5C" @confirm="sendMessage" :adjust-position="true" :cursor-spacing="20" />
                <view class="send-btn" :class="{ active: inputText.trim() }" @click="sendMessage">
                    <text class="send-icon">➤</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import storage from '../../utils/storage.js'
import testData from '../../data/selfTest.js'
import recipes from '../../data/recipes.js'
import ingredients from '../../data/ingredients.js'

export default {
    data() {
        return {
            currentSection: 'menu',
            scrollTop: 0,
            stats: {
                recipes: 0,
                ingredients: 0,
                hasTest: false,
                aiCount: 0
            },
            testResult: null,
            dailyTip: '',
            inputText: '',
            messages: [],
            isLoading: false,
            // ============================================
            // 大模型接入配置
            // 1: 直接接入开放大模型API（如OpenAI、通义千问、文心一言、智谱、DeepSeek等）
            // 2: 自建后端代理，通过uni.request调用
            // 
            // useAIModel: true  => 
            // useAIModel: false =>
            // ============================================
            useAIModel: false,
            aiConfig: {
                apiUrl: '',
                apiKey: '',
                model: 'glm-4-flash'
            },
            quickQuestions: [
                '夏季如何养生？',
                '体寒体质吃什么好？',
                '失眠适合吃什么？',
                '如何通过饮食调理肠胃？'
            ],
            dailyTips: [
                '饮食有节，起居有常，不妄作劳，故能形与神俱。',
                '春夏养阳，秋冬养阴，顺应四时，百病不生。',
                '五谷为养，五果为助，五畜为益，五菜为充。',
                '药补不如食补，食补不如神补，养生先养心。',
                '胃喜温恶寒，脾喜燥恶湿，饮食温热清淡最养脾胃。',
                '早吃好，午吃饱，晚吃少，一日三餐有规律。',
                '不时不食，应季而食，时令食材最是养人。'
            ]
        }
    },
    onShow() {
        this.loadStats()
        this.loadMessages()
        this.loadDailyTip()
    },
    methods: {
        loadStats() {
            this.stats.recipes = storage.getRecipes().length
            this.stats.ingredients = storage.getIngredients().length
            const savedResult = storage.getTestResult()
            this.stats.hasTest = !!savedResult
            if (savedResult && testData.results[savedResult]) {
                this.testResult = testData.results[savedResult]
            }
            this.stats.aiCount = storage.getAIChatCount()
        },
        loadDailyTip() {
            const today = new Date().getDate()
            this.dailyTip = this.dailyTips[today % this.dailyTips.length]
        },
        loadMessages() {
            this.messages = storage.getAIChatMessages()
            if (this.messages.length === 0) {
                this.messages = [{
                    role: 'ai',
                    content: '您好！我是您的专属AI养生顾问 🌿\n\n我可以帮您：\n• 推荐适合当前季节的养生食谱\n• 根据您的体质给出饮食建议\n• 解答食材搭配与功效问题\n• 提供日常养生调理建议\n\n请问有什么可以帮您的吗？',
                    time: this.getCurrentTime()
                }]
                storage.saveAIChatMessages(this.messages)
            }
            this.$nextTick(() => {
                this.scrollToBottom()
            })
        },
        switchTab(section) {
            this.currentSection = section
            if (section === 'ai') {
                this.$nextTick(() => {
                    this.scrollToBottom()
                })
            }
        },
        sendMessage() {
            const text = this.inputText.trim()
            if (!text) return

            this.messages.push({
                role: 'user',
                content: text,
                time: this.getCurrentTime()
            })
            this.inputText = ''
            storage.saveAIChatMessages(this.messages)
            this.stats.aiCount++
            storage.setAIChatCount(this.stats.aiCount)
            this.$nextTick(() => {
                this.scrollToBottom()
            })

            this.isLoading = true
            if (this.useAIModel && this.aiConfig.apiUrl) {
                this.callAIModel(text)
            } else {
                setTimeout(() => {
                    const reply = this.generateAIReply(text)
                    this.isLoading = false
                    this.messages.push({
                        role: 'ai',
                        content: reply,
                        time: this.getCurrentTime()
                    })
                    storage.saveAIChatMessages(this.messages)
                    this.$nextTick(() => {
                        this.scrollToBottom()
                    })
                }, 800 + Math.random() * 800)
            }
        },
        // ============================================
        //调用真实大模型 API
        // 
        // 在后端搭建一个代理服务，将小程序的请求转发给大模型API。
        
        //
        // 后端（Node.js + Express）：
        // 
        // const express = require('express');
        // const cors = require('cors');
        // const app = express();
        // app.use(cors());
        // app.use(express.json());
        // 
        // const API_KEY = '你的大模型API Key';
        // const API_URL = 'https://api.deepseek.com/chat/completions';
        // 
        // app.post('/api/chat', async (req, res) => {
        //   const { message, history } = req.body;
        //   try {
        //     const messages = [
        //       { role: 'system', content: '你是一位专业的中医养生顾问，请用温和、专业的语气回答用户关于饮食养生的问题。' },
        //       ...(history || []),
        //       { role: 'user', content: message }
        //     ];
        //     const response = await fetch(API_URL, {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${API_KEY}`
        //       },
        //       body: JSON.stringify({
        //         model: 'deepseek-chat',
        //         messages: messages,
        //         temperature: 0.7
        //       })
        //     });
        //     const data = await response.json();
        //     res.json({ reply: data.choices[0].message.content });
        //   } catch (error) {
        //     res.status(500).json({ error: '请求失败' });
        //   }
        // });
        // 
        // app.listen(3000, () => console.log('Server running on port 3000'));
        // ============================================
        callAIModel(userMessage) {
            // 构建对话历史（取最近10条作为上下文）
            const recentMessages = this.messages.slice(-10).map(m => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.content
            }))

            // 组装完整对话消息
            const fullMessages = [{
                role: 'system',
                content: '你是一位专业的中医养生顾问，请用温和、专业、简洁的语气回答用户的养生问题。回答中可以包含饮食原则、推荐食材和食谱。'
            }]
            if (this.testResult && this.testResult.name) {
                fullMessages.push({
                    role: 'system',
                    content: '用户的体质测试结果为：' + this.testResult.name + '，请结合体质给出个性化建议。'
                })
            }
            fullMessages.push(...recentMessages)
            fullMessages.push({ role: 'user', content: userMessage })

            uni.request({
                url: this.aiConfig.apiUrl,
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.aiConfig.apiKey
                },
                data: {
                    model: this.aiConfig.model,
                    messages: fullMessages,
                    temperature: 0.7
                },
                success: (res) => {
                    this.isLoading = false
                    let reply = '抱歉，AI服务暂时无法响应，请稍后再试。'
                    if (res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message && res.data.choices[0].message.content) {
                        reply = res.data.choices[0].message.content
                    } else if (res.data && res.data.error) {
                        reply = 'AI调用失败：' + (res.data.error.message || JSON.stringify(res.data.error))
                    }
                    this.messages.push({
                        role: 'ai',
                        content: reply,
                        time: this.getCurrentTime()
                    })
                    storage.saveAIChatMessages(this.messages)
                    this.$nextTick(() => {
                        this.scrollToBottom()
                    })
                },
                fail: (err) => {
                    this.isLoading = false
                    console.error('AI请求失败:', err)
                    this.messages.push({
                        role: 'ai',
                        content: '网络连接异常，暂时无法连接AI服务。\n\n可能的原因：\n1. 当前是H5开发模式，智谱域名可能被浏览器CORS拦截\n2. 请在微信开发者工具中测试，或通过小程序开发者工具在「详情-本地设置」勾选「不校验合法域名」\n3. API Key 已过期或配额不足\n\n临时方案：将 useAIModel 改为 false，使用本地规则演示。',
                        time: this.getCurrentTime()
                    })
                    this.$nextTick(() => {
                        this.scrollToBottom()
                    })
                }
            })
        },
        sendQuickQuestion(question) {
            this.inputText = question
            this.sendMessage()
        },
        generateAIReply(userInput) {
            const input = userInput.toLowerCase()
            const now = new Date()
            const month = now.getMonth() + 1
            let currentSeason = 'spring'
            let seasonName = '春季'
            if (month >= 3 && month <= 5) { currentSeason = 'spring'; seasonName = '春季' }
            else if (month >= 6 && month <= 8) { currentSeason = 'summer'; seasonName = '夏季' }
            else if (month >= 9 && month <= 11) { currentSeason = 'autumn'; seasonName = '秋季' }
            else { currentSeason = 'winter'; seasonName = '冬季' }

            const seasonRecipes = recipes.filter(r => r.season === currentSeason)

            if (input.includes('夏') || input.includes('暑') || input.includes('热')) {
                const summerRecipes = recipes.filter(r => r.season === 'summer')
                let reply = '夏季养生重在清热解暑、养心安神。以下是几点建议：\n\n'
                reply += '【饮食原则】\n'
                reply += '• 清淡为主，少食油腻辛辣\n'
                reply += '• 多吃清热利湿的食物\n'
                reply += '• 适当补充水分和电解质\n\n'
                reply += '【推荐食材】\n'
                reply += '绿豆、苦瓜、冬瓜、莲子、百合、西瓜、荷叶、薏米等\n\n'
                reply += '【推荐食谱】\n'
                summerRecipes.forEach((r, i) => {
                    reply += `${i + 1}. ${r.name} - ${r.effect.split('，')[0]}\n`
                })
                reply += '\n【温馨提示】\n'
                reply += '夏季不宜贪凉饮冷，以免损伤脾胃阳气。出汗后及时补充温水，避免大汗后立即冲凉。'
                return reply
            }

            if (input.includes('冬') || input.includes('寒') || input.includes('冷')) {
                const winterRecipes = recipes.filter(r => r.season === 'winter')
                let reply = '冬季养生重在温补阳气、驱寒暖身。以下是几点建议：\n\n'
                reply += '【饮食原则】\n'
                reply += '• 温补为主，适当进补温热食物\n'
                reply += '• 多吃补肾益精的食材\n'
                reply += '• 少食生冷寒凉之品\n\n'
                reply += '【推荐食材】\n'
                reply += '羊肉、牛肉、生姜、红枣、桂圆、黑芝麻、核桃、板栗等\n\n'
                reply += '【推荐食谱】\n'
                winterRecipes.forEach((r, i) => {
                    reply += `${i + 1}. ${r.name} - ${r.effect.split('，')[0]}\n`
                })
                reply += '\n【温馨提示】\n'
                reply += '冬令进补需因人而异，阴虚火旺者不宜过度温补。进补前最好先了解自身体质。'
                return reply
            }

            if (input.includes('春') || input.includes('风') || input.includes('生发')) {
                const springRecipes = recipes.filter(r => r.season === 'spring')
                let reply = '春季养生重在养肝理气、升发阳气。以下是几点建议：\n\n'
                reply += '【饮食原则】\n'
                reply += '• 清淡为主，少食酸收之味\n'
                reply += '• 多吃辛温发散的食物\n'
                reply += '• 适当增加绿色蔬菜摄入\n\n'
                reply += '【推荐食材】\n'
                reply += '韭菜、香椿、菠菜、荠菜、春笋、豆芽、香菜、葱姜等\n\n'
                reply += '【推荐食谱】\n'
                springRecipes.forEach((r, i) => {
                    reply += `${i + 1}. ${r.name} - ${r.effect.split('，')[0]}\n`
                })
                reply += '\n【温馨提示】\n'
                reply += '春季肝气旺盛，宜保持心情舒畅，避免暴怒抑郁。可适当增加户外活动，以顺应阳气升发之势。'
                return reply
            }

            if (input.includes('秋') || input.includes('燥') || input.includes('干')) {
                const autumnRecipes = recipes.filter(r => r.season === 'autumn')
                let reply = '秋季养生重在滋阴润肺、防燥护阴。以下是几点建议：\n\n'
                reply += '【饮食原则】\n'
                reply += '• 滋阴润燥为主，少食辛辣\n'
                reply += '• 多吃润肺生津的食物\n'
                reply += '• 适当增加白色食材摄入\n\n'
                reply += '【推荐食材】\n'
                reply += '银耳、雪梨、百合、莲子、蜂蜜、核桃、板栗、白萝卜等\n\n'
                reply += '【推荐食谱】\n'
                autumnRecipes.forEach((r, i) => {
                    reply += `${i + 1}. ${r.name} - ${r.effect.split('，')[0]}\n`
                })
                reply += '\n【温馨提示】\n'
                reply += '秋季空气干燥，需多喝水，保持室内湿度。注意早睡早起，以顺应秋收之气。'
                return reply
            }

            if (input.includes('失眠') || input.includes('睡') || input.includes('眠')) {
                let reply = '失眠调理重在宁心安神、滋阴养血。以下是几点建议：\n\n'
                reply += '【饮食调理】\n'
                reply += '• 晚餐宜清淡，不宜过饱\n'
                reply += '• 睡前可饮温牛奶或小米粥\n'
                reply += '• 多吃安神食材：百合、莲子、红枣、桂圆、小米、核桃\n\n'
                reply += '【推荐食谱】\n'
                reply += '1. 百合莲子粥 - 清心安神，适合心烦失眠者\n'
                reply += '2. 小米红枣粥 - 健脾和胃，养血安神\n'
                reply += '3. 桂圆莲子汤 - 补益心脾，宁心安神\n\n'
                reply += '【生活建议】\n'
                reply += '• 睡前1小时避免使用电子设备\n'
                reply += '• 保持规律作息，固定上床时间\n'
                reply += '• 睡前可温水泡脚15-20分钟\n'
                reply += '• 卧室保持安静、黑暗、凉爽'
                return reply
            }

            if (input.includes('胃') || input.includes('肠') || input.includes('消化') || input.includes('肠胃')) {
                let reply = '肠胃调理重在健脾养胃、消食化积。以下是几点建议：\n\n'
                reply += '【饮食原则】\n'
                reply += '• 三餐规律，细嚼慢咽\n'
                reply += '• 饮食温热清淡，避免生冷油腻\n'
                reply += '• 每餐七八分饱，避免暴饮暴食\n\n'
                reply += '【推荐食材】\n'
                reply += '山药、薏米、红枣、小米、南瓜、胡萝卜、生姜、白萝卜等\n\n'
                reply += '【推荐食谱】\n'
                reply += '1. 小米南瓜粥 - 健脾和胃，适合脾胃虚弱者\n'
                reply += '2. 山药薏米粥 - 健脾祛湿，适合脾虚湿盛\n'
                reply += '3. 萝卜排骨汤 - 消食化痰，适合消化不良\n\n'
                reply += '【生活建议】\n'
                reply += '• 早餐一定要吃，养胃最重要\n'
                reply += '• 饭后散步15分钟，助消化\n'
                reply += '• 避免空腹饮茶、喝咖啡\n'
                reply += '• 情绪稳定对肠胃也很重要'
                return reply
            }

            if (input.includes('体寒') || input.includes('怕冷') || input.includes('手脚') || input.includes('凉')) {
                let reply = '体寒调理重在温补阳气、活血化瘀。以下是几点建议：\n\n'
                reply += '【饮食调理】\n'
                reply += '• 多吃温热性食物，少食生冷\n'
                reply += '• 适当食用辛辣温阳之品\n'
                reply += '• 多喝热水，避免冷饮\n\n'
                reply += '【推荐食材】\n'
                reply += '羊肉、牛肉、生姜、红枣、桂圆、枸杞、红糖、韭菜、核桃等\n\n'
                reply += '【推荐食谱】\n'
                reply += '1. 当归生姜羊肉汤 - 温中补血，最适合体寒之人\n'
                reply += '2. 红枣桂圆粥 - 补气养血，温暖脾胃\n'
                reply += '3. 生姜红糖水 - 驱寒暖胃，简单有效\n\n'
                reply += '【生活建议】\n'
                reply += '• 注意保暖，尤其是腰腹和脚部\n'
                reply += '• 适当运动，促进血液循环\n'
                reply += '• 每晚温水泡脚20分钟，可加生姜或艾叶\n'
                reply += '• 避免长时间久坐，定时活动'
                return reply
            }

            if (input.includes('上火') || input.includes('热气') || input.includes('长痘') || input.includes('口苦')) {
                let reply = '上火调理重在清热降火、滋阴润燥。以下是几点建议：\n\n'
                reply += '【饮食原则】\n'
                reply += '• 饮食清淡，少食辛辣油腻\n'
                reply += '• 多吃清热降火的食物\n'
                reply += '• 多喝水，保持大便通畅\n\n'
                reply += '【推荐食材】\n'
                reply += '绿豆、苦瓜、冬瓜、西瓜、梨、菊花、莲子心、竹叶等\n\n'
                reply += '【推荐食谱】\n'
                reply += '1. 绿豆百合粥 - 清热降火，清心安神\n'
                reply += '2. 凉拌苦瓜 - 清热解毒，最适合暑热天\n'
                reply += '3. 冬瓜莲子汤 - 清热利水，消肿解毒\n\n'
                reply += '【生活建议】\n'
                reply += '• 保证充足睡眠，避免熬夜\n'
                reply += '• 保持心情舒畅，避免急躁\n'
                reply += '• 可适量饮用菊花茶或绿豆汤\n'
                reply += '• 火锅、烧烤、油炸食品暂时忌口'
                return reply
            }

            if (input.includes('推荐') || input.includes('食谱') || input.includes('菜')) {
                let reply = `当前正值${seasonName}，为您推荐以下养生食谱：\n\n`
                seasonRecipes.forEach((r, i) => {
                    reply += `【${i + 1}. ${r.name}】\n`
                    reply += `• 功效：${r.effect}\n`
                    reply += `• 食材：${r.ingredients}\n`
                    reply += `• 适宜：${r.suitable}\n`
                    reply += `• 禁忌：${r.avoid}\n\n`
                })
                reply += '温馨提示：以上食谱仅供参考，具体食用还需结合个人体质。如需了解更详细的做法，可前往"四季食谱"页面查看。'
                return reply
            }

            if (input.includes('你好') || input.includes('您好') || input.includes('hi') || input.includes('hello') || input.includes('在吗')) {
                return '您好！很高兴为您服务 😊\n\n我是您的专属AI养生顾问，可以帮您解答各类养生问题：\n\n• 季节养生：春夏秋冬各有什么讲究？\n• 体质调理：体寒、上火、脾虚怎么调理？\n• 食谱推荐：当前季节适合吃什么？\n• 食材功效：某种食材有什么功效？\n• 日常保健：失眠、肠胃、感冒等调理\n\n请问有什么可以帮您的吗？'
            }

            if (input.includes('食材') || input.includes('功效') || input.includes('作用')) {
                let reply = '以下是常见养生食材的功效简介：\n\n'
                const selectedIngredients = ingredients.slice(0, 6)
                selectedIngredients.forEach((ing, i) => {
                    reply += `【${ing.name}】\n`
                    reply += `• 功效：${ing.effect}\n`
                    reply += `• 分类：${ing.category}\n\n`
                })
                reply += '想了解更多食材信息，可前往"食材科普"页面查看详细介绍~'
                return reply
            }

            let reply = `感谢您的咨询！\n\n关于您提到的"${userInput}"，我为您提供以下建议：\n\n`
            if (this.testResult) {
                reply += `根据您的体质测试结果（${this.testResult.name}），建议您：\n${this.testResult.diet}\n\n`
            }
            reply += `【一般养生建议】\n`
            reply += `• 饮食均衡，荤素搭配\n`
            reply += `• 三餐定时定量，细嚼慢咽\n`
            reply += `• 多喝水，少喝含糖饮料\n`
            reply += `• 保证充足睡眠，规律作息\n\n`
            if (seasonRecipes && seasonRecipes.length > 0) {
                const randomRecipe = seasonRecipes[0]
                reply += `【${seasonName}推荐】\n`
                reply += `推荐您尝试「${randomRecipe.name}」\n`
                reply += `功效：${randomRecipe.effect}\n\n`
            }
            reply += `您可以尝试询问更具体的问题，例如：\n`
            reply += `• "夏季如何养生？"\n`
            reply += `• "体寒体质吃什么好？"\n`
            reply += `• "失眠适合吃什么？"\n\n`
            reply += `或者点击上方的快捷问题，我会为您提供更专业的建议！`
            return reply
        },
        getCurrentTime() {
            const now = new Date()
            const h = String(now.getHours()).padStart(2, '0')
            const m = String(now.getMinutes()).padStart(2, '0')
            return `${h}:${m}`
        },
        scrollToBottom() {
            this.scrollTop = 100000
            this.$nextTick(() => {
                this.scrollTop = 100001
            })
        },
        clearChat() {
            uni.showModal({
                title: '确认清空',
                content: '确定要清空所有AI对话记录吗？此操作不可撤销。',
                confirmColor: '#8C4A31',
                success: (res) => {
                    if (res.confirm) {
                        storage.clearAIChat()
                        this.messages = []
                        this.stats.aiCount = 0
                        storage.setAIChatCount(0)
                        this.loadMessages()
                        uni.showToast({ title: '已清空', icon: 'success' })
                    }
                }
            })
        },
        goSelfTest() {
            uni.navigateTo({ url: '/pages/selfTest/selfTest' })
        },
        goCollect() {
            uni.switchTab({ url: '/pages/collect/collect' })
        },
        goIngredient() {
            uni.navigateTo({ url: '/pages/ingredient/ingredient' })
        },
        goSeasonFood() {
            uni.switchTab({ url: '/pages/seasonFood/seasonFood' })
        },
        goSetting() {
            uni.navigateTo({ url: '/pages/setting/setting' })
        }
    }
}
</script>

<style scoped>
@import "../../styles/common.wxss";

.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 20rpx;
}

.user-card {
    background: linear-gradient(135deg, #8C4A31 0%, #A65D3E 100%);
    display: flex;
    align-items: center;
    padding: 40rpx 30rpx;
    margin-bottom: 24rpx;
}

.avatar {
    width: 120rpx;
    height: 120rpx;
    background-color: #F6EBE0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
    flex-shrink: 0;
}

.avatar-icon {
    font-size: 60rpx;
}

.user-info {
    flex: 1;
}

.user-name {
    font-size: 36rpx;
    font-weight: bold;
    color: #F6EBE0;
    display: block;
    margin-bottom: 8rpx;
}

.user-desc {
    font-size: 24rpx;
    color: #E8D8C8;
    opacity: 0.9;
}

.user-badge {
    background-color: rgba(246, 235, 224, 0.2);
    padding: 12rpx 20rpx;
    border-radius: 30rpx;
    border: 2rpx solid rgba(246, 235, 224, 0.4);
    margin-left: 16rpx;
}

.badge-text {
    font-size: 22rpx;
    color: #F6EBE0;
}

.stats-card {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 30rpx 20rpx;
    margin-bottom: 24rpx;
}

.stats-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10rpx 0;
}

.stats-divider {
    width: 2rpx;
    height: 60rpx;
    background-color: #E8D8C8;
}

.stats-num {
    font-size: 36rpx;
    font-weight: bold;
    color: #8C4A31;
    margin-bottom: 8rpx;
}

.stats-label {
    font-size: 22rpx;
    color: #886F5C;
}

.tab-switch {
    display: flex;
    margin-bottom: 24rpx;
    gap: 20rpx;
}

.tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24rpx 20rpx;
    background-color: #FFF9F2;
    border-radius: 16rpx;
    border: 2rpx solid #E8D8C8;
    transition: all 0.3s;
}

.tab-btn.active {
    background-color: #8C4A31;
    border-color: #8C4A31;
}

.tab-icon {
    font-size: 32rpx;
    margin-right: 10rpx;
}

.tab-text {
    font-size: 26rpx;
    color: #2E2016;
    font-weight: bold;
}

.tab-btn.active .tab-text {
    color: #F6EBE0;
}

.menu-section {
    display: flex;
    flex-direction: column;
}

.menu-list {
    display: flex;
    flex-direction: column;
}

.menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28rpx 10rpx;
    border-bottom: 2rpx solid #E8D8C8;
}

.menu-item:last-child {
    border-bottom: none;
}

.menu-left {
    display: flex;
    align-items: center;
}

.menu-icon {
    font-size: 40rpx;
    margin-right: 20rpx;
}

.menu-name {
    font-size: 28rpx;
    color: #2E2016;
}

.menu-arrow {
    font-size: 36rpx;
    color: #886F5C;
}

.tip-card {
    background: linear-gradient(135deg, #FFF9F2 0%, #F6EBE0 100%);
}

.tip-content {
    display: flex;
    align-items: flex-start;
    padding: 10rpx 0;
}

.tip-icon {
    font-size: 36rpx;
    margin-right: 16rpx;
    flex-shrink: 0;
}

.tip-text {
    font-size: 26rpx;
    color: #2E2016;
    line-height: 1.8;
    flex: 1;
}

.ai-section {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.ai-intro {
    margin-bottom: 20rpx;
}

.ai-header {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
}

.ai-icon {
    font-size: 44rpx;
    margin-right: 16rpx;
}

.ai-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #8C4A31;
}

.ai-desc {
    font-size: 26rpx;
    color: #2E2016;
    line-height: 1.8;
    display: block;
    margin-bottom: 20rpx;
}

.quick-questions {
    display: flex;
    flex-wrap: wrap;
    gap: 12rpx;
    padding-top: 16rpx;
    border-top: 2rpx dashed #E8D8C8;
}

.quick-item {
    background-color: #F6EBE0;
    padding: 12rpx 20rpx;
    border-radius: 30rpx;
    font-size: 22rpx;
    color: #8C4A31;
}

.chat-container {
    flex: 1;
    padding: 10rpx 0;
    margin-bottom: 20rpx;
}

.message-item {
    display: flex;
    margin-bottom: 24rpx;
}

.user-message {
    flex-direction: row-reverse;
}

.message-avatar {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.user-message .message-avatar {
    background-color: #8C4A31;
    margin-left: 16rpx;
}

.ai-message .message-avatar {
    background-color: #A65D3E;
    margin-right: 16rpx;
}

.avatar-text {
    font-size: 24rpx;
    color: #F6EBE0;
    font-weight: bold;
}

.message-content {
    max-width: 70%;
    display: flex;
    flex-direction: column;
}

.user-message .message-content {
    align-items: flex-end;
}

.ai-message .message-content {
    align-items: flex-start;
}

.message-bubble {
    padding: 20rpx 24rpx;
    border-radius: 20rpx;
    margin-bottom: 8rpx;
}

.user-message .message-bubble {
    background-color: #8C4A31;
    border-top-right-radius: 6rpx;
}

.ai-message .message-bubble {
    background-color: #FFF9F2;
    border: 2rpx solid #E8D8C8;
    border-top-left-radius: 6rpx;
}

.message-text {
    font-size: 26rpx;
    line-height: 1.8;
    white-space: pre-wrap;
    word-break: break-all;
}

.user-message .message-text {
    color: #F6EBE0;
}

.ai-message .message-text {
    color: #2E2016;
}

.message-time {
    font-size: 20rpx;
    color: #886F5C;
}

.loading-dots {
    display: flex;
    align-items: center;
    padding: 10rpx 0;
}

.dot {
    font-size: 16rpx;
    color: #8C4A31;
    margin-right: 10rpx;
    animation: blink 1.4s infinite both;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes blink {
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
}

.input-container {
    display: flex;
    align-items: center;
    padding: 20rpx 24rpx;
    background-color: #FFF9F2;
    border: 2rpx solid #E8D8C8;
    border-radius: 16rpx;
    margin-top: 10rpx;
    position: sticky;
    bottom: 0;
    z-index: 100;
}

.chat-input {
    flex: 1;
    height: 72rpx;
    background-color: #F6EBE0;
    border-radius: 36rpx;
    padding: 0 30rpx;
    font-size: 26rpx;
    color: #2E2016;
}

.send-btn {
    width: 72rpx;
    height: 72rpx;
    background-color: #E8D8C8;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16rpx;
    transition: all 0.2s;
    flex-shrink: 0;
}

.send-btn.active {
    background-color: #8C4A31;
}

.send-icon {
    font-size: 28rpx;
    color: #FFF9F2;
}
</style>
