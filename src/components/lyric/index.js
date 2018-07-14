import React, { Component } from 'react'
import './index.less'
import axios from 'axios'
import { Base64 } from 'js-base64';
import lyricParser from '../../common/js/lyric'
class Lyric extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyric: [],
            curLine: 0,
            startStamp: 0,
        }
        this.timer = null
        this.startStamp = null
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentDidUpdate(prevProps, prevState) {
        // 更改播放歌曲 调用方法
        if (prevProps.songId !== this.props.songId) {
            this.getLyric(this.props.songId.songmid)
        }

        // 监听是否在播放
    }
    getLyric(songmid) {
        axios.get('/api/lyric', {
            params: {
                songmid: songmid,
            }
        }).then((response) => {
            let lyric = Base64.decode(response.data.lyric)
            this.setState({
                lyric: lyricParser(lyric)
            })
            this._playRest()
        })
    }
    // 歌词开始滚动
    rollLyric() {
        if (this.state.lyric.length === this.state.curLine) {
            clearTimeout(this.timer)
            return
        }
        let line = this.state.lyric[this.state.curLine]
        let delay = line.time - (+new Date() - this.startStamp)
        this.timer = setTimeout(() => {
            this.setState(() => {
                return {
                    curLine: this.state.curLine + 1
                }
            })
            this.rollLyric()
        }, delay)
    }
    play(startTime = 0) {
        if (!this.state.lyric.length) {
            return
        }
        // 重新寻找行号
        let t = this._findCurNum(startTime)
        this.setState(() => {
            return {
                curLine: t
            }
        })
        this.startStamp = +new Date() - startTime
        if (this.state.curLine < this.state.lyric.length) {
            clearTimeout(this.timer)
            this.rollLyric()
        }
    }
    // 更新行号
    _findCurNum(time) {
        for (let i = 0; i < this.state.lyric.length; i++) {
            if (time <= this.state.lyric[i].time) {
                return i
            }
        }
        return this.state.lyric.length - 1
    }
    stop() {
        clearTimeout(this.timer)
    }
    seek(time) {
        this.play(time)
    }
    _playRest() {
        this.setState({
            curLine: 0,
            startStamp: 0,
        })
        this.play()
    }
    test() {
        console.log(1)
    }
    render() {
        return (
            <div className="lyric">
                <div className="lyric-contrain" style={
                    { transform: `translateY(${200 - this.state.curLine * 50}px)` }
                }>
                    {this.state.lyric.map((item, index) =>
                        <p key={index} className={index === (this.state.curLine - 1) ? 'on' : ''}>
                            {item.txt}
                        </p>
                    )}
                </div>
            </div>
        )
    }
}
export default Lyric