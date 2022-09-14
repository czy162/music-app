<template>
  <div class="FooterMusic" style="background-color: #fafafa">
    <div class="left" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <p>横滑切换上下首</p>
      </div>
    </div>
    <div class="right">
      <van-icon
        name="play-circle-o"
        @click="play"
        v-show="isbtnShow"
        size=".7rem"
      />
      <van-icon
        name="pause-circle-o"
        @click="play"
        v-show="!isbtnShow"
        size=".7rem"
      />
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ width: '100%', height: '100%' }"
    >
      <MusicDetail
        :musicDetail="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
      ></MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "./MusicDetail.vue";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    // console.log(this.$refs);
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  methods: {
    play: function () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime();
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal);
      }
    },
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration);
    },
    updateTime: function () {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  watch: {
    playListIndex: function () {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        //改变播放暂停图标
        this.updateIsbtnShow(false);
      }
    },
  },
  components: { MusicDetail },
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  padding: 0.1rem;

  .left {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  .right {
    width: 25%;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
