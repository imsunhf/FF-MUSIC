import { getBanner } from '@/api/song'
import {cloneDeep} from 'lodash'
export default {
  namespaced: true,
  state: {
    playStatus: false, // 播放状态
    playListDetails: [], // 播放列表
    currentIndex: -1, // 当前歌曲索引
    isShowPanel: false, // 歌词面板
    currentTime: 0, // 音乐当前进度
    songLoading: false, // loading,
    banner: [],
    historyList: [],
  },
  mutations: {
    setSongLoading(state, songLoading) {
      state.songLoading = songLoading
    },
    setCurrentTime(state, currentTime) {
      state.currentTime = currentTime
    },
    setPlayStatus(state, playStatus) {
      state.playStatus = playStatus
    },
    setPlayListDetails(state, playListDetails) {
      state.playListDetails = playListDetails
    },
    setCurrentIndex(state, currentIndex) {
      state.currentIndex = currentIndex
      state.songLoading = true
      const cur = state.playListDetails[currentIndex]
      const index = state.historyList.findIndex((item) => item.id === cur.id)
      if (index >= 0) {
        const song = state.historyList.splice(index, 1)
        state.historyList.unshift(cloneDeep(song[0]))
        return
      }
      state.historyList.unshift(cloneDeep(cur))
    },
    setIsShowPanel(state, isShowPanel) {
      state.isShowPanel = isShowPanel
    },
    setBanner(state, banner) {
      state.banner = banner
    },
    setHistory(state, his) {
      state.historyList.unshift(his)
    },
  },
  actions: {
    async getBanner({ commit }) {
      const v = await getBanner().catch((e) => {
        reject(e)
      })
      commit('setBanner', v.banners)
    },
    // 播放列表 切歌
    cutSongFromPlayList({ state, commit }, song) {
      const id = song.id
      const index = state.playListDetails.findIndex((item) => item.id === id)
      commit('setCurrentIndex', index)
    },
    // 历史记录 切歌
    cutSongFromHistory({ state, commit }, song) {
      const id = song.id
      const index = state.playListDetails.findIndex(
        (item) => item.id === id
      )
      const newList = cloneDeep(state.playListDetails)
      const currentIndex = state.currentIndex
      // 如果未播放则播放，正在播放则不用管，todo
      if (index === currentIndex && index >= 0) return
      newList.splice(index, 1)
      if (index > currentIndex || index < 0) {
        newList.splice(currentIndex + 1, 0, cloneDeep(song))
        setTimeout(() => {
          commit('setCurrentIndex', currentIndex + 1)
        })
      } else {
        newList.splice(currentIndex, 0, cloneDeep(song))
        setTimeout(() => {
          commit('setCurrentIndex', currentIndex)
        })
      }
      commit('setPlayListDetails', newList)
    },
  },
}
