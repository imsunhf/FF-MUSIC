<template>
  <div class="search">
    <el-drawer
      title="我是标题"
      custom-class="search-list-drawer"
      :modal="false"
      :modal-append-to-body="false"
      :with-header="false"
      :visible.sync="visible"
      @close="handleClosed"
    >
      <ul class="search-list">
        <p flex="dir:left main:left cross:center">
          <ff-icon-svg name="qp_icon_music_on"></ff-icon-svg>
          <span>单曲</span>
        </p>
        <li v-for="song in songList" :key="song.id" @click="handleClick(song)">
          {{ song.name }} - {{ song.singer }}
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import { formatSongList } from '@/utils/util.song.js'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      visible: false,
      songList: [],
    }
  },
  props: {
    searchResult: Object,
  },
  methods: {
    ...mapActions({
      cutSongFromHistory: 'common/cutSongFromHistory',
    }),
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    handleClosed() {
      this.$emit('closed')
    },
    // 点击搜索处理逻辑和历史记录是一样的
    handleClick(song) {
      this.cutSongFromHistory(song)
      this.hide()
    },
  },
  computed: {},
  watch: {
    searchResult: {
      handler() {
        this.songList = formatSongList(
          (this.searchResult && this.searchResult.songs) || []
        )
        console.log(this.songList)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  .el-drawer__wrapper {
    z-index: 100000;
  }
  ::v-deep.search-list-drawer {
    top: 50px;
    bottom: 60px;
    background: #363636;
    .el-drawer__body {
      color: #fff;
      overflow: hidden;
    }
  }
  .search-list {
    padding: 10px;
    box-sizing: border-box;
    line-height: 25px;
    p {
      font-size: 13px;
    }
    li {
      cursor: pointer;
      font-size: 12px;
      padding: 5px;
      color: #ddd;
      @extend %text-ellipsis;
      &:hover {
        background: #333;
      }
    }
  }
}
</style>
