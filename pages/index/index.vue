<template>
    <view class="container">
        <!-- 自动轮播图 -->
        <swiper class="banner" :autoplay="true" interval="3000" circular :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#8C4A31">
            <swiper-item v-for="item in bannerList" :key="item.id" @click="goSeason(item.season)">
                <view class="banner-item">
                    <image :src="item.img" mode="aspectFill" class="banner-img"></image>
                    <view class="banner-mask"></view>
                    <view class="banner-text">
                        <text class="banner-title">{{ item.title }}</text>
                        <text class="banner-subtitle">{{ item.subtitle }}</text>
                    </view>
                </view>
            </swiper-item>
        </swiper>

        <!-- 今日节气养生 -->
        <view class="card term-card">
            <view class="term-header">
                <text class="section-title">今日养生</text>
                <text class="term-date">{{ solarInfo.date }}</text>
            </view>
            <view class="term-content">
                <view class="term-main">
                    <text class="term-name">{{ solarInfo.term.name }}</text>
                    <text class="term-season">{{ solarInfo.seasonName }}</text>
                </view>
                <view class="term-tip">
                    <text class="tip-label">养生提示</text>
                    <text class="tip-text">{{ solarInfo.term.tip }}</text>
                </view>
            </view>
        </view>

        <!-- 四季快速入口 -->
        <view class="card">
            <view class="section-title">四季食谱</view>
            <view class="season-entries">
                <view v-for="entry in quickEntries" :key="entry.id" class="season-entry" :style="'background-color: ' + entry.color + '20'" @click="goSeason(entry.id)">
                    <text class="season-icon">{{ entry.icon }}</text>
                    <text class="season-name">{{ entry.name }}季</text>
                    <text class="season-desc">{{ entry.desc }}</text>
                </view>
            </view>
        </view>

        <!-- 快捷功能 -->
        <view class="card">
            <view class="section-title">养生百科</view>
            <view class="quick-functions">
                <view class="quick-item" @click="goIngredient">
                    <text class="quick-icon">🌿</text>
                    <text class="quick-label">食材科普</text>
                </view>
                <view class="quick-item" @click="goSelfTest">
                    <text class="quick-icon">📋</text>
                    <text class="quick-label">饮食自测</text>
                </view>
                <view class="quick-item" @click="goCollect">
                    <text class="quick-icon">⭐</text>
                    <text class="quick-label">我的收藏</text>
                </view>
                <view class="quick-item" @click="goSetting">
                    <text class="quick-icon">⚙️</text>
                    <text class="quick-label">设置</text>
                </view>
            </view>
        </view>

        <!-- 推荐食谱 -->
        <view class="card">
            <view class="section-title">今日推荐</view>
            <view class="recommend-list">
                <view v-for="recipe in recommendRecipes" :key="recipe.id" class="recommend-item" @click="goDetail(recipe.id)">
                    <image :src="recipe.img" class="recommend-img" mode="aspectFill"></image>
                    <view class="recommend-info">
                        <text class="recommend-name">{{ recipe.name }}</text>
                        <view class="recommend-tags">
                            <text v-for="(tag, idx) in recipe.tags" :key="idx" class="btn-tag">{{ tag }}</text>
                        </view>
                        <text class="recommend-season">{{ recipe.seasonName }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import  from '../../data/recipes.js'
import dateUindexData from '../../data/index.js'
import recipestil from '../../utils/date.js'

export default {
    data() {
        return {
            bannerList: [],
            quickEntries: [],
            solarInfo: {},
            recommendRecipes: []
        }
    },
    onLoad() {
        this.initData()
    },
    onShow() {
        this.initData()
    },
    methods: {
        initData() {
            this.bannerList = indexData.banners
            this.quickEntries = indexData.quickEntries
            this.solarInfo = dateUtil.getCurrentSolarTerm()
            const seasonKey = this.solarInfo.season
            this.recommendRecipes = recipes.filter(r => r.season === seasonKey).slice(0, 3)
        },
        goSeason(seasonKey) {
            uni.switchTab({
                url: '/pages/seasonFood/seasonFood'
            })
            setTimeout(() => {
                uni.$emit('changeSeason', seasonKey)
            }, 300)
        },
        goIngredient() {
            uni.navigateTo({ url: '/pages/ingredient/ingredient' })
        },
        goSelfTest() {
            uni.navigateTo({ url: '/pages/selfTest/selfTest' })
        },
        goCollect() {
            uni.switchTab({ url: '/pages/collect/collect' })
        },
        goSetting() {
            uni.navigateTo({ url: '/pages/setting/setting' })
        },
        goDetail(id) {
            uni.navigateTo({ url: '/pages/detail/detail?id=' + id })
        }
    }
}
</script>

<style scoped>
@import "../../styles/common.wxss";

.banner {
    height: 360rpx;
    margin-bottom: 24rpx;
    border-radius: 20rpx;
    overflow: hidden;
}

.banner-item {
    width: 100%;
    height: 100%;
    position: relative;
}

.banner-img {
    width: 100%;
    height: 100%;
}

.banner-mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: linear-gradient(transparent, rgba(46, 32, 22, 0.5));
}

