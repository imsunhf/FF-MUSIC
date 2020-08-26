<template>
  <div class="ff-progress_wrap">
    <div class="ff-progress ff-progress__outer"  ref="outer">
    </div>
    <div class="ff-progress ff-progress__inner" ref="inner">
      <div 
        @drag="handleMouseUp"
        @mousedown.stop="handleMouseDown"
        class="ff-progress__dotted" 
        ref="dotted"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data () {
    return {
      isDown: false,
      clientX: 0
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.dotted = {}
  },
  mounted() {
    this.$nextTick(() => {
      // this.dottedIcon = this.$refs.dottedIcon
      this.bindEvents()
      this.outerWidth = this.$refs.outer.getBoundingClientRect().width;
      this.inner = this.$refs.inner;
    });
  },
  methods: {
    bindEvents () {
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    },
    removeEvents () {
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseDown (e) {
      this.$emit('dotted-click', true)
      this.dotted.isDown = true
      this.dotted.left = this.inner.clientWidth
      this.dotted.clientX = e.clientX
    },
    handleMouseMove (e) {
      if (!this.dotted.isDown) return
      const finallyX = e.clientX - this.dotted.clientX
      const width = Math.min(Math.max(this.dotted.left + finallyX, 0), this.outerWidth)
      this.inner.style.width = `${width}px`
      this.calculatePercent()
    },
    handleMouseUp (e) {
      this.$emit('dotted-click', false)
      this.dotted.isDown = false

    },
    calculatePercent () {
      const percent = this.inner.clientWidth / this.outerWidth
      this.$emit('change', percent)
    },
    handleOuterClick (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapState("common", ["playStatus"]),
    progressIcon() {
      return this.percent > 60 ? "rooster" : "video-game-mario-enemy";
    },
    dottedIcon() {
      return this.playStatus ? this.progressIcon : "video-game-gamasutra";
    }
  },
  watch: {
    percent(newPercent) {
      if (this.dotted.isDown) return
      const len = this.outerWidth * 0.01 * this.percent + "px";
      this.inner.style.width = len;
    }
  },
  beforeDestroy () {
    this.removeEvents()
  }
};
</script>

<style lang="scss" scoped>
.ff-progress_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .ff-progress {
    height: 1px;
    width: 100%;
    background: #e6e6e6;
  }
  .ff-progress__outer {
    background: #e6e6e6;
    position: relative;
    cursor: pointer;
  }
  .ff-progress__inner {
    width: 0;
    background: #f00;
    position: absolute;
    left: 0;
  }
  .ff-progress__dotted {
    width: 15px;
    height: 15px;
    position: absolute;
    top: -7px;
    right: 0;
    background: #f00;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>