<template>
  <div style="height: 100%;width: 100%;">
    <slot></slot>
    <audio
      ref="audio"
      @canplay="canplay"
      @playing="playing"
      @pause="pause"
      @ended="end"
      @abort="abort"
      @timeupdate="timeupdate"
      :src="url"
    ></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: "",
      playStatus: false,
      url: ""
    };
  },
  props: {
    playLists: {
      required: true,
      type: Array,
      default() {
        return [];
      }
    },
    currentIndex: {
      required: true,
      type: Number,
      default: -1
    },
    shuffle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 播放控制
    prev() {
      if (this.shuffle) {
        this.shufflePlay();
        return;
      }
      this.index--;
      if (this.index < 0) {
        this.index = this.playLists.length - 1;
      }
      this.$emit("cutSong", this.playLists[this.index], this.index);
    },
    next() {
      if (this.shuffle) {
        this.shufflePlay();
        return;
      }
      this.index++;
      if (this.index > this.playLists.length - 1) {
        this.index = 0;
      }
      this.$emit("cutSong", this.playLists[this.index], this.index);
    },
    shufflePlay() {
      this.index = this.random(this.playLists);
      this.$emit("cutSong", this.playLists[this.index], this.index);
    },
    canplay() {
      this.$refs.audio.play();
    },
    togglePlay() {
      if (this.index < 0) {
        return;
      }
      this.playStatus = !this.playStatus;
    },

    // 播放状态
    abort() {
      this.playStatus = false;
    },
    playing() {
      this.playStatus = true;
    },
    pause() {
      this.playStatus = false;
    },
    end() {
      this.next();
    },
    // 播放进度
    timeupdate(e) {
      this.$emit("timeupdate", e);
    },
    random(arr) {
      return Math.floor(Math.random() * arr.length--);
    },
    ffPlayer() {
      return this.$refs.audio;
    }
  },
  watch: {
    playStatus(status) {
      const audio = this.$refs.audio;
      status ? audio.play() : audio.pause();
      this.$emit("statusChange", status);
    },
    currentIndex(index, oldIndex) {
      if (index < 0 || this.playLists.length <= 0 || index === oldIndex) return;
      this.index = index;
    },
    index(index) {
      if (index < 0) return;
      this.url = this.playLists[index]["url"];
    },
    playLists: {
      handler() {
        this.url = this.playLists[this.index]["url"];
      },
      deep: true
    }
  }
};
</script>