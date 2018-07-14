import React, { Component } from 'react'
import './index.less'
import PropTypes from 'prop-types'
class Progress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proLeft: 30,
            min: 0,
            max: 100,
            step: null,
            progress: null
        }
    }
    // dom节点挂载后
    componentDidMount() {
        this.init()
        // this.rolling()
    }
    // 初始化
    init() {
        let progress = this.refs.progress
        let step = progress.offsetWidth / this.state.max
        this.setState(() => {
            return {
                progress: progress,
                step: step
            }
        })
    }
    // 进度条长度
    progressStyle() {
        return {
            width: this.props.width
        }
    }
    progressTime() {
        return {
            width: this.state.proLeft
        }
    }
    // 移动到指定位置
    rolling = (val) => {
        this.setState({
            proLeft: val
        })
    }
    progressClick = (e) => {
        console.log(e.target.offsetLeft)
        // console.log(e.clientX - e.target.clientX)
    }
    render() {
        return (
            <div ref="progress"
                onClick={this.progressClick}
                className="Progress"
                style={this.progressStyle()} >
                <div className="player_progress__play"
                    style={
                        this.progressTime()
                    }
                ></div>
            </div>
        )
    }
}
Progress.propTypes = {
    width: PropTypes.string
}
export default Progress