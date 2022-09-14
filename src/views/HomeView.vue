<template>
  <div class="home" style="background-color: #fafafa">
    <TopNav />
    <TopSwipe />
    <IconList />
    <MusicList />
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import TopSwipe from "@/components/Home/TopSwipe.vue";
import IconList from "@/components/Home/iconList.vue";
import MusicList from "@/components/Home/MusicList.vue";
export default {
  name: "HomeView",
  components: {
    TopNav,
    TopSwipe,
    IconList,
    MusicList,
  },
};
</script>
