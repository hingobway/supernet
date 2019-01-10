import React, { Component } from 'react';

import './Home.css';

export default class Home extends Component {
  state = {
    peerID: ''
  };

  handleText = e => {
    this.setState({ peerID: e.currentTarget.value });
  };

  render() {
    return (
      <div id="cont">
        <h1>Home Page</h1>
        <input
          type="text"
          placeholder="Friend ID"
          onChange={this.handleText}
          value={this.state.peerID}
        />
      </div>
    );
  }
}
