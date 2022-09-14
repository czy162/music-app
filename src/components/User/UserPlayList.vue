<template>
  <div class="userPlayList">
    <div class="top">
      <p>歌单</p>
      <div class="new">新建歌单</div>
    </div>
    <div class="center">
      <div class="content">
        <img
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          alt=""
        />
        <div class="name">
          <p>歌单名</p>
          <p style="font-size: 12px; color: #bdc3c7">共0首歌</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.userPlayList {
  width: 95%;
  height: 5rem;
  border-radius: 10px;
  padding: 0.2rem;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 0.2rem;
  .top {
    width: 100%;
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    .new {
      height: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.4rem;
      line-height: 0.5rem;
      padding: 0 0.2rem;
    }
  }
  .center {
    width: 100%;
    .content {
      width: 100%;
      display: flex;
      img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
      }
      .name {
        padding-left: 0.2rem;
        line-height: 0.5rem;
      }
    }
  }
}
</style>
