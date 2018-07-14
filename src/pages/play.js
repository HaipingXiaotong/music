import React, { Component } from 'react'
import './index.less'
import PlayHd from '../components/play_hd'
import PlayBd from '../components/play_body'
import PlayFt from '../components/play_ft'
class Play extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            songList: [],
            songId: {
                singer: '无',
                songname: ['无'],
                singUrl: [],
                interval: 0,
                songmid: null,
                albummid: null
            },
            songIndex: null,
            switch: true
        }
    }
    // 组件挂载后
    componentDidMount() {
        let list = JSON.parse(localStorage.getItem('songList'))
        this.setState({
            songList: localStorage.getItem('songList') ? list : []
        })
    }
    addSong = (val) => {
        let obj = [...this.state.songList, val]
        this.setState(() => {
            return {
                songList: obj
            }
        })
        localStorage.setItem('songList', JSON.stringify(obj))
    }
    changeSong = (val, index) => {
        this.setState({
            songId: val,
            songIndex: index
        })
    }
    deleteSong = (arr) => {
        let list = []
        list = JSON.parse(localStorage.getItem('songList'))
        if (arr.length === 1) {
            list.splice(arr[0], 1)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let a = 0
                if (i !== 0) {
                    a = arr[i] - i
                }
                list.splice(a, 1)
            }
        }

        localStorage.setItem('songList', JSON.stringify(list))
        this.setState({
            songList: list
        })
    }
    // 播放上一曲
    lastChange = (i) => {
        let list = JSON.parse(localStorage.getItem('songList'))
        let index = i ? i : (this.state.songIndex - 1)
        if (0 > index) {
            return
        }
        this.setState({
            songIndex: index,
            songId: list[index]
        })
    }
    // 播放下一曲
    changeId = (i) => {
        let list = JSON.parse(localStorage.getItem('songList'))
        let index = i ? i : (this.state.songIndex + 1)
        if (list.length === index) {
            return
        }
        this.setState({
            songIndex: index,
            songId: list[index]
        })
    }
    // 绑定子组件
    onRef = (ref) => {
        this.lyric = ref
    }
    // 开启简洁模式
    toggle = (e) => {
        this.setState({
            switch: !this.state.switch
        })
    }
    render() {
        return (
            <div className="music-play-contrain">
                <div className="music-play">
                    <PlayHd addSong={this.addSong} />
                    <PlayBd deleteSong={this.deleteSong}
                        onRef={this.onRef}
                        Switch={this.state.switch}
                        songList={this.state.songList}
                        songId={this.state.songId}
                        changeSong={this.changeSong} />
                    <PlayFt changeId={this.changeId}
                        LyricRef={this.lyric}
                        lastChange={this.lastChange}
                        Switch={this.state.switch}
                        songId={this.state.songId}
                        Toggle={this.toggle} />
                </div>
                <div className="bg_player" style={{
                    backgroundImage: this.state.songId.albummid ? `url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.state.songId.albummid}.jpg?max_age=2592000)` : ''
                }}>
                </div>
            </div>
        )
    }
}
export default Play