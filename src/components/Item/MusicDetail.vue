<template>
  <div class="musicDetail">
    <img :src="musicDetail.al.picUrl" class="musicBg" alt="" />
    <div class="top">
      <van-icon name="arrow-left" size=".5rem" @click="backHome" />
      <div class="left">
        <Vue3Marquee behavior="scroll" direction="left">{{
          musicDetail.name
        }}</Vue3Marquee>
        <span v-for="item in musicDetail.ar" :key="item">{{ item.name }}</span>
      </div>
      <van-icon name="share-o" size=".5rem" class="right" />
    </div>
    <div class="content" v-show="!isLyricShow" @click="isLyricShow = true">
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="img_needle"
        :class="{ img_needle_active: !isbtnShow }"
      />
      <img
        src="@/assets/cd.png"
        alt=""
        :class="[
          'img_cd',
          isbtnShow ? 'img_picUrl_paused' : 'img_picUrl_running',
        ]"
      />
      <img
        :src="musicDetail.al.picUrl"
        alt=""
        :class="[
          'img_picUrl',
          isbtnShow ? 'img_picUrl_paused' : 'img_picUrl_running',
        ]"
      />
    </div>
    <div
      class="musicLyric"
      ref="musicLyric"
      v-show="isLyricShow"
      @click="isLyricShow = false"
    >
      <p
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="footer">
      <div class="top">
        <van-icon name="like-o" />
        <van-icon name="down" />
        <van-icon name="music-o" />
        <van-icon name="chat-o" />
        <van-icon name="more-o" />
      </div>
      <div class="center">
        <!-- <p>{{ currentTime }}</p> -->
        <van-slider
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
          active-color="#fff"
          inactive-color="#bdc3c7"
        >
          <template #button>
            <div class="custom-button"></div>
          </template>
        </van-slider>
        <!-- <p>{{ duration }}</p> -->
      </div>
      <div class="bottom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          style="width: 0.8rem; height: 0.8rem"
          @click="play"
          v-show="isbtnShow"
        >
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          style="width: 0.8rem; height: 0.8rem"
          @click="play"
          v-show="!isbtnShow"
        >
          <use xlink:href="#icon-zanting1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gedan"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
          }
          let time = parseInt(
            min * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          );
          // console.log(min, sec, mill, lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    },
  },
  mounted() {
    // console.log(this.musicDetail);
    // console.log(this.lyricList.lyric);
    this.addDuration();
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
  methods: {
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
    backHome: function () {
      this.updateDetailShow();
      this.isLyricShow = false;
    },
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
  },
  props: ["musicDetail", "play", "isbtnShow", "addDuration"],
  components: { Vue3Marquee },
};
</script>

<style lang="less" scoped>
.musicDetail {
  width: 100%;
  height: 100%;
  position: relative;

  .musicBg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
  }

  .top {
    width: 100%;
    height: 1rem;
    display: flex;
    position: relative;
    align-items: center;
    color: white;

    .left {
      width: 3rem;
    }

    .right {
      position: absolute;
      right: 0;
    }
  }

  .content {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_needle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-25deg);
      transition: all 2s;
    }

    .img_needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }

    .img_cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
      animation: rotate_picUrl 20s linear infinite;
    }

    .img_picUrl {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.2rem;
      animation: rotate_picUrl 20s linear infinite;
    }

    .img_picUrl_running {
      animation-play-state: running;
    }

    .img_picUrl_paused {
      animation-play-state: paused;
    }

    @keyframes rotate_picUrl {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }

  .musicLyric {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
    overflow: scroll;

    p {
      color: #999;
      margin-bottom: 0.3rem;
    }

    .active {
      color: white;
      font-size: 0.4rem;
    }
  }

  .footer {
    position: absolute;
    bottom: 0.2rem;
    width: 100%;

    .top {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      font-size: 0.5rem;
    }

    .center {
      width: 100%;
      height: 0.5rem;
      display: flex;
      font-size: 0.24rem;
      align-items: center;
      padding: 0 0.2rem;

      .range {
        width: 100%;
        height: 0.04rem;
        .custom-button {
          width: 0.2rem;
          height: 0.2rem;
          background-color: white;
          border-radius: 50%;
        }
      }
    }

    .bottom {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: white;
      }
    }
  }
}
</style>
