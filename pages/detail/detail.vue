<template>
    <view class="container">
        <!-- 食材详情 -->
        <view v-if="currentType === 'ingredient' && ingredientData">
            <view class="detail-header card">
                <image :src="ingredientData.img" class="detail-img" mode="aspectFill"></image>
                <view class="detail-title">
                    <text class="title-name">{{ ingredientData.name }}</text>
                    <view class="title-tags">
                        <text class="btn-tag">{{ ingredientData.category }}</text>
                        <text class="btn-tag">{{ ingredientData.nature }}</text>
                    </view>
                </view>
                <view class="collect-btn" :class="{ collected: isCollected }" @click="toggleCollect">
                    <text>{{ isCollected ? '★ 已收藏' : '☆ 收藏' }}</text>
                </view>
            </view>

            <view class="card">
                <text class="section-title">性味归经</text>
                <text class="detail-text">{{ ingredientData.meridians }}</text>
            </view>

            <view class="card">
                <text class="section-title">功效主治</text>
                <text class="detail-text">{{ ingredientData.effect }}</text>
            </view>

            <view class="card">
                <text class="section-title">适宜人群</text>
                <text class="detail-text good">{{ ingredientData.suitable }}</text>
            </view>

            <view class="card">
                <text class="section-title">饮食禁忌</text>
                <text class="detail-text bad">{{ ingredientData.avoid }}</text>
            </view>

            <view class="card">
                <text class="section-title">营养成分</text>
                <text class="detail-text">{{ ingredientData.nutrition }}</text>
            </view>

            <view class="card">
                <text class="section-title">食用方法</text>
                <text class="detail-text">{{ ingredientData.usage }}</text>
            </view>

            <view class="card">
                <text class="section-title">养生贴士</text>
                <text class="detail-text tip">{{ ingredientData.tip }}</text>
            </view>

            <view class="card">
                <text class="section-title">推荐搭配</text>
                <view class="recipe-list">
                    <text v-for="(r, idx) in ingredientData.recipes" :key="idx" class="btn-tag large">{{ r }}</text>
                </view>
            </view>
        </view>

        <!-- 食谱详情 -->
        <view v-else-if="currentType === 'recipe' && recipeData">
            <view class="detail-header card">
                <image :src="recipeData.img" class="detail-img" mode="aspectFill"></image>
                <view class="detail-title">
                    <text class="title-name">{{ recipeData.name }}</text>
                    <view class="title-tags">
                        <text v-for="(tag, idx) in recipeData.tags" :key="idx" class="btn-tag">{{ tag }}</text>
                    </view>
                </view>
                <view class="collect-btn" :class="{ collected: isCollected }" @click="toggleCollect">
                    <text>{{ isCollected ? '★ 已收藏' : '☆ 收藏' }}</text>
                </view>
            </view>

            <view class="card">
                <text class="section-title">养生功效</text>
                <text class="detail-text">{{ recipeData.effect }}</text>
            </view>

            <view class="card">
                <text class="section-title">所需食材</text>
                <text class="detail-text">{{ recipeData.ingredients }}</text>
            </view>

            <view class="card">
                <text class="section-title">制作步骤</text>
                <text class="detail-text steps">{{ recipeData.steps }}</text>
            </view>

            <view class="card info-card">
                <view class="info-row">
                    <text class="info-label">适宜人群</text>
                    <text class="info-value good">{{ recipeData.suitable }}</text>
                </view>
                <view class="divider"></view>
                <view class="info-row">
                    <text class="info-label">饮食禁忌</text>
                    <text class="info-value bad">{{ recipeData.avoid }}</text>
                </view>
                <view class="divider"></view>
                <view class="info-row">
                    <text class="info-label">热量</text>
                    <text class="info-value">{{ recipeData.calorie }}</text>
                </view>
            </view>
        </view>

        <view v-else class="empty">
            <text class="empty-icon">📭</text>
            <text>加载中...</text>
        </view>
    </view>
</template>

