<template>
  <div style="background-color: #fafafa">
    <TopNav />
    <UserHead />
    <UserApp />
    <UserPlayList />
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import UserHead from "@/components/User/UserHead.vue";
import UserApp from "@/components/User/UserApp.vue";
import UserPlayList from "@/components/User/UserPlayList.vue";
export default { components: { TopNav, UserHead, UserApp, UserPlayList } };
</script>

<style lang="less" scoped></style>
