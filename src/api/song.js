import request from '@/plugin/axios'

// 歌单-热门推荐
export function getPersonalized() {
  return request({
    url: '/personalized',
    method: 'get',
  })
}

// 获取精品歌单
export function getPlaylistHigh() {
  return request({
    url: '/top/playlist/highquality',
    method: 'get',
  })
}
// 获取歌单详情

export function getListDetails(id) {
  return request({
    url: `/playlist/detail`,
    method: 'get',
    params: {
      id,
    },
  })
}

// 获取歌单详情2
export function getListDetailsByIds(ids) {
  return request({
    url: `/song/detail`,
    method: 'get',
    params: {
      ids,
    },
  })
}

// 获取音乐 URL

export function getMusicUrl(id) {
  return request({
    url: `/song/url`,
    method: 'get',
    params: {
      id,
    },
  })
}

// 获取歌词
export function getLyric(id) {
  return request({
    url: '/lyric',
    method: 'get',
    params: {
      id,
    },
  })
}

// 轮播图
export function getBanner() {
  return request({
    url: '/banner',
    method: 'get',
  })
}

// 搜索
export function getSearchSuggest(keywords) {
  return request({
    url: '/search/suggest',
    method: 'get',
    params: {
      keywords,
    },
  })
}
