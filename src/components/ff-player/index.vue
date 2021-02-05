<template>
  <player
    @statusChange="handleStatusChange"
    @cutSong="handleCutSong"
    @timeupdate="timeupdate"
    :playLists="playListDetails"
    :currentIndex="currentIndex"
    :shuffle="shuffle"
    :playStatus="playStatus"
    ref="ffPlayer"
  >
    <div class="ff-player_wrap">
      <!-- <ff-icon-svg class="ff-icon" name="baggage"></ff-icon-svg> -->
      <div class="ff-player__view">
        <div class="music__mes" @click.stop="togglePanel">
          <ff-img-loading v-show="playStatus" class="player_img" />
          <img :src="require('@/assets/logo.jpeg')" alt />
          <span>{{
            (currentSong && currentSong.name) || 'ff-music 已就绪'
          }}</span>
        </div>
        <div class="music__control">
          <ff-icon-svg
            data-fun="play"
            name="suijibofang2"
            @click.native.stop="shufflePlay"
            :class="{ disabled: !shuffle }"
          ></ff-icon-svg>
          <ff-icon-svg
            data-fun="playUp"
            name="qp_icon_up"
            @click.native.stop="prev"
          ></ff-icon-svg>
          <ff-icon-svg
            data-fun="play"
            :name="playIcon"
            @click.native.stop="togglePlay"
          ></ff-icon-svg>
          <ff-icon-svg
            data-fun="playNext"
            name="qp_icon_next-"
            @click.native.stop="next"
          ></ff-icon-svg>
          <ff-icon-svg
            data-fun="play"
            name="shunxubofang2"
            @click.native.stop="sequence"
            :class="{ disabled: shuffle }"
          ></ff-icon-svg>
          <ff-icon-svg
            data-fun="play"
            name="qp_icon_more"
            @click.native.stop="drawer = true"
            :class="{ disabled: shuffle }"
          ></ff-icon-svg>
        </div>
        <div class="music__volume">
          <ff-icon-svg
            :name="muted ? 'qp_icon_sound_off' : 'qp_icon_sound'"
            @click.native="muted = !muted"
          ></ff-icon-svg>
          <!-- <ff-progress></ff-progress> -->
        </div>
        <div class="music__progress">
          <span v-if="currentSongDuration" class="time"
            >{{ currentSongTime }} / {{ currentSongDuration }}</span
          >
          <ff-progress
            :percent="percent"
            @dotted-click="handleProgressClick"
            @change="handlePercentChange"
          ></ff-progress>
        </div>
      </div>
      <div v-if="!playListDetails.length" class="mask"></div>
      <!-- 播放列表 -->
      <el-drawer
        title=""
        custom-class="play-list-drawer"
        :visible.sync="drawer"
        :modal="false"
        :modal-append-to-body="true"
        :with-header="false"
        direction="rtl"
      >
        <el-tabs
          class="play-list_tabs"
          v-model="activeName"
          @tab-click="toggleList"
        >
          <el-tab-pane label="播放列表" name="playList">
            <play-details
              :playListDetails="playListDetails"
              :songId="songId"
              @click="handleListClick"
            />
          </el-tab-pane>
          <el-tab-pane label="历史记录" name="playHistory">
            <play-details
              :playListDetails="historyList"
              :songId="songId"
              @click="handleHisClick"
            />
          </el-tab-pane>
        </el-tabs>
      </el-drawer>
    </div>
  </player>
</template>

