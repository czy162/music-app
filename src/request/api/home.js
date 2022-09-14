import service from "..";
//获取首页轮播图数据
export function getBanner() {
  return service({
    method: "GET",
    url: "/banner?type=2",
  });
}
//推荐歌单
export function getMusicList() {
  return service({
    method: "GET",
    url: "/personalized?limit=5",
  });
}
//推荐新音乐
export function getNewSong() {
  return service({
    method: "GET",
    url: "/personalized/newsong",
  });
}
//搜索
export function getSearchMusic(keywords) {
  return service({
    method: "GET",
    url: `/cloudsearch?keywords=${keywords}`,
  });
}
//邮箱登录
export function getEmailLogin(data) {
  return service({
    method: "GET",
    url: `/login?email=${data.email}&password=${data.password}`,
  });
}
//获取用户详情
export function getUserInfo(uid) {
  return service({
    method: "GET",
    url: `/user/detail?uid=${uid}`,
  });
}
