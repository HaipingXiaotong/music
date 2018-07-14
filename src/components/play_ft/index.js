import React, { Component } from 'react'
import './index.less'
// import Progress from '../../common/progress'
import Slider from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
class PlayFt extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            paused: false,
            volume: true,
            duration: null,
            val: 0,
            max: null,
            h5audio: null,
            currentTime: null,
            voice: 1
        }
        this.timer = null
        this.h5audio = null
        this.timeA = null
    }
    componentDidMount() {
        this.h5audio = document.getElementById('h5audio_media')
        this.h5audio.oncanplay = () => {
            let duration = Math.floor(this.h5audio.duration)
            this.setState(() => {
                return {
                    max: +duration
                }
            })
        }
    }
    sliderChange = (val) => {
        this.setState({ val: val, currentTime: val })
    }
    // 跳转
    jump = (val) => {
        if (this.timeA) {
            clearTimeout(this.timeA)
        }
        this.sliderChange(val)
        this.timeA = setTimeout(() => {
            this.h5audio.currentTime = val
            this.props.LyricRef.play(this.h5audio.currentTime * 1000)
        }, 600)
    }
    // 声音大小改变
    voiceChange = (val) => {
        this.h5audio.volume = val
        this.setState({ voice: val })
    }
    // 滚动
    rolling = (e) => {
        let val = e.target.currentTime
        if (Math.floor(val) === this.state.max) {
            this.props.changeId()
        }
        this.sliderChange(val)
    }
    // 暂停或者播放
    paused = () => {
        if (this.h5audio.paused) {
            this.h5audio.play()
            this.props.LyricRef.seek(this.state.currentTime * 1000)
        }
        else {
            this.h5audio.pause()
            this.props.LyricRef.stop()
            clearInterval(this.timer)
        }
        this.setState({
            paused: !this.state.paused
        })
    }
    // 静音或者开启声音
    volumePaused = (e) => {
        this.h5audio.muted = !this.h5audio.muted
        this.setState({
            volume: !this.state.volume
        })
    }
    // 计算时间
    calculation(val) {
        let minites = Math.floor(val / 60)
        let second = Math.floor(val % 60)
        if (minites < 10) {
            minites = '0' + minites
        }
        if (second < 10) {
            second = '0' + second
        }
        return minites + ':' + second
    }
    render() {
        return (
            <div className="play-ft">
                <audio
                    id="h5audio_media"
                    height="0"
                    width="0"
                    autoPlay
                    onTimeUpdate={this.rolling}
                    src={this.props.songId.singUrl[0]}>
                    <source src={this.props.songId.singUrl[0]} />
                </audio>
                <div className="control">
                    <span onClick={() => { this.props.lastChange() }}>
                        <i className="material-icons play-icon">skip_previous</i>
                    </span>
                    <span onClick={this.paused}>
                        <i className="material-icons play-icon">
                            {
                                this.state.paused ?
                                    'play_circle_outline'
                                    :
                                    'pause_circle_outline'
                            }
                        </i>
                    </span>
                    <span onClick={() => { this.props.changeId() }}>
                        <i className="material-icons play-icon">skip_next</i>
                    </span>
                </div>
                <div className="play-progress">
                    <div className="play-progress-top">
                        <div className="left">{this.props.songId.songname + '-' + this.props.songId.singer}</div>
                        <div className="right">{this.calculation(this.state.currentTime)}/{this.calculation(this.state.max)}</div>
                    </div>
                    <Slider className="slider"
                        max={this.state.max}
                        value={this.state.val}
                        onAfterChange={this.sliderChange}
                        onChange={this.jump}
                    />
                </div>
                <div className="select">
                    <span onClick={this.props.Toggle}>
                        {this.props.Switch ?
                            <svg t="1528287890168" className="play-icon2"
                                viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2010"
                                width="35" height="35">
                                <defs><style type="text/css"></style></defs>
                                <path d="M736 224H288C128.944 224 0 352.944 0 512s128.944 288 288 288h448c159.056 0 288-128.944 288-288S895.056 224 736 224z m0 528H288C155.456 752 48 644.544 48 512s107.456-240 240-240h448c132.544 0 240 107.456 240 240S868.544 752 736 752z" fill="#bbbbbb" p-id="2011"></path><path d="M116.336 512a11 11 0 1 0 352 0 11 11 0 1 0-352 0z" p-id="2012"></path></svg>
                            :
                            <svg t="1528287920641"
                                className="play-icon2"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="2224" width="35" height="35">
                                <defs><style type="text/css"></style></defs>
                                <path d="M736 224H288C128.944 224 0 352.944 0 512s128.944 288 288 288h448c159.056 0 288-128.944 288-288S895.056 224 736 224z m0 528H288C155.456 752 48 644.544 48 512s107.456-240 240-240h448c132.544 0 240 107.456 240 240S868.544 752 736 752z" fill="#dddddd" p-id="2225"></path><path d="M555.664 512a11 11 0 1 0 352 0 11 11 0 1 0-352 0z" p-id="2226"></path></svg>
                        }
                    </span>
                    <span>
                        <a download="歌曲.m4a" href={this.props.songId.singUrl[0]} target='_blank'>
                            <i className="material-icons play-icon2">cloud_download</i>
                        </a>
                    </span>
                    <span>
                        <svg t="1528084612562"
                            className="play-icon2"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            p-id="604"
                            width="35"
                            height="35">
                            <defs><style type="text/css"></style></defs>
                            <path d="M752.89 356.741h57.565v97.06L957.44 283.095l-146.939-167.04v110.817h-57.559c-164.813 0-272.317 127.002-354.427 239.053-73.697 100.72-137.492 195.748-240.292 195.748H66.56v129.92h91.617c164.813 0 257.813-135.014 339.968-247.07 73.698-100.773 151.7-187.782 254.746-187.782z m-446.632 74.291l21.335-28.907c17.515-23.803 35.835-49.045 55.777-74.092-59.044-57.267-130.12-99.533-225.193-99.533H66.56v129.874s24.699-1.239 91.617 0c64.784 1.434 105.416 28.954 148.08 72.658zM810.5 666.665h-57.559c-62.766 0-125.42-36.373-170.312-84.629a929.229 929.229 0 0 1-13.557 18.463c-19.702 26.87-40.832 55.824-64.144 84.337 60.585 61.368 148.383 111.703 248.013 111.703h57.56v111.406L957.44 736.947 810.501 570.214v96.451z" p-id="605" ></path>
                        </svg>
                    </span>
                    <div className="volume">
                        <span onClick={this.volumePaused}>
                            <i className="material-icons play-icon2">
                                {
                                    this.state.volume ?
                                        'volume_up'
                                        :
                                        'volume_off'
                                }
                            </i>
                        </span>
                        <Slider className="volume-slider"
                            max={1}
                            step={0.1}
                            value={this.state.voice}
                            defaultValue={1}
                            // onAfterChange={this.voiceChange}
                            onChange={this.voiceChange}
                        />
                    </div>
                </div>
            </div >
        )
    }
}
export default PlayFt