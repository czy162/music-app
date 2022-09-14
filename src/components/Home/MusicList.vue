<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">推荐歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="135"
        class="my-swipe"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: 'itemmusic', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <van-icon name="play-circle-o" size=".5rem" />
              {{ changeCount(item.playCount) }}
            </span>
            <p class="name">{{ item.name }}</p>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>

  <div class="newSong">
    <div class="songTop">
      <div class="title">推荐新音乐</div>
      <div class="more">播放全部</div>
    </div>
    <div class="songContent">
      <!-- <router-link :to="{ path: 'itemmusic', query: { id: item.id } }"> -->
      <div class="songList" v-for="item in state.newSongList" :key="item">
        <div class="song">
          <div class="left">
            <img :src="item.picUrl" alt="" />
            <p>{{ item.name }}</p>
          </div>
          <van-icon
            name="play-circle-o"
            size="25px"
            style="line-height: 0.8rem"
          />
        </div>
      </div>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import { getMusicList, getNewSong } from "@/request/api/home";
import { reactive, onMounted } from "vue";

export default {
  // vue3
  setup() {
    const state = reactive({
      musicList: [],
      newSongList: [],
    });
    function changeCount(num) {
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      // console.log(res);
      state.musicList = res.data.result;

      let newSong = await getNewSong();
      // console.log(newSong);
      state.newSongList = newSong.data.result;
    });
    return { state, changeCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;

  .musicTop {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }

    .more {
      border: 1px solid #ccc;
      border-radius: 0.4rem;
      line-height: 0.6rem;
      padding: 0 0.2rem;
    }
  }

  .musicContent {
    width: 100%;
    height: 4rem;
    margin-top: 0.1rem;

    .my-swipe {
      height: 100%;

      .van-swipe-item {
        width: 2.5rem;
      }

      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 10px;
      }

      .playCount {
        display: flex;
        position: absolute;
        right: 0.3rem;
        top: 0;
        color: white;
        line-height: 0.5rem;
      }

      .name {
        width: 2.5rem;
        font-size: 12px;
      }
    }
  }
}
.newSong {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .songTop {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }

    .more {
      border: 1px solid #ccc;
      border-radius: 0.4rem;
      line-height: 0.6rem;
      padding: 0 0.2rem;
    }
  }
  .songContent {
    width: 100%;
    height: 10rem;
    margin-top: 0.1rem;
    .songList {
      width: 100%;
      display: inline-block;
      .song {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          p {
            padding-left: 0.2rem;
          }
        }
      }
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>
