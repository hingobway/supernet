import React, { Component } from 'react';

import '../styles/NewFriend.css';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default class NewFriend extends Component {
  state = {
    text: ''
  };

  handleText = e =>
    this.setState({
      text: e.target.value
        .replace(/[^a-z]+/g, ' ')
        .replace(/^ /, '')
        .slice(0, 11)
    });

  handleForm = e => {
    e.preventDefault();

    this.setState({ text: '' });
    ipc.send('ipc-send', { method: 'connect', user: this.state.text });
    this.props.done();
  };

  render() {
    return (
      <div id="new-friend">
        <h2>Add Friend</h2>
        <form onSubmit={this.handleForm}>
          <label htmlFor="new-friend-user">Friend's Username</label>
          <input
            type="text"
            name="user"
            id="new-friend-user"
            placeholder="bado ladino"
            onChange={this.handleText}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}
