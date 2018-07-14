import React, { Component } from 'react'
import './index.less'
import Table from '../table'
import Lyric from '../lyric'
class PlayBody extends Component {
    render() {
        return (
            <div className="play-body">
                <Lyric bindLyric={this.props.bindLyric}
                    onRef={this.props.onRef}
                    songId={this.props.songId} />
                {this.props.Switch &&
                    <Table deleteSong={this.props.deleteSong}
                        songList={this.props.songList}
                        changeSong={this.props.changeSong} />
                }
            </div>
        )
    }
}
export default PlayBody