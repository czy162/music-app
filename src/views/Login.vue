<template>
  <div class="login">
    <div class="loginList">
      <!-- 微信登录 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-10wechat"></use>
      </svg>
      <!-- QQ登录 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-11qq"></use>
      </svg>
      <!-- 微博登录 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-12sina"></use>
      </svg>
      <!-- 邮箱登录 -->
      <svg class="icon" aria-hidden="true" @click="$router.push('/loginemail')">
        <use xlink:href="#icon-youxiang"></use>
      </svg>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url(../assets/LoginBack.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .loginList {
    width: 70%;
    display: flex;
    position: absolute;
    bottom: 1.4rem;
    left: 1.1rem;

    .icon {
      width: 1.8rem;
      height: 0.8rem;
      fill: white;
    }
  }
}
</style>
