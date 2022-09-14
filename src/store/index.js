import { createStore } from "vuex";
import { getMusicLyric } from "@/request/api/item";
import { getEmailLogin } from "@/request/api/home";

export default createStore({
  state: {
    //默认值
    playList: [
      {
        //专辑
        al: {
          id: 137142551,
          name: "孤勇者",
          pic: 109951166702962260,
          picUrl:
            "https://p1.music.126.net/aG5zqxkBRfLiV7A8W0iwgA==/109951166702962263.jpg",
          pic_str: "109951166702962263",
        },
        //艺术家
        ar: [
          {
            name: "陈奕迅",
          },
        ],
        name: "孤勇者",
        id: 1901371647,
      },
    ],
    playListIndex: 0, // 默认下标为0
    isbtnShow: true, // 播放暂停的切换
    detailShow: false, //歌曲详情页的显示隐藏
    lyricList: {}, //歌词
    currentTime: 0, //当前时间
    duration: 0, //歌曲总时长
    isLogin: false, //判断是否登录
    isFooterMusic: true, //判断底部组件是否显示
    token: "",
    user: {}, //用户信息
  },
  getters: {},
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value;
    },
    pushPlayList: function (state, value) {
      state.playList.push(value);
    },
    updatePlayList: function (state, value) {
      state.playList = value;
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList: function (state, value) {
      state.lyricList = value;
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
    },
    updateDuration: function (state, value) {
      state.duration = value;
    },
    updateIsLogin: function (state, value) {
      state.isLogin = true;
      console.log("登录成功");
    },
    updateToken: function (state, value) {
      state.token = value;
      localStorage.setItem("token", state.token);
    },
    updateUser: function (state, value) {
      state.user = value;
    },
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value);
      // console.log(res);
      context.commit("updateLyricList", res.data.lrc);
    },
    getLogin: async function (context, value) {
      let res = await getEmailLogin(value);
      // console.log(res);
      return res;
    },
  },
  modules: {},
});
