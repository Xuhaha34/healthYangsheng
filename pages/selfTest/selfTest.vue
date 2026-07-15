<template>
    <view class="container">
        <!-- 未测试时显示测试流程 -->
        <view v-if="!showResult">
            <view class="card test-header">
                <text class="section-title">体质自测</text>
                <text class="test-desc">回答 {{ questions.length }} 个简单问题，了解您的体质类型，获取专属饮食建议。</text>
                <view class="progress-bar">
                    <view class="progress-fill" :style="'width: ' + (currentIndex / questions.length * 100) + '%'"></view>
                </view>
                <text class="progress-text">{{ currentIndex }} / {{ questions.length }}</text>
            </view>

            <view v-if="currentIndex < questions.length" class="card question-card">
                <text class="question-num">第 {{ currentIndex + 1 }} 题</text>
                <text class="question-text">{{ currentQuestion.question }}</text>
                <view class="options">
                    <view v-for="opt in currentQuestion.options" :key="opt.key" class="option-item" :class="{ selected: selectedAnswers[currentIndex] === opt.key }" @click="selectAnswer(opt.key)">
                        <text class="option-key">{{ opt.key }}</text>
                        <text class="option-text">{{ opt.text }}</text>
                    </view>
                </view>
            </view>

            <view class="action-btns">
                <view v-if="currentIndex > 0" class="btn-outline" @click="prevQuestion">上一题</view>
                <view v-if="currentIndex < questions.length" class="btn-primary" @click="nextQuestion">{{ currentIndex === questions.length - 1 ? '查看结果' : '下一题' }}</view>
                <view v-if="currentIndex >= questions.length" class="btn-primary" @click="showResultPage">查看结果</view>
            </view>
        </view>

        <!-- 显示结果 -->
        <view v-else class="result-container">
            <view class="card result-card" :style="'border-left: 8rpx solid ' + result.color">
                <view class="result-header">
                    <text class="result-title">您的体质：{{ result.name }}</text>
                </view>
                <text class="result-desc">{{ result.desc }}</text>
            </view>

            <view class="card">
                <text class="section-title">饮食建议</text>
                <text class="result-text">{{ result.diet }}</text>
                <view class="recommend-foods">
                    <text class="food-label">推荐食材：</text>
                    <view class="food-tags">
                        <text v-for="(food, idx) in result.recommend" :key="idx" class="btn-tag">{{ food }}</text>
                    </view>
                </view>
            </view>

            <view class="card">
                <text class="section-title">四季养生</text>
                <view class="season-tips">
                    <view class="tip-item">
                        <text class="tip-season">春</text>
                        <text class="tip-content">{{ result.spring }}</text>
                    </view>
                    <view class="tip-item">
                        <text class="tip-season">夏</text>
                        <text class="tip-content">{{ result.summer }}</text>
                    </view>
                    <view class="tip-item">
                        <text class="tip-season">秋</text>
                        <text class="tip-content">{{ result.autumn }}</text>
                    </view>
                    <view class="tip-item">
                        <text class="tip-season">冬</text>
                        <text class="tip-content">{{ result.winter }}</text>
                    </view>
                </view>
            </view>

            <view class="action-btns">
                <view class="btn-outline" @click="retakeTest">重新测试</view>
                <view class="btn-primary" @click="goRecipes">查看食谱</view>
            </view>
        </view>
    </view>
</template>

<script>
import testData from '../../data/selfTest.js'
import storage from '../../utils/storage.js'

export default {
    data() {
        return {
            questions: [],
            currentIndex: 0,
            selectedAnswers: [],
            showResult: false,
            result: null
        }
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentIndex] || {}
        }
    },
    onLoad() {
        this.questions = testData.questions
        this.selectedAnswers = new Array(this.questions.length).fill('')
        const saved = storage.getTestResult()
        if (saved) {
            this.result = testData.results[saved]
        }
    },
    methods: {
        selectAnswer(key) {
            this.$set(this.selectedAnswers, this.currentIndex, key)
        },
        nextQuestion() {
            if (!this.selectedAnswers[this.currentIndex]) {
                uni.showToast({ title: '请选择答案', icon: 'none' })
                return
            }
            if (this.currentIndex < this.questions.length) {
                this.currentIndex++
            }
        },
        prevQuestion() {
            if (this.currentIndex > 0) {
                this.currentIndex--
            }
        },
        showResultPage() {
            this.calculateResult()
            this.showResult = true
        },
        calculateResult() {
            const typeCount = {}
            for (let i = 0; i < this.questions.length; i++) {
                const key = this.selectedAnswers[i]
                const question = this.questions[i]
                const opt = question.options.find(o => o.key === key)
                if (opt) {
                    typeCount[opt.type] = (typeCount[opt.type] || 0) + 1
                }
            }
            let maxType = 'balance'
            let maxCount = 0
            for (const t in typeCount) {
                if (typeCount[t] > maxCount) {
                    maxCount = typeCount[t]
                    maxType = t
                }
            }
            this.result = testData.results[maxType]
            storage.setTestResult(maxType)
        },
        retakeTest() {
            this.selectedAnswers = new Array(this.questions.length).fill('')
            this.currentIndex = 0
            this.showResult = false
            this.result = null
        },
        goRecipes() {
            uni.switchTab({ url: '/pages/seasonFood/seasonFood' })
        }
    }
}
</script>

