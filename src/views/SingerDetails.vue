<template>
  <f-details
    :info="artist"
    :list="songs"
    :listLoading="listLoading"
  ></f-details>
</template>

<script>
import FDetails from './Details'
import { getTopSong, getArtistDetail } from '@/api/singer'
import { formatSongList, formatArtist } from '@/utils/util.song.js'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      artist: {},
      songs: [],
      listLoading: false,
    }
  },
  created() {
    this.id = this.$route.params.id
    if (!this.id) {
      this.$router.replace({
        name: 'singer',
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
      const [song, artist] = await Promise.all([
        getTopSong(id),
        getArtistDetail(id),
      ])
      this.listLoading = false

      this.songs = formatSongList(song.songs)
      this.artist = formatArtist(artist.data)
      // console.log(this.songs, 'songs')
      // this.artist = artist.data
    },
  },
  components: {
    FDetails,
  },
}
</script>
