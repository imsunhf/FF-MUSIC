<template>
  <div class="note-jump" >
    <img ref="laba" class="laba" src="../../assets/img/laba.png" alt="" />
    <img
      class="music-albums"
      :class="{ playing: isPlay, anima: isAnim }"
      src="../../assets/img/music-albums.png"
      alt=""
      @click="handleToggle"
    />
    <div class="toggle">
      <img
        class="music-note"
        src="../../assets/img/music.png"
        alt=""
        @click="handleToggle"
      />
    </div>
    <slot>
      canvas
    </slot>
    <audio
      ref="audio"
      src="../../assets/mp3/花火.mp3"
      preload="auto"
      @ended="end"
      @abort="end"
      @error="end"
      @canplay="canplay"
      @playing="playing"
    ></audio>
  </div>
</template>

<script>

import { mapState } from 'vuex'
// import {down} from './down.js'
export default {
  created() {
    this.devicePixelRatio = window.devicePixelRatio
  },
  mounted() {
    this.$nextTick(() => {
      this.ele = this.$refs.laba
    })
  },
  data(){
    return {
      isPlay: false,
      isAnim: false,
    }
  },
  methods: {
    canplay() {
      this.$emit('canplay', this.$refs.audio)
    },
    end() {
      this.isPlay = false
      this.isAnim = false
      this.$emit('end')
    },
    playLB() {
      this.labaReset()
      this.size = this.ele.getBoundingClientRect()
      this.changeLabaSize(this.size)
    },
    changeLabaSize({ width, height }) {
      // 5:3
      const nextWidth = Math.max(Math.floor(this.energy / 1.3), 100)
      const nextHeight = Math.max(Math.floor(this.energy / 1.6 / 1.3), 60)
      this.ele.style.width = Math.min(nextWidth, 200) + 'px'
      this.ele.style.height = Math.min(nextHeight, 120) + 'px'
    },
    labaReset() {
      this.ele.style.width = 100 + 'px'
      this.ele.style.height = 60 + 'px'
    },
    handleToggle() {
      if (!this.isPlay) {
        this.$refs.audio.play()
        this.isAnim = true
        return
      }
      this.$emit('toggle')
    },
    playing() {
      setTimeout(() => {
        this.isPlay = true
      }, 1000)
    }
  },
  computed: {
    ...mapState('lab', ['energy'])
  },
  watch: {
    energy() {
      this.playLB()
    }
  },
}
</script>

<style lang="scss">
.note-jump {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .laba {
    position: fixed;
    top: 70px;
    left: 60px;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 60px;
  }
  .music-albums {
    position: fixed;
    right: calc(50% - 100px);
    top: calc(50% - 100px);
    // transform: translate(50%, -50%);
    width: 200px;
    height: 200px;
    transition: all 0.5s;
    z-index: 3;
    cursor: pointer;
    &.playing {
      right: 30px;
      top: 50%;
      width: 40px;
      height: 40px;
      // z-index: 0;
      // transform: unset;
    }
    &.anima {
      animation: rotate 5s linear infinite;
    }
  }
  .toggle {
    position: fixed;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 3;

    .music-note {
      position: absolute;
      bottom: -8px;
      right: -7px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
