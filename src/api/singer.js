import request from '@/plugin/axios'

// 歌手
export const getSingerList = (type, area, initial) => {
  return request({
    url: '/artist/list',
    method: 'get',
    params: {
      type,
      area,
      initial,
    },
  })
}


// 热门50首

export const getTopSong = (id) => {
  return request({
    url: '/artist/top/song',
    params: {
      id
    }
  })
}

// 歌手详情

export const getArtistDetail = (id) => {
  return request({
    url: '/artist/detail',
    params: {
      id,
    },
  })
}