import React, { Component } from 'react'
import './index.less'
// 函数节流
import TxMusic from '../../common/api/TxMusic'
let timer
class Search extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            song: '',
            timer: null,
            MusicList: [],
            isShow: false
        }
    }
    sendJson = (e) => {
        this.setState({
            'song': e.target.value
        });
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(async() => {
            this.setState({
                MusicList: await TxMusic(this.state.song)
            })
        }, 300)
    }
    focus = (e) => {
        this.setState(() => {
            return {
                isShow: true
            }
        })
    }
    blur = (e) => {
        this.setState(() => {
            return {
                isShow: false
            }
        })
    }
    list() {
        if(this.state.MusicList.length===0){
            return
        }
        return this.state.MusicList.map(
            (x, index) => <li key={ index } 
            onClick={()=>{
                this.blur()
                return this.props.addSong(x)}}>
                <span>{ index + 1 }  </span>
                <span className='li-center'>{ x.songname }</span>
                <span className='li-right'>
                { x.singer}
                </span>
                </li>
        )
    }
    render() {
        return (
            <div className="Search">
              <input className='search_input' onFocus={ this.focus } value={ this.state.song } onChange={ this.sendJson } placeholder="请输入歌名"
                type="text" />
              <div className='search'>
                <i className="material-icons">search</i>
              </div>
              <button className='btn' onClick={this.blur}>取消</button>
              { this.state.isShow && 
                <div className="list">
                  <ul>
                    {  this.list()}
                  </ul>
                </div> }
            </div>
        )
    }
}
export default Search