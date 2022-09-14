<template>
    <div class="itemMusiclist">
        <div class="musicListTop">
            <div class="left">
                <van-icon name="play-circle-o" size="20" />
                <span>播放全部</span>
                <span>(共{{ itemList.length }}首)</span>
            </div>
            <div class="right">
                <van-button round type="success" color="red" style="height: 40px;">+收藏({{ subscribedCount }})
                </van-button>
            </div>

        </div>
        <div class="musicListContent" v-for="(item, i) in itemList" :key="i">
            <div class="left">
                {{ i + 1 }}
            </div>
            <div class="center" @click="playMusic(i)">
                <p style="font-size: 17px;">{{ item.name }}</p>
                <span v-for="(item1, index) in item.ar" :key="index" style="color: gray;">{{ item1.name}}&nbsp;&nbsp;</span>
                <!-- <span class="alname">{{ " - " + item.al.name }}</span> -->
            </div>
            <div class="right">
                <van-icon v-show="item.mv != 0" name="video-o" class="mv" />
                <van-icon name="ellipsis" class="mv2" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    setup(props) {
        // console.log(props);
    },
    props: ['itemList', 'subscribedCount'],
    methods: {
        playMusic: function (i) {
            this.updatePlayList(this.itemList)
            this.updatePlayListIndex(i)
        },
        ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
    },

}

</script>

<style lang="less" scoped>
.itemMusiclist {
    width: 100%;
    border-radius: .4rem .4rem 0 0;
    background-color: white;
    padding-bottom: 1.22rem;

    .musicListTop {
        width: 100%;
        height: 1rem;
        margin-top: .5rem;
        display: flex;
        justify-content: space-between;

        .left {
            width: 45%;
            display: flex;
            padding: .25rem;
            justify-content: space-between;
        }

        .right {
            height: .8rem;
            color: white;
            padding: 5px 5px 0 0;
        }
    }

    .musicListContent {
        width: 100%;
        height: 1rem;
        display: flex;

        .left {
            width: 10%;
            line-height: 1rem;
            padding-left: .2rem;
        }

        .center {
            width: 60%;

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
                font-size: .5rem;
                line-height: 1rem;
            }

            .mv2 {
                position: absolute;
                right: 0;
            }
        }
    }
}
</style>