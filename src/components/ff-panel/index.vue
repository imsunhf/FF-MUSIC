<template>
  <div class="ff-panel_wrap">
    <div flex="main:center cross:center" class="song-info">
      <div class="left">
        <div class="cover" :class="{ isanima: playStatus }">
          <img :src="currentSong.cover" alt="" />
        </div>
        <!-- <img src="@/assets/img/singlecover.png" alt=""> -->
      </div>
      <div flex="dir:top" class="right">
        <span class="song_name">{{ currentSong.name }}</span>
        <div class="singer">
          <span class="label">歌手: </span>
          <span class="song_singer">{{ currentSong.singer }}</span>
        </div>
        <empty v-if="nolyric" />
        <!-- <ff-loading v-else-if="lyricLoading" /> -->
        <div class="lyric" ref="scroller" v-else>
          <div class="lyric_wrap">
            <p ref="first"></p>
            <p
              v-for="(line, index) in lyric"
              ref="lyric"
              :key="index"
              :class="[index === currentLine ? 'active-lyric' : '']"
            >
              {{ line.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getLyric } from '@/api'
// import Lyric from 'lyric-parser'
import lyricParser from '@/utils/util.lyric'
import BScroll from '@better-scroll/core'
import Empty from './empty'
export default {
  metaInfo() {
    return {
      title: this.metaTitle,
      titleTemplate: '%s | FF MUSIC',
      htmlAttrs: {
        // lang: 'en',
        // amp: undefined
      },
    }
  },
  data() {
    return {
      lyric: [],
      tlyric: null,
      lineNum: 0,
      bs: null,
      nolyric: false,
      lyricLoading: false,
      cc: 'cc',
    }
  },
  computed: {
    ...mapState('common', [
      'playListDetails',
      'isShowPanel',
      'currentIndex',
      'playStatus',
      'currentTime',
    ]),
    currentSong() {
      if (!this.playListDetails.length || this.currentIndex < 0) return {}
      return this.playListDetails[this.currentIndex]
    },
    currentLine() {
      const nextLyricIndex =
        this.lyric && this.lyric.findIndex((l) => this.currentTime < l.time)
      if (nextLyricIndex < 0) {
        return this.lyric.length - 1
      }
      return Math.max(nextLyricIndex - 1, 0)
    },
    metaTitle() {
      return (
        (this.lyric[this.currentLine] &&
          this.lyric[this.currentLine]['content']) ||
        '嘿哈'
      )
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initBs()
      this.bs.refresh()
    })
  },
  methods: {
    ...mapMutations({
      setPlayStatus: 'common/setPlayStatus',
    }),
    initBs() {
      this.bs = new BScroll('.lyric', {
        scrollY: true,
      })
    },
  },
  watch: {
    currentSong: {
      handler(v) {
        if (!v.id) return
        this.lyric = []
        this.lyricLoading = true
        getLyric(v.id)
          .then((res) => {
            this.nolyric = !res.lrc || !res.lrc.lyric
            if (this.nolyric) return
            const { lyric, tlyric } = lyricParser(res)
            this.lyric = lyric
            this.tlyric = tlyric
            this.bs.scrollToElement(this.$refs.first, 250, 0, true)
            setTimeout(() => {
              this.bs && this.bs.refresh()
            }, 500)
          })
          .finally(() => {
            this.lyricLoading = false
            this.setPlayStatus(true)
          })
      },
      deep: true,
      immediate: true,
    },
    playStatus(v) {
      if (v) {
        // this.lyric && this.lyric.play()
      }
    },
    currentLine: {
      handler(v) {
        if (!v || v < 0) return
        this.bs &&
          this.$refs.lyric[v] &&
          this.bs.scrollToElement(this.$refs.lyric[v], 250, 0, true)
      },
      deep: true,
    },
  },
  components: {
    Empty,
  },
}
</script>

<style lang="scss" scoped>
.ff-panel_wrap {
  @extend %full;
  // border: 1px solid #fbfbfb;
  background: #2b2b2b;
  // opacity: 0.9;
  .song-info {
    height: 500px;
    // border: 1px solid #f00;
    overflow: auto;
    .left {
      width: 206px;
      margin-top: 160px;
      .cover {
        width: 206px;
        height: 206px;
        background: left top / 100% 100% no-repeat
          url('../../assets/img/singlecover.png');
        padding: 35px;
        &.isanima {
          animation: rotate 15s linear infinite;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .right {
      width: 450px;
      height: 100%;
      padding-top: 100px;
      margin-left: 80px;
      overflow: hidden;
      color: #8b8b8b;
      .song_name {
        font-size: 24px;
      }
      .singer {
        margin: 12px 0;
        font-size: 12px;
        .song_singer {
          color: #d8cfcf;
        }
      }
      .lyric {
        height: 400px;
        padding: 10px 0;
        overflow: hidden;
        .lyric_wrap {
        }
        font {
          size: 20px;
        }
        .active-lyric {
          color: #fff;
          font-weight: bold;
          // font-size: 18px;
        }
      }
    }
  }
}
</style>
