<template>
    <view class="container">
        <!-- 切换 Tab -->
        <view class="tab-bar">
            <view class="tab-item" :class="{ active: currentTab === 'recipe' }" @click="switchTab('recipe')">
                <text>食谱收藏</text>
                <text class="tab-count">{{ recipeList.length }}</text>
            </view>
            <view class="tab-item" :class="{ active: currentTab === 'ingredient' }" @click="switchTab('ingredient')">
                <text>食材收藏</text>
                <text class="tab-count">{{ ingredientList.length }}</text>
            </view>
        </view>

        <!-- 食谱收藏列表 -->
        <view v-if="currentTab === 'recipe'" class="collect-list">
            <view v-for="item in recipeList" :key="item.id" class="card collect-card">
                <image :src="item.img" class="collect-img" mode="aspectFill" @click="goDetail(item.id)"></image>
                <view class="collect-info">
                    <text class="collect-name">{{ item.name }}</text>
                    <text class="collect-desc">{{ item.effect }}</text>
                    <view class="collect-actions">
                        <text class="btn-tag">{{ item.seasonName }}</text>
                        <view class="delete-btn" @click="removeRecipe(item.id)">
                            <text>取消收藏</text>
                        </view>
                    </view>
                </view>
            </view>
            <view v-if="recipeList.length === 0" class="empty">
                <text class="empty-icon">🍜</text>
                <text>还没有收藏的食谱</text>
                <text class="empty-sub">去四季食谱看看吧</text>
            </view>
        </view>

        <!-- 食材收藏列表 -->
        <view v-if="currentTab === 'ingredient'" class="collect-list">
            <view v-for="item in ingredientList" :key="item.id" class="card collect-card">
                <image :src="item.img" class="collect-img" mode="aspectFill" @click="goDetail(item.id, 'ingredient')"></image>
                <view class="collect-info">
                    <text class="collect-name">{{ item.name }}</text>
                    <text class="collect-desc">{{ item.effect }}</text>
                    <view class="collect-actions">
                        <text class="btn-tag">{{ item.category }}</text>
                        <view class="delete-btn" @click="removeIngredient(item.id)">
                            <text>取消收藏</text>
                        </view>
                    </view>
                </view>
            </view>
            <view v-if="ingredientList.length === 0" class="empty">
                <text class="empty-icon">🌿</text>
                <text>还没有收藏的食材</text>
                <text class="empty-sub">去食材科普看看吧</text>
            </view>
        </view>
    </view>
</template>

<script>
import storage from '../../utils/storage.js'

export default {
    data() {
        return {
            currentTab: 'recipe',
            recipeList: [],
            ingredientList: []
        }
    },
    onShow() {
        this.loadData()
    },
    methods: {
        loadData() {
            this.recipeList = storage.getRecipes()
            this.ingredientList = storage.getIngredients()
        },
        switchTab(tab) {
            this.currentTab = tab
        },
        goDetail(id, type) {
            const urlType = type === 'ingredient' ? 'ingredient' : 'recipe'
            uni.navigateTo({ url: '/pages/detail/detail?id=' + id + '&type=' + urlType })
        },
        removeRecipe(id) {
            uni.showModal({
                title: '提示',
                content: '确认取消收藏此食谱？',
                success: (res) => {
                    if (res.confirm) {
                        storage.removeRecipe(id)
                        this.loadData()
                        uni.showToast({ title: '已取消', icon: 'success' })
                    }
                }
            })
        },
        removeIngredient(id) {
            uni.showModal({
                title: '提示',
                content: '确认取消收藏此食材？',
                success: (res) => {
                    if (res.confirm) {
                        storage.removeIngredient(id)
                        this.loadData()
                        uni.showToast({ title: '已取消', icon: 'success' })
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
@import "../../styles/common.wxss";

.tab-bar {
    display: flex;
    background-color: #FFF9F2;
    border-radius: 16rpx;
    padding: 10rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(140, 74, 49, 0.08);
}

.tab-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24rpx 0;
    border-radius: 12rpx;
    font-size: 28rpx;
    color: #886F5C;
}

.tab-item.active {
    background-color: #8C4A31;
    color: #F6EBE0;
    font-weight: bold;
}

.tab-count {
    margin-left: 10rpx;
    font-size: 24rpx;
    background-color: #8C4A31;
    color: #F6EBE0;
    padding: 4rpx 14rpx;
    border-radius: 20rpx;
}

.tab-item.active .tab-count {
    background-color: #F6EBE0;
    color: #8C4A31;
}

.collect-list {
    display: flex;
    flex-direction: column;
}

.collect-card {
    display: flex;
    padding: 24rpx;
    margin-bottom: 20rpx;
}

.collect-img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
    margin-right: 24rpx;
    flex-shrink: 0;
}

.collect-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.collect-name {
    font-size: 32rpx;
    font-weight: bold;
    color: #2E2016;
    margin-bottom: 12rpx;
}

.collect-desc {
    font-size: 26rpx;
    color: #2E2016;
    line-height: 1.6;
    margin-bottom: 20rpx;
    flex: 1;
}

.collect-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.delete-btn {
    font-size: 24rpx;
    color: #8C4A31;
    padding: 8rpx 20rpx;
    border: 2rpx solid #8C4A31;
    border-radius: 30rpx;
}

.empty-sub {
    font-size: 24rpx;
    color: #886F5C;
    display: block;
    margin-top: 12rpx;
}
</style>