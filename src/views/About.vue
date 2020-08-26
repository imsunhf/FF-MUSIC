<template>
  <div class="about">
    <ul v-if="musicList" class="music-list_wrap">
      <li v-for="music in musicList.tracks" :key="music.id">
        {{music.name}}
      </li>
    </ul>
  </div>
</template>
<script>
import {getListDetails} from '@/api/song.js'
export default {
  data () {
    return {
      musicList: null
    }
  },
  async created () {
    let playListId = this.$route.query.id
    this.playListDetail = await getListDetails(playListId)
    if (this.playListDetail.code === 200) {
      this.musicList = this.playListDetail.playlist
    }
  }
}
</script>
<style lang="scss" scoped>
.about{
  .music-list_wrap{
    li{
      // display: flex;
      // flex-direction: column;
    }
  }
}
</style>