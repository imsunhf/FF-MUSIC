<template>
  <div style="height: 100%; width: 100%">
    <slot></slot>
    <audio
      v-if="url"
      ref="audio"
      preload="auto"
      @canplay="canplay"
      @playing="playing"
      @pause="pause"
      @ended="end"
      @abort="abort"
      @error="onError"
      @timeupdate="timeupdate"
      :src="url"
    ></audio>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      index: -1,
      songReady: false,
      errorNum: 0,
    }
  },
  props: {
    playStatus: Boolean,
    playLists: {
      required: true,
      type: Array,
      default() {
        return []
      },
    },
    currentIndex: {
      required: true,
      type: Number,
      default: -1,
    },
    shuffle: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapMutations({
      setSongLoading: 'common/setSongLoading',
    }),
    // 播放控制-上一首
    prev() {
      this.cutSong('prev')
    },
    // 下一首
    next() {
      this.cutSong('next')
    },
    // 随机播放
    shufflePlay() {
      this.cutSong('shuffle')
    },
    cutSong(type) {
      if (this.playLists.length === 1) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        return
      }
      this.songReady = false
      switch(type){
        case 'next':
          this.index++
          break
        case 'prev':
          this.index--
          break
        case 'shuffle':
          this.index = this.random(this.playLists)
          break
      }
      if (this.index > this.playLists.length - 1) {
        this.index = 0
      } else if (this.index < 0) {
        this.index = this.playLists.length - 1
      }
      this.$emit('cutSong', this.playLists[this.index], this.index)
    },
    canplay() {
      this.songReady = true
      this.errorNum = 0
    },
    togglePlay() {
      if (this.index < 0) {
        return
      }
      this.emitStatus(!this.playStatus)
    },

    // 播放状态
    abort() {
      this.emitStatus(false)
      this.songReady = false
    },
    onError() {
      if (!this.url) return
      this.songReady = false
      const song = this.playLists[this.index]
      const message =
        this.errorNum > 5
          ? `已连续多次尝试，停止自动播放！`
          : `歌曲 ${song.name} 加载失败，自动播放下一首。`
      this.$notify.error({
        title: '错误',
        message,
      })
      this.errorNum <= 5 ? (this.next(), this.errorNum++) : ''
    },
    playing() {
      this.emitStatus(true)
    },
    pause() {
      this.emitStatus(false)
    },
    end() {
      // todo: 当前播放模式，是不是最后一首
      this.next()
    },
    // 播放进度
    timeupdate(e) {
      this.$emit('timeupdate', e)
    },
    random(arr) {
      return Math.floor(Math.random() * arr.length--)
    },
    ffPlayer() {
      return this.$refs.audio
    },
    checkParams() {
      return this.playLists.length > 0 && this.index >= 0
    },
    emitStatus(status) {
      this.$emit('statusChange', status)
    },
  },
  watch: {
    ready(v) {
      if (v) {
        this.ffPlayer().play()
        this.setSongLoading(false)
        return
      }
      this.ffPlayer().pause()
    },
    currentIndex(index, oldIndex) {
      if (index < 0 || this.playLists.length <= 0 || index === oldIndex) return
      this.index = index
    },
  },
  computed: {
    url() {
      if (!this.playLists.length || this.index < 0) return ''
      return this.playLists[this.index]['url']
    },
    ready() {
      return this.songReady && this.playStatus
    },
  },
}
</script>
