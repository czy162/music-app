<template>
  <div>
    <van-nav-bar
      left-text="手机号码登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="email"
          name="email"
          label="网易邮箱"
          placeholder="网易邮箱"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          color="#ff3a3a"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import "vant/es/toast/style";
import { getUserInfo } from "@/request/api/home";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter();
    const onClickLeft = () => history.back();
    async function onSubmit(values) {
      let res = await store.dispatch("getLogin", {
        email: values.email,
        password: values.password,
      });
      console.log(res);
      //登录成功
      if (res.data.code === 200) {
        store.commit("updateIsLogin", true);
        store.commit("updateToken", res.data.token);
        let result = await getUserInfo(res.data.account.id);
        store.commit("updateUser", result);
        router.push("/infoUser");
      } else {
        Toast.fail("账号或密码错误");
        values.email = "";
        values.password = "";
      }
    }

    return {
      email,
      password,
      store,
      router,
      onSubmit,
      onClickLeft,
    };
  },
};
</script>

<style lang="less" scoped></style>
