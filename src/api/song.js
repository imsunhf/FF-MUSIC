import request from '@/plugin/axios'

// 获取精品歌单
export function getHighQuality() {
  return request({
    url: '/top/playlist/highquality',
    method: 'get'
  })
}
// 获取歌单详情

export function getListDetails(id) {
  return request({
    url: `/playlist/detail`,
    method: 'get',
    params: {
      id
    }
  })
}

// 获取音乐 URL

export function getMusicUrl(id) {
  return request({
    url: `/song/url`,
    method: 'get',
    params: {
      id
    }
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