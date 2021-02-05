<template>
  <jump
    ref="noteJump"
    @hook:mounted="childMounted"
    @toggle="handleToggle"
    @canplay="canplay"
    @end="end"
  >
    <canvas
      id="note-jump-canvas"
      ref="noteJumpCanvas"
      height="300"
      width="1300"
    ></canvas>
  </jump>
</template>

<script>
import Jump from './Jump.vue'
import { jumpHelper } from './jumpHelper'
import { drawHelper } from './noteDrawHelper'
export default {
  metaInfo() {
    return{
      title: '音符跳动',
      titleTemplate: '%s',
      htmlAttrs: {
        // lang: 'en',
        // amp: undefined
      },
    }
  },
  data() {
    return {
      waves: ['bar', 'xin', 'line', 'dashed'],
      waveIndex: 0,
      isPlay: false,
      isAnim: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.noteJumpCanvas = this.$refs.noteJumpCanvas
      this.ctx = this.noteJumpCanvas.getContext('2d')
      // console.log(ele, 'd')
    })
    window.addEventListener('resize', this.resize)
  },
  methods: {
    canplay(audio) {
      this.analyser = jumpHelper(audio)
      drawHelper(
        this.analyser,
        this.noteJumpCanvas,
        this.waves[this.waveIndex],
        this.ctx
      )
    },
    childMounted(){
      // this.resize()
    },
    end() {
      
    },
    changeSize({ width, height }) {
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
      this.waveIndex += 1
    },
    resize() {
      const radio = 2
      const wrap = this.$refs.noteJump
      const wrapSize = wrap && wrap.$el.getBoundingClientRect()
      this.noteJumpCanvas.height = 300 * radio
      this.noteJumpCanvas.width = wrapSize.width * radio
      this.ctx.scale(radio, radio)

      // this.$refs.noteJumpCanvas.getContext('2d').scale(ratio, ratio)
    },
  },
  watch: {
    waveIndex() {
      drawHelper(
        this.analyser,
        this.noteJumpCanvas,
        this.waves[this.waveIndex % 4],
        this.ctx
      )
    },
  },
  components: {
    Jump
  }
}
</script>

<style lang="scss" scoped>
  #note-jump-canvas {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    // border: 1px solid #f00;
  }
</style>