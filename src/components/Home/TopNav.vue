<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>
    <div class="topContent">
      <span
        @click="$router.push('/infoUser')"
        :class="{ active: '/infoUser' === $route.path }"
        >我的</span
      >
      <span @click="$router.push('/')" :class="{ active: '/' === $route.path }"
        >发现</span
      >
      <span
        @click="$router.push('/yuncun')"
        :class="{ active: '/yuncun' === $route.path }"
        >云村</span
      >
      <span
        @click="$router.push('/shipin')"
        :class="{ active: '/shipin' === $route.path }"
        >视频</span
      >
    </div>
    <div class="topRight">
      <van-icon name="search" size=".5rem" @click="$router.push('/search')" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.34rem;

    .active {
      font-weight: 900;
    }
  }
}
</style>
