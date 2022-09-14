<template>
  <div>
    <ItemMusicTop :playList="state.playList" />
    <ItemMusicList
      :itemList="state.itemList"
      :subscribedCount="state.playList.subscribedCount"
    />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import { getMusicItemList, getItemList } from "@/request/api/item.js";
import ItemMusicTop from "../components/Item/ItemMusicTop.vue";
import ItemMusicList from "@/components/Item/ItemMusicList.vue";
export default {
  setup() {
    const state = reactive({
      playList: {}, //歌单的详情
      itemList: [], //歌单的歌曲
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      //获取歌单详情
      let res = await getMusicItemList(id);
      state.playList = res.data.playlist;
      //获取歌单歌曲
      let result = await getItemList(id);
      state.itemList = result.data.songs;
      // console.log(result);
      //防止页面刷新，数据丢失，将数据保存到sessionStorage里面
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
    return { state };
  },
  components: { ItemMusicTop, ItemMusicList },
};
</script>

<style lang="less" scoped></style>
