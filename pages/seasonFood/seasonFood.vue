<template>
    <view class="container">
        <!-- 季节切换 -->
        <view class="season-tabs">
            <view v-for="tab in seasonTabs" :key="tab.key" class="season-tab" :class="{ active: currentSeason === tab.key }" @click="changeSeason(tab.key)">
                <text class="tab-icon">{{ tab.icon }}</text>
                <text class="tab-name">{{ tab.name }}</text>
            </view>
        </view>

        <!-- 季节养生重点 -->
        <view class="card season-tip-card">
            <view class="section-title">{{ currentSeasonTip }}</view>
            <text class="tip-desc">{{ seasonTipText }}</text>
        </view>

        <!-- 食谱列表 -->
        <view class="recipe-list">
            <view v-for="recipe in currentRecipes" :key="recipe.id" class="card recipe-card" @click="goDetail(recipe.id)">
                <image :src="recipe.img" class="recipe-img" mode="aspectFill"></image>
                <view class="recipe-info">
                    <text class="recipe-name">{{ recipe.name }}</text>
                    <view class="recipe-tags">
                        <text v-for="(tag, idx) in recipe.tags" :key="idx" class="btn-tag">{{ tag }}</text>
                    </view>
                    <view class="recipe-detail-row">
                        <text class="detail-label">适宜：</text>
                        <text class="detail-text">{{ recipe.suitable }}</text>
                    </view>
                    <view class="recipe-detail-row">
                        <text class="detail-label">禁忌：</text>
                        <text class="detail-text">{{ recipe.avoid }}</text>
                    </view>
                    <view class="recipe-calorie">
                        <text>热量：{{ recipe.calorie }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import recipes from '../../data/recipes.js'
import dateUtil from '../../utils/date.js'

export default {
    data() {
        return {
            seasonTabs: [
                { key: 'spring', name: '春季', icon: '🌱' },
                { key: 'summer', name: '夏季', icon: '☀️' },
                { key: 'autumn', name: '秋季', icon: '🍂' },
                { key: 'winter', name: '冬季', icon: '❄️' }
            ],
            currentSeason: 'spring'
        }
    },
    computed: {
        currentRecipes() {
            return recipes.filter(r => r.season === this.currentSeason)
        },
        currentSeasonTip() {
            return dateUtil.getSeasonName(this.currentSeason) + '养生'
        },
        seasonTipText() {
            return dateUtil.getSeasonTip(this.currentSeason)
        }
    },
    onLoad() {
        const info = dateUtil.getCurrentSolarTerm()
        this.currentSeason = info.season
    },
    onShow() {
        const self = this
        uni.$on('changeSeason', function(seasonKey) {
            self.currentSeason = seasonKey
        })
    },
    onHide() {
        uni.$off('changeSeason')
    },
    methods: {
        changeSeason(key) {
            this.currentSeason = key
        },
        goDetail(id) {
            uni.navigateTo({ url: '/pages/detail/detail?id=' + id })
        }
    }
}
</script>

<style scoped>
@import "../../styles/common.wxss";

.season-tabs {
    display: flex;
    background-color: #FFF9F2;
    border-radius: 16rpx;
    padding: 10rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(140, 74, 49, 0.08);
}

.season-tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24rpx 0;
    border-radius: 12rpx;
    transition: all 0.3s;
}

.season-tab.active {
    background-color: #8C4A31;
}

.tab-icon {
    font-size: 40rpx;
    margin-bottom: 8rpx;
}

.tab-name {
    font-size: 26rpx;
    color: #886F5C;
}

.season-tab.active .tab-name {
    color: #F6EBE0;
    font-weight: bold;
}

.season-tip-card {
    background: linear-gradient(135deg, #FFF9F2 0%, #F6EBE0 100%);
}

.tip-desc {
    font-size: 28rpx;
    color: #2E2016;
    line-height: 1.8;
    display: block;
}

.recipe-list {
    display: flex;
    flex-direction: column;
}

.recipe-card {
    padding: 0;
    overflow: hidden;
}

.recipe-img {
    width: 100%;
    height: 360rpx;
}

.recipe-info {
    padding: 30rpx;
}

.recipe-name {
    font-size: 36rpx;
    font-weight: bold;
    color: #2E2016;
    margin-bottom: 16rpx;
    display: block;
}

.recipe-tags {
    margin-bottom: 20rpx;
}

.recipe-detail-row {
    display: flex;
    margin-bottom: 12rpx;
    font-size: 26rpx;
    line-height: 1.6;
}

.detail-label {
    color: #8C4A31;
    font-weight: bold;
    flex-shrink: 0;
}

.detail-text {
    color: #2E2016;
    flex: 1;
}

.recipe-calorie {
    margin-top: 16rpx;
    padding-top: 16rpx;
    border-top: 2rpx dashed #E8D8C8;
    font-size: 24rpx;
    color: #886F5C;
}
</style>