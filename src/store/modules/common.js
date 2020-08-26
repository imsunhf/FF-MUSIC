export default {
  namespaced: true,
  state: {
    playStatus: false, // 播放状态
    playListDetails: [], // 播放列表
    currentIndex: -1 // 当前歌曲索引
  },
  mutations: {
    setPlayStatus(state, playStatus) {
      state.playStatus = playStatus
    },
    setPlayListDetails(state, playListDetails) {
      state.playListDetails = playListDetails
    },
    setCurrentIndex(state, currentIndex) {
      state.currentIndex = currentIndex
    }
  },
  actions: {}
}