<style scoped>
@import "../../styles/common.wxss";

.test-header {
    background: linear-gradient(135deg, #FFF9F2 0%, #F6EBE0 100%);
}

.test-desc {
    font-size: 28rpx;
    color: #2E2016;
    line-height: 1.8;
    margin-bottom: 24rpx;
    display: block;
}

.progress-bar {
    height: 12rpx;
    background-color: #E8D8C8;
    border-radius: 6rpx;
    overflow: hidden;
    margin-bottom: 12rpx;
}

.progress-fill {
    height: 100%;
    background-color: #8C4A31;
    border-radius: 6rpx;
    transition: width 0.3s;
}

.progress-text {
    font-size: 24rpx;
    color: #886F5C;
    text-align: right;
    display: block;
}

.question-card {
    padding: 40rpx 30rpx;
}

.question-num {
    font-size: 26rpx;
    color: #8C4A31;
    font-weight: bold;
    margin-bottom: 16rpx;
    display: block;
}

.question-text {
    font-size: 32rpx;
    color: #2E2016;
    font-weight: bold;
    line-height: 1.6;
    margin-bottom: 30rpx;
    display: block;
}

.options {
    display: flex;
    flex-direction: column;
}

.option-item {
    display: flex;
    align-items: center;
    padding: 24rpx 28rpx;
    border: 2rpx solid #E8D8C8;
    border-radius: 12rpx;
    margin-bottom: 16rpx;
    transition: all 0.2s;
}

.option-item.selected {
    border-color: #8C4A31;
    background-color: #8C4A3110;
}

.option-key {
    width: 56rpx;
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
    background-color: #F6EBE0;
    color: #8C4A31;
    border-radius: 50%;
    font-size: 26rpx;
    font-weight: bold;
    margin-right: 20rpx;
    flex-shrink: 0;
}

.option-item.selected .option-key {
    background-color: #8C4A31;
    color: #F6EBE0;
}

.option-text {
    font-size: 28rpx;
    color: #2E2016;
    flex: 1;
}

.action-btns {
    display: flex;
    justify-content: space-between;
    margin-top: 30rpx;
    padding: 0 10rpx;
}

.action-btns .btn-primary,
.action-btns .btn-outline {
    flex: 1;
    text-align: center;
    margin: 0 10rpx;
    padding: 24rpx 0;
    border-radius: 50rpx;
}

.result-card {
    background: linear-gradient(135deg, #FFF9F2 0%, #F6EBE0 100%);
}

.result-title {
    font-size: 38rpx;
    font-weight: bold;
    color: #2E2016;
    display: block;
    margin-bottom: 16rpx;
}

.result-desc {
    font-size: 28rpx;
    color: #2E2016;
    line-height: 1.8;
    display: block;
}

.result-text {
    font-size: 28rpx;
    color: #2E2016;
    line-height: 1.8;
    display: block;
    margin-bottom: 20rpx;
}

.recommend-foods {
    padding-top: 20rpx;
    border-top: 2rpx dashed #E8D8C8;
}

.food-label {
    font-size: 26rpx;
    color: #886F5C;
    margin-bottom: 16rpx;
    display: block;
}

.food-tags {
    display: flex;
    flex-wrap: wrap;
}

.season-tips {
    display: flex;
    flex-direction: column;
}

.tip-item {
    display: flex;
    align-items: flex-start;
    padding: 20rpx 0;
    border-bottom: 2rpx solid #E8D8C8;
}

.tip-item:last-child {
    border-bottom: none;
}

.tip-season {
    width: 80rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background-color: #8C4A31;
    color: #F6EBE0;
    border-radius: 50%;
    font-size: 28rpx;
    font-weight: bold;
    margin-right: 20rpx;
    flex-shrink: 0;
}

.tip-content {
    font-size: 28rpx;
    color: #2E2016;
    line-height: 1.8;
    padding-top: 20rpx;
    flex: 1;
}
</style>