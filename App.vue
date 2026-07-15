<script>
export default {
    onLaunch: function() {
        console.log('App Launch - 四季养生食谱启动')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    }
}
</script>

<style>
/* 全局样式 */
page {
    background-color: #F6EBE0;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
    color: #2E2016;
}

.container {
    padding: 20rpx;
    min-height: 100vh;
    box-sizing: border-box;
}

.card {
    background-color: #FFF9F2;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(140, 74, 49, 0.12);
}

.section-title {
    font-size: 32rpx;
    color: #8C4A31;
    font-weight: bold;
    padding: 10rpx 0 20rpx 0;
    display: block;
}

.btn-tag {
    display: inline-block;
    background-color: #F6EBE0;
    color: #8C4A31;
    padding: 8rpx 20rpx;
    border-radius: 30rpx;
    font-size: 24rpx;
    margin-right: 12rpx;
}

.btn-primary {
    background-color: #8C4A31;
    color: #F6EBE0;
    border-radius: 50rpx;
    padding: 20rpx 40rpx;
    font-size: 28rpx;
    text-align: center;
    display: inline-block;
}

.btn-outline {
    background-color: transparent;
    color: #8C4A31;
    border: 2rpx solid #8C4A31;
    border-radius: 50rpx;
    padding: 18rpx 40rpx;
    font-size: 28rpx;
    text-align: center;
    display: inline-block;
}

.empty {
    padding: 100rpx 0;
    text-align: center;
    color: #886F5C;
    font-size: 28rpx;
}

.empty-icon {
    font-size: 120rpx;
    display: block;
    margin-bottom: 20rpx;
}

.divider {
    height: 2rpx;
    background-color: #E8D8C8;
    margin: 20rpx 0;
}
</style>