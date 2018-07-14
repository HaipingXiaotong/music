import React, { Component } from 'react'
import './index.less'
import Check from '../check'
class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkeds: []
    }
  }
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
  list() {
    return this.props.songList.map((x, index) =>
      <ul className="song" key={x.songname}>
        <li>
          <Check name="arr" />
        </li>
        <li>{index + 1}</li>
        <li>{x.songname}
          <div className="SongButton" onClick={() => {
            this.props.changeSong(x, index)
          }}>
            <svg t="1528085241790" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2397" xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M512 42.666667C253.866667 42.666667 42.666667 251.733333 42.666667 512s211.2 469.333333 469.333333 469.333333c260.266667 0 469.333333-209.066667 469.333333-469.333333S772.266667 42.666667 512 42.666667zM512 938.666667C277.333333 938.666667 85.333333 746.666667 85.333333 512 85.333333 277.333333 277.333333 85.333333 512 85.333333c234.666667 0 426.666667 192 426.666667 426.666667C938.666667 746.666667 746.666667 938.666667 512 938.666667zM716.8 494.933333 716.8 494.933333l-4.266667-2.133333c0 0 0 0-2.133333 0l-292.266667-168.533333 0 0C413.866667 322.133333 409.6 320 405.333333 320c-12.8 0-21.333333 8.533333-21.333333 21.333333l0 341.333333c0 12.8 8.533333 21.333333 21.333333 21.333333 4.266667 0 8.533333-2.133333 12.8-4.266667l0 0 292.266667-168.533333c0 0 0 0 2.133333 0l4.266667-2.133333 0 0c4.266667-4.266667 8.533333-10.666667 8.533333-17.066667S721.066667 499.2 716.8 494.933333zM426.666667 646.4 426.666667 377.6 661.333333 512 426.666667 646.4z" p-id="2398" fill="#bbbbbb"></path>
            </svg>
          </div>
        </li>
        <li>{
          x.singer
        }</li>
        <li>
          <span className='interval'>
            {this.calculation(x.interval)}
          </span>
          <div className="Trash" onClick={() => {
            this.props.deleteSong([index])
          }
          }>
            <svg t="1528109299281" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2117" xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M674.133333 174.933333V110.933333c0-38.4-29.866667-68.266667-64-68.266666H413.866667c-38.4 0-64 29.866667-64 68.266666v68.266667H85.333333v68.266667h98.133334v669.866666c0 34.133333 29.866667 64 64 64h524.8c34.133333 0 64-29.866667 64-68.266666V243.2H938.666667V174.933333h-264.533334zM413.866667 110.933333h196.266666v68.266667H413.866667V110.933333z m362.666666 802.133334H247.466667V243.2h524.8v669.866667zM413.866667 345.6H349.866667v469.333333h64v-469.333333z m132.266666 0h-64v469.333333h64v-469.333333z m128 0h-64v469.333333h64v-469.333333z" fill="#bbbbbb" p-id="2118"></path></svg>
          </div>
        </li>
      </ul >
    )
  }
  // 删除列表
  deleteList = (e) => {
    let arr1 = []
    let arr = document.getElementsByName("arr")
    arr.forEach((item, index) => {
      if (item.checked) {
        arr1.push(index)
      }
    })
    this.props.deleteSong(arr1)
  }
  // 全选事件
  TotalSelect() {
    let arr = document.getElementsByName("arr")
    let isTrue = document.getElementsByName('select')[0].checked
    arr.forEach((item, index) => {
      if (isTrue) {
        if (!item.checked) {
          item.click()
        }
      } else {
        if (item.checked) {
          item.click()
        }
      }
    })
  }
  render() {
    return (
      <div className="table">
        <div className='table-button'>
          <button className='type-button'>下载</button>
          <button className='type-button' onClick={this.deleteList}>删除</button>
          <button className='type-button'>清空列表</button>
        </div>
        <div className="table-list">
          <ul>
            <li><Check checked={false} name="select" change={this.TotalSelect} /></li>
            <li></li>
            <li>歌曲</li>
            <li>歌手</li>
            <li>时长</li>
          </ul>
          {this.list()}
        </div>
      </div>
    )
  }
}
export default Table