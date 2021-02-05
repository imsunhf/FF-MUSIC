<template>
  <div class="playlist-details">
    <div class="header">
      <img class="cover" v-lazy="info.coverImgUrl" alt="" />
      <div class="details">
        <span class="title">{{ info.name }}</span>
        <span class="author">{{ info.creator && info.creator.nickname }}</span>
        <!-- <el-button>播放</el-button> -->
        <span>标签:{{ info.tags && info.tags.join('/') }}</span>
        <span>简介:{{ info.description }}</span>
      </div>
    </div>
    <div class="list-content">
      <ff-loading v-if="listLoading" />
      <ul v-else>
        <li
          v-for="(song, index) in list"
          @click="play(index)"
          @mouseenter="handleMouseOver"
          :key="song.id"
          :class="{ active: currentSong && currentSong.id === song.id }"
        >
          <span class="index">{{ _pad(index + 1) }}</span>
          <span class="name">{{ song.name }}</span>
          <span class="singer">{{ song.singer }}</span>
          <!-- <span class="">{{ song.album }}</span> -->
          <span class="duration">{{ formatTime(song.duration / 1000) }}</span>
        </li>
        <el-backtop target=".content" :bottom="80"></el-backtop>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatTime, _pad } from '@/utils/util.song.js'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      audio: null,
    }
  },
  props: {
    info: Object,
    list: Array,
    listLoading: Boolean,
  },
  created() {
    this.formatTime = formatTime
    this._pad = _pad
  },
  mounted() {
    this.audio = new Audio(require('../assets/mp3/13386.mp3'))
    this.audio.playbackRate = 5
  },
  methods: {
    ...mapMutations({
      setPlayListDetails: 'common/setPlayListDetails',
      setCurrentIndex: 'common/setCurrentIndex',
    }),
    play(index) {
      if (
        this.currentIndex > -1 &&
        this.list[index]['id'] === this.playListDetails[this.currentIndex]['id']
      )
        return
      this.setPlayListDetails(this.list)
      this.setCurrentIndex(index)
    },
    handleMouseOver() {
      this.audio.play()
    },
  },
  computed: {
    ...mapState('common', ['playListDetails', 'currentIndex']),
    currentSong() {
      return this.playListDetails[this.currentIndex]
    },
  },
}
</script>

<style lang="scss" scoped>
.playlist-details {
  padding-bottom: 60px;
  overflow-y: auto;
  .header {
    padding: 30px;

    display: flex;
    flex-direction: row;
    .cover {
      flex-basis: 200px;
      flex-shrink: 0;
      height: 200px;
      border-radius: 10px;
    }
    .details {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      color: #fff;
      margin-left: 30px;
      span {
        margin-top: 15px;
      }
      .title {
        font-size: 25px;
      }
      .author {
        font-size: 14px;
        color: #ff0;
      }
    }
  }
  .list-content {
    padding: 30px;
    li {
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      color: #fff;
      font-size: 18px;
      line-height: 32 px;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 1px;
      cursor: pointer;
      &.active {
        background: #505050;
      }
      &:hover {
        background: #505050;
        // color: #f00;
      }
      .index {
        flex-basis: 100px;
      }
      .name {
        flex-basis: 30%;
        @extend %text-ellipsis;
      }
      .singer {
        flex-basis: 50%;
        @extend %text-ellipsis;
      }
      .duration {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>