<script>
import Player from './ff-player'
import { mapState, mapMutations, mapActions } from 'vuex'
import { formatTime } from '@/utils/util.song.js'
import { down } from '@/api/down'
import Details from './details'
import { cloneDeep } from 'lodash'
export default {
  name: 'ff-player',
  data() {
    return {
      shuffle: false,
      percent: 0,
      currentSongTime: '00:00',
      url: '',
      muted: false,
      drawer: false,
      activeName: 'playList',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.ffPlayer = this.$refs.ffPlayer
    })
  },
  methods: {
    ...mapMutations({
      setPlayListDetails: 'common/setPlayListDetails',
      setPlayStatus: 'common/setPlayStatus',
      setCurrentIndex: 'common/setCurrentIndex',
      setIsShowPanel: 'common/setIsShowPanel',
      setCurrentTime: 'common/setCurrentTime',
    }),
    ...mapActions({
      cutSongFromPlayList: 'common/cutSongFromPlayList',
      cutSongFromHistory: 'common/cutSongFromHistory',
    }),
    togglePlay() {
      this.ffPlayer.togglePlay()
    },
    togglePanel() {
      this.setIsShowPanel(!this.isShowPanel)
    },
    prev() {
      this.ffPlayer.prev()
    },
    next() {
      this.ffPlayer.next()
    },
    shufflePlay() {
      this.shuffle = true
    },
    sequence() {
      this.shuffle = false
    },
    handleCutSong(song, index) {
      this.setCurrentIndex(index)
    },
    handleStatusChange(status) {
      this.setPlayStatus(status)
    },
    timeupdate() {
      const curTime = this.ffPlayer.ffPlayer().currentTime
      const allTime = this.currentSong['duration']
      if (!this.progressDown) {
        this.currentSongTime = formatTime(curTime)
      }
      this.percent = ((curTime * 1000) / allTime) * 100
      this.setCurrentTime(curTime)
    },
    // 拖动进度条 更新时间
    handlePercentChange(percent) {
      this.dragPercent = percent
      let time = (percent * this.currentSong['duration']) / 1000
      this.currentSongTime = formatTime(time)
      if (this.progressDown) return
      this.ffPlayer.ffPlayer().currentTime = time
    },
    // 拖动结束后，才更新歌曲进度
    handleProgressClick(e) {
      !this.progressDown && (this.progressDown = e)
      if (this.progressDown === e) return
      this.progressDown = e
      if (!e) {
        this.handlePercentChange(this.dragPercent)
      }
    },
    // 切换播放列表，历史记录
    toggleList() {},
    // 播放列表切歌
    handleListClick(item) {
      // const id = item.id
      // const index = this.playListDetails.findIndex(song => song.id === item.id)
      // this.setCurrentIndex(index)
      this.cutSongFromPlayList(item)
    },
    // 历史列表切歌
    handleHisClick(item) {
      this.cutSongFromHistory(item)
    },
  },
  computed: {
    ...mapState('common', [
      'playListDetails',
      'playStatus',
      'currentIndex',
      'isShowPanel',
      'historyList',
    ]),
    playIcon() {
      return this.playStatus ? 'qp_icon_pause' : 'qp_icon_play'
    },
    currentSongDuration() {
      const song = this.currentSong
      return song && formatTime(song.duration / 1000)
    },
    currentSong() {
      return this.playListDetails[this.currentIndex]
    },
    songId() {
      return (this.currentSong && this.currentSong['id']) || ''
    },
  },
  components: {
    Player,
    PlayDetails: Details,
  },
  watch: {
    muted: {
      handler(v) {
        this.ffPlayer.ffPlayer().muted = v
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.ff-player_wrap {
  width: 100%;
  height: 100%;
  user-select: none;
  position: relative;
  background: #252525;
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }
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
      position: relative;
      width: 207px;
      .player_img {
        position: absolute;
        left: 0;
      }
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
  ::v-deep.play-list-drawer {
    background: #363636;
    top: 50px;
    padding-bottom: 60px;
    overflow: hidden;
    .el-drawer__body {
      overflow: hidden;
    }
    .play-list_tabs {
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .el-tabs__item {
        color: #b0abab;
        &.is-active {
          color: #fff;
        }
      }
      .el-tabs__content {
        flex: 1;
        overflow: auto;
      }
    }
  }
}
</style>
