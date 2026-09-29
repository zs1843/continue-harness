<template>
  <view class="page">
    <view class="card">
      <text class="title">Consumer H5 fixture</text>
      <text class="description">A minimal, business-neutral uni-app page.</text>
    </view>
  </view>
</template>

<style scoped>
.page {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 32rpx;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  padding: 32rpx;
  background: #ffffff;
  border-radius: 16rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 600;
}

.description {
  color: #646a73;
  font-size: 28rpx;
}
</style>
