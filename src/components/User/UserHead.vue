<template>
  <div class="userHead" @click="$router.push('/login')" v-if="!user">
    <div class="left">
      <van-image
        round
        width="1rem"
        height="1rem"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <p>登录/注册</p>
    </div>
    <van-icon name="arrow" style="line-height: 1.4rem" />
  </div>
  <div class="userHeadLog" v-if="user">
    <div class="left">
      <van-image
        round
        width="1rem"
        height="1rem"
        :src="user.data.profile.avatarUrl"
      />
      <p>{{ user.data.profile.nickname }}</p>
    </div>
    <van-icon name="arrow" style="line-height: 1.4rem" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    // localStorage.setItem("user", JSON.stringify(this.user));
    // this.user = JSON.parse(localStorage.getItem("user")) || [];
    console.log(this.user);
  },
};
</script>

<style lang="less" scoped>
.userHead,
.userHeadLog {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .left {
    display: flex;
    font-size: 16px;
    font-weight: 600;
    align-items: center;
    p {
      line-height: 1rem;
      padding-left: 0.2rem;
    }
  }
}
</style>
