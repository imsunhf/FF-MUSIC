<template>
  <f-details
    :info="playlist"
    :list="playlistByIds"
    :listLoading="listLoading"
  ></f-details>
</template>

<script>
import FDetails from './Details'
import { getListDetails, getListDetailsByIds } from '@/api/song'
import { formatSongList } from '@/utils/util.song.js'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      playlist: {},
      playlistByIds: [],
      listLoading: false,
    }
  },
  created() {
    this.id = this.$route.params.id
    if (!this.id) {
      this.$router.replace({
        name: 'playList',
      })
      return
    }
    this._getListDetails(this.id)
  },
  methods: {
    ...mapMutations({
      setPlayListDetails: 'common/setPlayListDetails',
      setCurrentIndex: 'common/setCurrentIndex',
    }),
    async _getListDetails(id) {
      this.listLoading = true
      const value = await getListDetails(id)
      if (!value || value.code !== 200) {
        return
      }
      this._getListDetailsByIds(value.playlist.trackIds)
      this.playlist = value.playlist
    },
    async _getListDetailsByIds(ids) {
      const _ids = ids.map((item) => item.id).join()
      const v = await getListDetailsByIds(_ids).finally(() => {
        this.listLoading = false
      })
      this.playlistByIds = formatSongList(v.songs)
    },
  },
  components: {
    FDetails,
  },
}
</script>
