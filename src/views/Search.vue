<template>
  <div class="searchTop">
    <form action="/" style="width: 100%">
      <van-search
        v-model="searchKey"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.go(-1)"
      />
    </form>
  </div>
  <div class="searchHistory">
    <p>历史</p>
    <van-icon class="searchDelete" name="delete-o" @click="searchDelete" />
    <span
      class="historyList"
      v-for="item in searchList.keyWorldList"
      :key="item"
      @click="searchHistory(item)"
    >
      {{ item }}
    </span>
  </div>
  <div style="padding-bottom: 1.25rem">
    <div
      class="musicListContent"
      v-for="(item, i) in searchList.searchRes"
      :key="i"
    >
      <div class="center" @click="updateIndex(item)">
        <p style="font-size: 17px">{{ item.name }}</p>
        <span
          class="van-ellipsis"
          v-for="(item1, index) in item.ar"
          :key="index"
          style="color: gray; width: 4.8rem"
          >{{ item1.name }}</span
        >
      </div>
      <div class="right">
        <van-icon v-show="item.mvid != 0" name="video-o" class="mv" />
        <van-icon name="ellipsis" class="mv2" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { Dialog } from "vant";
import "vant/es/dialog/style";
import { getSearchMusic } from "@/request/api/home";
import { useStore } from "vuex";

export default {
  setup() {
    const searchKey = ref();
    const searchList = reactive({
      keyWorldList: [],
      searchRes: [],
    });
    const store = useStore();
    async function onSearch() {
      if (searchKey.value !== "") {
        searchList.keyWorldList.unshift(searchKey.value);
        //去重
        searchList.keyWorldList = [...new Set(searchList.keyWorldList)];
        //保存
        localStorage.setItem(
          "keyWorldList",
          JSON.stringify(searchList.keyWorldList)
        );
        //搜索功能实现
        let res = await getSearchMusic(searchKey.value);
        // console.log(res);
        searchList.searchRes = res.data.result.songs;
        console.log(searchList.searchRes);
        //清空搜索框
        searchKey.value = "";
        // console.log(searchList.keyWorldList);
        // console.log(searchKey.value);
      }
    }
    //搜索历史点击
    async function searchHistory(item) {
      let res = await getSearchMusic(item);
      searchList.searchRes = res.data.result.songs;
      // console.log(searchList.searchRes);
    }
    function searchDelete() {
      Dialog.confirm({
        message: "确认删除历史记录",
      })
        .then(() => {
          // on confirm
          searchList.keyWorldList = [];
          localStorage.removeItem("keyWorldList");
        })
        .catch(() => {
          // on cancel
        });
    }
    function updateIndex(item) {
      store.commit("pushPlayList", item);
      store.commit("updatePlayListIndex", store.state.playList.length - 1);
    }
    onMounted(() => {
      searchList.keyWorldList =
        JSON.parse(localStorage.getItem("keyWorldList")) || [];
    });
    return {
      searchKey,
      searchList,
      store,
      onSearch,
      searchHistory,
      searchDelete,
      updateIndex,
    };
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  align-items: center;
}

.searchHistory {
  width: 90%;
  margin: 0 auto;

  .searchDelete {
    position: absolute;
    top: 1.04rem;
    right: 0.2rem;
    font-size: 0.36rem;
  }

  .historyList {
    display: inline-block;
    border: 1px solid #ecf0f1;
    border-radius: 0.4rem;
    padding: 0.1rem 0.2rem;
    background-color: #ecf0f1;
    margin: 5px 0 0 5px;
  }
}

.musicListContent {
  width: 100%;
  height: 1rem;
  display: flex;

  .center {
    width: 70%;
    margin: 0.2rem 0 0 0.5rem;

    p {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .right {
    width: 30%;
    position: relative;

    .van-icon {
      width: 50%;
      text-align: center;
      font-size: 0.5rem;
      line-height: 1rem;
    }

    .mv2 {
      position: absolute;
      right: 0;
    }
  }
}
</style>
