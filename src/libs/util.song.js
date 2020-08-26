class Song {
  constructor({ id, name, singer, duration, cover, url }) {
    this.id = id
    this.name = name
    this.singer = singer
    this.duration = duration
    this.cover = cover
    this.url = url
  }
}

const _pad = (num, n = 2) => {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

export function formatSongList(songList) {
  return songList.map(
    song =>
      new Song({
        id: song.id,
        name: song.name,
        singer:
          (song.ar &&
            song.ar.length > 0 &&
            song.ar
              .reduce((arr, cur) => (arr.push(cur.name), arr), [])
              .join('/')) ||
          '',
        duration: song.dt,
        cover: song.al.picUrl,
        url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3 `
      })
  )
}

// 转换时间

export function formatTime(s) {
  s = s | 0
  const mm = Math.floor(s / 60)
  const ss = s % 60
  return `${_pad(mm)}:${_pad(ss)}`
}