<script>
import recipes from '../../data/recipes.js'
import ingredients from '../../data/ingredients.js'
import storage from '../../utils/storage.js'

export default {
    data() {
        return {
            currentType: 'recipe',
            currentId: '',
            recipeData: null,
            ingredientData: null,
            isCollected: false
        }
    },
    onLoad(options) {
        this.currentId = options.id
        this.currentType = options.type || 'recipe'
        this.loadDetail()
    },
    onShow() {
        this.checkCollected()
    },
    methods: {
        loadDetail() {
            if (this.currentType === 'ingredient') {
                this.ingredientData = ingredients.find(i => i.id === this.currentId)
                if (this.ingredientData) {
                    uni.setNavigationBarTitle({ title: this.ingredientData.name })
                }
            } else {
                this.recipeData = recipes.find(r => r.id === this.currentId)
                if (this.recipeData) {
                    uni.setNavigationBarTitle({ title: this.recipeData.name })
                }
            }
            this.checkCollected()
        },
        checkCollected() {
            if (this.currentType === 'ingredient') {
                this.isCollected = storage.isIngredientCollected(this.currentId)
            } else {
                this.isCollected = storage.isRecipeCollected(this.currentId)
            }
        },
        toggleCollect() {
            if (this.currentType === 'ingredient') {
                if (this.isCollected) {
                    storage.removeIngredient(this.currentId)
                    uni.showToast({ title: '已取消收藏', icon: 'none' })
                } else {
                    storage.addIngredient(this.ingredientData)
                    uni.showToast({ title: '收藏成功', icon: 'success' })
                }
            } else {
                if (this.isCollected) {
                    storage.removeRecipe(this.currentId)
                    uni.showToast({ title: '已取消收藏', icon: 'none' })
                } else {
                    storage.addRecipe(this.recipeData)
                    uni.showToast({ title: '收藏成功', icon: 'success' })
                }
            }
            this.isCollected = !this.isCollected
        }
    }
}
</script>

<style scoped>
@import "../../styles/common.wxss";

.detail-header {
    position: relative;
    padding: 0;
    overflow: hidden;
}

.detail-img {
    width: 100%;
    height: 400rpx;
}

.detail-title {
    padding: 30rpx;
}

.title-name {
    font-size: 40rpx;
    font-weight: bold;
    color: #2E2016;
    margin-bottom: 16rpx;
    display: block;
}

.title-tags {
    display: flex;
    flex-wrap: wrap;
}

.collect-btn {
    position: absolute;
    top: 30rpx;
    right: 30rpx;
    padding: 14rpx 28rpx;
    background-color: rgba(255, 249, 242, 0.95);
    color: #8C4A31;
    border-radius: 40rpx;
    font-size: 26rpx;
    font-weight: bold;
}

.collect-btn.collected {
    background-color: #8C4A31;
    color: #F6EBE0;
}

.detail-text {
    font-size: 28rpx;
    color: #2E2016;
    line-height: 1.9;
    display: block;
    padding: 10rpx 0;
}

.detail-text.good {
    color: #6B8E4E;
}

.detail-text.bad {
    color: #C88B4A;
}

.detail-text.tip {
    color: #8C4A31;
    font-style: italic;
    background-color: #8C4A3108;
    padding: 20rpx;
    border-radius: 12rpx;
}

.detail-text.steps {
    white-space: pre-line;
}

.recipe-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10rpx 0;
}

.btn-tag.large {
    padding: 14rpx 28rpx;
    margin-right: 16rpx;
    margin-bottom: 16rpx;
    font-size: 26rpx;
}

.info-card {
    padding: 30rpx;
}

.info-row {
    display: flex;
    align-items: flex-start;
    padding: 16rpx 0;
}

.info-label {
    font-size: 26rpx;
    color: #886F5C;
    width: 160rpx;
    flex-shrink: 0;
}

.info-value {
    font-size: 28rpx;
    color: #2E2016;
    flex: 1;
    line-height: 1.6;
}

.info-value.good {
    color: #6B8E4E;
}

.info-value.bad {
    color: #C88B4A;
}
</style>