.banner-text {
    position: absolute;
    left: 30rpx;
    bottom: 30rpx;
    color: #F6EBE0;
}

.banner-title {
    font-size: 40rpx;
    font-weight: bold;
    display: block;
    margin-bottom: 8rpx;
}

.banner-subtitle {
    font-size: 26rpx;
    display: block;
    opacity: 0.9;
}

.term-card {
    background: linear-gradient(135deg, #FFF9F2 0%, #F6EBE0 100%);
}

.term-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
}

.term-date {
    font-size: 24rpx;
    color: #886F5C;
}

.term-content {
    padding: 10rpx 0;
}

.term-main {
    display: flex;
    align-items: baseline;
    margin-bottom: 20rpx;
}

.term-name {
    font-size: 48rpx;
    font-weight: bold;
    color: #8C4A31;
    margin-right: 20rpx;
}

.term-season {
    font-size: 28rpx;
    color: #886F5C;
    padding: 6rpx 16rpx;
    background: #8C4A3115;
    border-radius: 20rpx;
}

.term-tip {
    display: flex;
    align-items: flex-start;
}

.tip-label {
    font-size: 26rpx;
    color: #886F5C;
    margin-right: 12rpx;
    flex-shrink: 0;
}

.tip-text {
    font-size: 28rpx;
    color: #2E2016;
    flex: 1;
    line-height: 1.6;
}

.season-entries {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
}

.season-entry {
    width: 150rpx;
    height: 180rpx;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20rpx 0;
}

.season-icon {
    font-size: 50rpx;
    margin-bottom: 12rpx;
}

.season-name {
    font-size: 32rpx;
    font-weight: bold;
    color: #8C4A31;
    margin-bottom: 8rpx;
}

.season-desc {
    font-size: 22rpx;
    color: #886F5C;
}

.quick-functions {
    display: flex;
    justify-content: space-around;
    padding: 20rpx 0;
}

.quick-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx;
    border-radius: 16rpx;
}

.quick-icon {
    font-size: 60rpx;
    margin-bottom: 12rpx;
}

.quick-label {
    font-size: 24rpx;
    color: #2E2016;
}

.recommend-list {
    display: flex;
    flex-direction: column;
}

.recommend-item {
    display: flex;
    padding: 20rpx 0;
    border-bottom: 2rpx solid #E8D8C8;
}

.recommend-item:last-child {
    border-bottom: none;
}

.recommend-img {
    width: 200rpx;
    height: 160rpx;
    border-radius: 12rpx;
    margin-right: 20rpx;
    flex-shrink: 0;
}

.recommend-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.recommend-name {
    font-size: 30rpx;
    font-weight: bold;
    color: #2E2016;
    margin-bottom: 10rpx;
}

.recommend-tags {
    margin-bottom: 10rpx;
}

.recommend-season {
    font-size: 24rpx;
    color: #886F5C;
}
</style>