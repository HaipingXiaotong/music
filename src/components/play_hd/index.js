import React, { Component } from 'react'
import './index.less'
import Search from '../search'
class PlayHd extends Component {
    constructor() {
        super(...arguments)
        this.state = {}
    }
    render() {
        return (
            <div className="play_hd">
                <Search addSong={this.props.addSong} />
            </div>
        )
    }
}
export default PlayHd