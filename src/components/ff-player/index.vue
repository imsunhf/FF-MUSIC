<template>
  <player
    @statusChange="handleStatusChange"
    @cutSong="handleCutSong"
    @timeupdate="timeupdate"
    :playLists="playListDetails"
    :currentIndex="currentIndex"
    :shuffle="shuffle"
    ref="ffPlayer"
  >
    <div class="ff-player_wrap">
      <!-- <ff-icon-svg class="ff-icon" name="baggage"></ff-icon-svg> -->
      <div class="ff-player__view">
        <div class="music__mes">
          <img :src="require('@/assets/logo.jpeg')" alt />
          <span>{{currentSong && currentSong.name || '欢迎体验ff-player'}}</span>
        </div>
        <div class="music__control">
          <ff-icon-svg
            data-fun="play"
            name="suijibofang2"
            @click.native.stop="shufflePlay"
            :class="{'disabled': !shuffle}"
          ></ff-icon-svg>
          <ff-icon-svg data-fun="playUp" name="qp_icon_up" @click.native.stop="prev"></ff-icon-svg>
          <ff-icon-svg data-fun="play" :name="playIcon" @click.native.stop="togglePlay"></ff-icon-svg>
          <ff-icon-svg data-fun="playNext" name="qp_icon_next-" @click.native.stop="next"></ff-icon-svg>
          <ff-icon-svg
            data-fun="play"
            name="shunxubofang2"
            @click.native.stop="sequence"
            :class="{'disabled': shuffle}"
          ></ff-icon-svg>
        </div>
        <div class="music__volume">
          <ff-icon-svg name="qp_icon_sound"></ff-icon-svg>
          <!-- <ff-progress></ff-progress> -->
        </div>
        <div class="music__progress">
          <span
            v-if="currentSongDuration"
            class="time"
          >{{currentSongTime}} / {{currentSongDuration}}</span>
          <ff-progress 
            :percent="percent" 
            @dotted-click="handleProgressClick"
            @change="handlePercentChange"></ff-progress>
        </div>
      </div>
    </div>
  </player>
</template>

<script>
import Player from "./ff-player";
import { mapState, mapMutations } from "vuex";
import { formatTime } from "@/libs/util.song.js";

export default {
  name: "ff-player",
  data() {
    return {
      shuffle: false,
      percent: 0,
      currentSongTime: "00:00"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.ffPlayer = this.$refs.ffPlayer;
    });
  },
  methods: {
    ...mapMutations({
      setPlayStatus: "common/setPlayStatus",
      setCurrentIndex: "common/setCurrentIndex"
    }),
    togglePlay() {
      this.ffPlayer.togglePlay();
    },
    prev() {
      this.ffPlayer.prev();
    },
    next() {
      this.ffPlayer.next();
    },
    shufflePlay() {
      this.shuffle = true;
    },
    sequence() {
      this.shuffle = false;
    },
    handleCutSong(song, index) {
      this.setCurrentIndex(index);
    },
    handleStatusChange(status) {
      this.setPlayStatus(status);
    },
    timeupdate() {
      const curTime = this.ffPlayer.ffPlayer().currentTime;
      const allTime = this.currentSong["duration"];
      if (!this.progressDown) {
        this.currentSongTime = formatTime(curTime);
      }
      this.percent = ((curTime * 1000) / allTime) * 100;
    },
    // 拖动进度条 更新时间
    handlePercentChange (percent) {
      // console.log(percent, this.ffPlayer.ffPlayer().currentTime ,this.currentSong["duration"], '12')
      // return
      this.dragPercent = percent
      let time = percent * this.currentSong["duration"] / 1000
      this.currentSongTime = formatTime(time);
      if (this.progressDown) return
      this.ffPlayer.ffPlayer().currentTime = time
    },
    // 拖动结束后，才更新歌曲进度
    handleProgressClick (e) {
      !this.progressDown && (this.progressDown = e)
      if(this.progressDown === e) return
      this.progressDown = e
      if (!e) {
        this.handlePercentChange(this.dragPercent)
      }
    }
  },
  computed: {
    ...mapState("common", ["playListDetails", "playStatus", "currentIndex"]),
    playIcon() {
      return this.playStatus ? "qp_icon_pause" : "qp_icon_play";
    },
    currentSongDuration() {
      const song = this.currentSong;
      return song && formatTime(song.duration / 1000);
    },
    currentSong() {
      return this.playListDetails[this.currentIndex];
    }
  },
  components: {
    Player
  }
};
</script>

<style lang="scss" scoped>
.ff-player_wrap {
  width: 100%;
  height: 100%;
  user-select: none;

  .ff-player__view {
    width: 100%;
    height: 100%;
    padding: 0 13px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    white-space: nowrap;
    overflow: hidden;
    .music__mes,
    .music__control,
    .music__volume {
      @extend %flex-center-row;
      @extend %unable-select;
    }
    .music__mes {
      width: 207px;
      img {
        width: 40px;
        height: 40px;
        vertical-align: middle;
      }
      span {
        flex: 1;
        vertical-align: middle;
        color: #fff;
        font-size: 13px;
        font-weight: 600;
        margin-left: 13px;
        @extend %text-ellipsis;
      }
    }
    .music__control {
      width: 220px;
      justify-content: space-around;
      svg {
        fill: #e6e6e6;
        &.disabled {
          fill: #9e9797;
        }
      }
    }
    .music__volume {
      width: 155px;
    }
    .music__progress {
      padding: 13px 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      margin: 0 50px;
      span.time {
        flex-basis: 100px;
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>