<template>
    <view class="container">
        <!-- 字体大小 -->
        <view class="card">
            <text class="section-title">字体大小</text>
            <view class="size-options">
                <view v-for="opt in sizeOptions" :key="opt.key" class="size-option" :class="{ active: currentSize === opt.key }" @click="changeSize(opt.key)">
                    <text class="size-preview" :style="'font-size: ' + opt.size">{{ opt.label }}</text>
                    <text class="size-desc">{{ opt.desc }}</text>
                </view>
            </view>
        </view>

        <!-- 数据管理 -->
        <view class="card">
            <text class="section-title">数据管理</text>
            <view class="data-item" @click="clearAll">
                <view class="data-info">
                    <text class="data-icon">🗑️</text>
                    <text class="data-label">清除所有收藏数据</text>
                </view>
                <text class="arrow">›</text>
            </view>
        </view>

        <!-- 关于 -->
        <view class="card">
            <text class="section-title">关于应用</text>
            <view class="about-content">
                <text class="app-name">四季养生食谱</text>
                <text class="app-version">版本 1.0.0</text>
                <text class="app-desc">国风轻量化养生科普小程序，专注四季饮食养生，无广告、无社交、无商城，让养生回归简单。</text>
            </view>
        </view>

        <!-- 数据统计 -->
        <view class="card">
            <text class="section-title">我的数据</text>
            <view class="stat-grid">
                <view class="stat-item">
                    <text class="stat-num">{{ stats.recipes }}</text>
                    <text class="stat-label">收藏食谱</text>
                </view>
                <view class="stat-item">
                    <text class="stat-num">{{ stats.ingredients }}</text>
                    <text class="stat-label">收藏食材</text>
                </view>
                <view class="stat-item">
                    <text class="stat-num">{{ stats.hasTest ? '已测' : '未测' }}</text>
                    <text class="stat-label">体质测试</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import storage from '../../utils/storage.js'

export default {
    data() {
        return {
            currentSize: 'medium',
            sizeOptions: [
                { key: 'small', label: '小', desc: '标准字号', size: '26rpx' },
                { key: 'medium', label: '中', desc: '推荐字号', size: '30rpx' },
                { key: 'large', label: '大', desc: '适合长辈', size: '34rpx' }
            ],
            stats: {
                recipes: 0,
                ingredients: 0,
                hasTest: false
            }
        }
    },
    onLoad() {
        this.currentSize = storage.getFontSize()
    },
    onShow() {
        this.loadStats()
    },
    methods: {
        changeSize(key) {
            this.currentSize = key
            storage.setFontSize(key)
            uni.showToast({ title: '已保存', icon: 'success' })
        },
        loadStats() {
            this.stats.recipes = storage.getRecipes().length
            this.stats.ingredients = storage.getIngredients().length
            this.stats.hasTest = !!storage.getTestResult()
        },
        clearAll() {
            uni.showModal({
                title: '确认清除',
                content: '此操作将删除所有收藏和测试记录，确认继续吗？',
                confirmColor: '#8C4A31',
                success: (res) => {
                    if (res.confirm) {
                        storage.clearAll()
                        this.loadStats()
                        uni.showToast({ title: '已清除', icon: 'success' })
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
@import "../../styles/common.wxss";

.size-options {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
}

.size-option {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30rpx 10rpx;
    margin: 0 10rpx;
    border: 2rpx solid #E8D8C8;
    border-radius: 16rpx;
    background-color: #FFF9F2;
}

.size-option.active {
    border-color: #8C4A31;
    background-color: #8C4A3110;
}

.size-preview {
    font-weight: bold;
    color: #2E2016;
    margin-bottom: 12rpx;
}

.size-option.active .size-preview {
    color: #8C4A31;
}

.size-desc {
    font-size: 22rpx;
    color: #886F5C;
}

.data-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 0;
    border-bottom: 2rpx solid #E8D8C8;
}

.data-item:last-child {
    border-bottom: none;
}

.data-info {
    display: flex;
    align-items: center;
}

.data-icon {
    font-size: 40rpx;
    margin-right: 20rpx;
}

.data-label {
    font-size: 30rpx;
    color: #2E2016;
}

.arrow {
    font-size: 40rpx;
    color: #886F5C;
}

.about-content {
    padding: 20rpx 0;
    text-align: center;
}

.app-name {
    font-size: 36rpx;
    font-weight: bold;
    color: #8C4A31;
    margin-bottom: 12rpx;
    display: block;
}

.app-version {
    font-size: 24rpx;
    color: #886F5C;
    margin-bottom: 24rpx;
    display: block;
}

.app-desc {
    font-size: 26rpx;
    color: #2E2016;
    line-height: 1.8;
    display: block;
    text-align: left;
}

.stat-grid {
    display: flex;
    padding: 20rpx 0;
}

.stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 0;
}

.stat-num {
    font-size: 40rpx;
    font-weight: bold;
    color: #8C4A31;
    margin-bottom: 8rpx;
}

.stat-label {
    font-size: 24rpx;
    color: #886F5C;
}
</style>