<template>
  <div class="ff-panel_wrap" v-if="currentSong">
    <div flex="main:center cross:center" class="song-info">
      <div class="left">
        <div class="cover">
          <img :src="currentSong.cover" alt="">
        </div>
        <!-- <img src="@/assets/img/singlecover.png" alt=""> -->
      </div>
      <div flex="dir:top" class="right">
        <span class="singer_name">{{currentSong.name}}</span>
        <div class="singer">
          <span class="">歌手</span>
          <span class="singer_name">{{currentSong.singer}}</span>
        </div>
        <div class="lyric" ref="scroller">
          <p 
            v-for='(line, index) in lyric.lines' 
            :key="line.time + line.txt"
            :class="[index===lineNum ? 'light-lyric': '', index + 1===lineNum ? 'preview-light-lyric': '']"
            
            >{{line.txt}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getLyric} from '@/api'
import {rectSize} from '@/libs/utils/dom'
import Lyric from 'lyric-parser'
export default {
  data(){
    return {
      lyric: null,
      lineNum: 0
    }
  },
  computed: {
    ...mapState('common', ['playListDetails', 'currentIndex', 'playStatus']),
    currentSong() {
      return this.playListDetails[this.currentIndex];
    }
  },
  methods: {
    handler({lineNum, txt}) {
      console.log(lineNum, txt)
      this.lineNum = lineNum
      this.scrollToPreview()
    },
    scrollToPreview(){
      const cur = document.querySelector('.light-lyric')
      if (!cur) return
      const centerPosition = this.getScrollerCenter()
      // 得到 当前高亮歌词位于中间时应该滚动的距离
      const distance = cur.offsetTop - centerPosition
      const scroller = this.$refs.scroller
      scroller.scrollTop = distance
    },
    getScrollerCenter(){
      const domSize = this.domSize || (this.domSize = rectSize(this.$refs.scroller))
      const {height} = domSize
      return height / 2
    }
  },
  watch: {
    currentSong: {
      handler(v){
        if (!v) return
        getLyric(v.id).then(res => {
          this.lyric = new Lyric(res.lrc.lyric, this.handler)
        })
      },
      deep: true,
      immediate: true
    },
    playStatus(v){
      if (v){
        this.lyric && this.lyric.play()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ff-panel_wrap {
  @extend %full;
  border: 1px solid #fbfbfb;
  background: #c3c3c3;
  opacity:0.9;
  .song-info{
    height: 400px;
    border: 1px solid #f00;
    overflow: auto;
    .left{
      width: 206px;
      .cover{
        width: 206px;
        height: 205px;
        background: left top / 100% 100% no-repeat url('../../assets/img/singlecover.png');
        padding: 35px;
        animation: rotate 5s linear infinite;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .right{
      width: 450px;
      height: 100%;
      margin-left: 100px;
      .singer{

      }
      .lyric{
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        font{
          size: 20px;
        }
        .light-lyric{
          color: #f00;
        }
      }
    }
  }
}
</style>
