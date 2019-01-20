import React, { Component } from 'react';

import '../styles/NewFriend.css';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default class NewFriend extends Component {
  state = {
    text: ''
  };

  textbox = React.createRef();

  handleText = e =>
    this.setState({
      text: e.target.value
        .toLowerCase()
        .replace(/[^a-z]+/g, ' ')
        .replace(/^ /, '')
        .slice(0, 11)
    });

  handleForm = e => {
    e.preventDefault();

    this.setState({ text: '' });
    ipc.send('ipc-send', { method: 'connect', user: '0.' + this.state.text });
    this.props.done();
  };

  componentDidMount() {
    this.textbox.current.focus();
  }

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
            ref={this.textbox}
            placeholder="bado ladino"
            onChange={this.handleText}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}
