import React, { Component } from 'react';

import './Home.css';

const storage = window.localStorage;

export default class Home extends Component {
  handleText = e => {
    if (e.key == 'Enter') {
      storage.setItem('username', e.currentTarget.value);
    }
  };

  render() {
    return (
      <div id="cont">
        <h1>Entry Page</h1>
        <input
          type="text"
          placeholder="Your Username"
          onKeyUp={this.handleText}
        />
      </div>
    );
  }
}
