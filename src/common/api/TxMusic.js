import jsonp from '../js/jsonp'
import { arr1 } from '../config/jsonConfig'
export default function (w) {
    return new Promise((resolve, reject) => {
        try {
            jsonp({
                url: 'http://soso.music.qq.com/fcgi-bin/search_cp',
                data: {
                    ...arr1,
                    w: w,
                    n: 15 /* 查询多少条*/
                },
                success: async function (data) {
                    let a = data.data.song.list,
                        singer = '',
                        arr = []
                    let key = await vkey()
                    a.forEach((item, index) => {
                        item.singer.forEach((x, index) => {
                            singer += '/' + x.name
                        })
                        arr.push({
                            singer: singer.slice(1),
                            songname: item.songname,
                            singUrl: quality(item, key.key),
                            interval: item.interval,
                            songmid: item.songmid,
                            albummid: item.albummid
                        })
                        singer = ''
                    })
                    resolve(arr)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
function quality(w, key) {
    let url = 'http://dl.stream.qqmusic.qq.com/',
        arr = []
    arr.push(`${url}C100${w.strMediaMid}.m4a?vkey=${key}&guid=5776031772&uin=0&fromtag=38`)
    arr.push(`${url}C400${w.strMediaMid}.m4a?vkey=${key}&guid=5776031772&uin=0&fromtag=66`)
    if (w.size128 !== 0) {
        arr.push(`${url}M500${w.strMediaMid}.mp3?vkey=${key}&guid=5776031772&uin=0&fromtag=53`)
    }
    if (w.size320 !== 0) {
        arr.push(`${url}M800${w.strMediaMid}.mp3?&vkey=${key}&guid=5776031772&uin=0&fromtag=53`)
    }
    if (w.size320 !== 0) {
        arr.push(`${url}M800${w.strMediaMid}.mp3?&vkey=${key}&guid=5776031772&uin=0&fromtag=53`)
    }
    if (w.sizeflac !== 0) {
        arr.push(`${url}F000${w.strMediaMid}.flac?&vkey=${key}&guid=5776031772&uin=0&fromtag=53`)
    }
    return arr
}
function vkey() {
    return new Promise((resolve, reject) => {
        try {
            jsonp({
                url: 'http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg',
                data: {
                    json: 3,
                    guid: 5776031772,
                    callback: 'success',
                    jsonpCallback: 'success'
                },
                success: function (data) {
                    resolve(data)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}