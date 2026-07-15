<template>
    <view class="container">
        <!-- 搜索框 -->
        <view class="search-bar">
            <text class="search-icon">🔍</text>
            <input type="text" class="search-input" placeholder="搜索食材名称、功效" v-model="keyword" @input="onSearch" />
            <text v-if="keyword" class="clear-btn" @click="clearSearch">✕</text>
        </view>

        <!-- 分类标签 -->
        <view class="category-tags">
            <text v-for="cat in categories" :key="cat" class="category-tag" :class="{ active: currentCategory === cat }" @click="changeCategory(cat)">{{ cat }}</text>
        </view>

        <!-- 食材列表 -->
        <view class="ingredient-list">
            <view v-for="item in filteredIngredients" :key="item.id" class="card ingredient-card" @click="goDetail(item.id)">
                <image :src="item.img" class="ingredient-img" mode="aspectFill"></image>
                <view class="ingredient-info">
                    <text class="ingredient-name">{{ item.name }}</text>
                    <text class="ingredient-nature">{{ item.nature }}</text>
                    <text class="ingredient-effect">{{ item.effect }}</text>
                    <view class="ingredient-tags">
                        <text class="btn-tag">{{ item.category }}</text>
                    </view>
                </view>
            </view>
        </view>

        <view v-if="filteredIngredients.length === 0" class="empty">
            <text class="empty-icon">🌿</text>
            <text>暂无相关食材</text>
        </view>
    </view>
</template>

<script>
import ingredients from '../../data/ingredients.js'

export default {
    data() {
        return {
            keyword: '',
            currentCategory: '全部',
            categories: ['全部', '根茎类', '果实类', '花类', '菌菇类', '种子类']
        }
    },
    computed: {
        filteredIngredients() {
            let list = ingredients
            if (this.currentCategory !== '全部') {
                list = list.filter(item => item.category === this.currentCategory)
            }
            if (this.keyword) {
                const kw = this.keyword.trim()
                list = list.filter(item =>
                    item.name.indexOf(kw) > -1 ||
                    item.effect.indexOf(kw) > -1 ||
                    item.suitable.indexOf(kw) > -1
                )
            }
            return list
        }
    },
    methods: {
        onSearch() {
            // 实时过滤已由 computed 完成
        },
        clearSearch() {
            this.keyword = ''
        },
        changeCategory(cat) {
            this.currentCategory = cat
        },
        goDetail(id) {
            uni.navigateTo({ url: '/pages/detail/detail?id=' + id + '&type=ingredient' })
        }
    }
}
</script>

<style scoped>
@import "../../styles/common.wxss";

.search-bar {
    display: flex;
    align-items: center;
    background-color: #FFF9F2;
    padding: 20rpx 30rpx;
    border-radius: 50rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(140, 74, 49, 0.08);
}

.search-icon {
    font-size: 32rpx;
    margin-right: 16rpx;
}

.search-input {
    flex: 1;
    font-size: 28rpx;
    color: #2E2016;
}

.clear-btn {
    font-size: 28rpx;
    color: #886F5C;
    padding: 0 10rpx;
}

.category-tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24rpx;
}

.category-tag {
    padding: 14rpx 28rpx;
    background-color: #FFF9F2;
    border-radius: 30rpx;
    font-size: 26rpx;
    color: #886F5C;
    margin-right: 16rpx;
    margin-bottom: 16rpx;
}

.category-tag.active {
    background-color: #8C4A31;
    color: #F6EBE0;
}

.ingredient-list {
    display: flex;
    flex-direction: column;
}

.ingredient-card {
    display: flex;
    padding: 24rpx;
    margin-bottom: 20rpx;
}

.ingredient-img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
    margin-right: 24rpx;
    flex-shrink: 0;
}

.ingredient-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.ingredient-name {
    font-size: 34rpx;
    font-weight: bold;
    color: #2E2016;
    margin-bottom: 10rpx;
}

.ingredient-nature {
    font-size: 24rpx;
    color: #8C4A31;
    margin-bottom: 10rpx;
}

.ingredient-effect {
    font-size: 26rpx;
    color: #2E2016;
    line-height: 1.6;
    margin-bottom: 12rpx;
    flex: 1;
}

.ingredient-tags {
    margin-top: auto;
}
</style>