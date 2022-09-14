<template>
    <div class="itemMusicTop">
        <img :src="playList.coverImgUrl" alt="" class="bgimg">
        <div class="itemLeft">
            <van-icon name="arrow-left" size=".5rem" @click="$router.go(-1)" />
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <van-icon name="search" size=".5rem" />
            <van-icon name="ellipsis" size=".5rem" />
        </div>
    </div>
    <div class="itemContent">
        <div class="contentLeft">
            <img :src="playList.coverImgUrl" alt="" class="coverimg">
        </div>
        <div class="contentRight">
            <p>{{ playList.name }}</p>
            <div class="center">
                <img :src="playList.creator.backgroundUrl" alt="">
                <p>{{ playList.creator.nickname }}</p>
            </div>

            <p class="van-ellipsis" style="width:4.8rem;">{{ playList.description }}</p>
        </div>
    </div>
    <div class="itemTopFooter">
        <div class="itemfoot">
            <van-icon name="chat-o" />
            <p>40</p>
        </div>
        <div class="itemfoot">
            <van-icon name="share-o" />
            <p>40</p>
        </div>
        <div class="itemfoot">
            <van-icon name="down" />
            <p>下载</p>
        </div>
        <div class="itemfoot">
            <van-icon name="passed" />
            <p>分享</p>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        // console.log(props);
        //判断，如果props没有就拿sessionStorage里面的
        if ((props.playList.creator = '')) {
            props.playList.creator = JSON.parse(sessionStorage.getItem().playList).creator
        }
    },
    props: ['playList']
}
</script>

<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .bgimg {
        width: 100%;
        height: 8rem;
        position: fixed;
        z-index: -1;
        filter: blur(.6rem);
    }

    .itemLeft,
    .itemRight {
        width: 25%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        padding: .2rem;

        span {
            font-size: .38rem;
        }
    }
}

.itemContent {
    width: 100%;
    display: flex;
    padding: .2rem;

    .contentLeft {
        img {
            width: 2.3rem;
            height: 2.3rem;
            border-radius: .2rem;
        }
    }

    .contentRight {
        padding-left: .2rem;

        .center {
            display: flex;
            padding: .2rem 0;

            img {
                width: .7rem;
                height: .7rem;
                border-radius: 50%;
            }

            p {
                line-height: .7rem;
                padding-left: .2rem;
            }
        }
    }
}

.itemTopFooter {
    width: 100%;
    display: flex;
    justify-content: space-around;
    text-align: center;
    color: white;

    .van-icon {
        font-size: .6rem;
    }

}
</style>