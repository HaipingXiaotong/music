import React, { Component } from 'react';
import './App.css';
import MyPlay from './pages/play'
class App extends Component {
  render() {
    return (
      <div className="App">
        { /* 播放页面 */ }
        <MyPlay />
      </div>
      );
  }
}

export default App;
