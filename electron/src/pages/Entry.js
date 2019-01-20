import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Entry.css';

const storage = window.localStorage;

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default class Entry extends Component {
  state = {
    name: '',
    done: false
  };

  textbox = React.createRef();

  dash = s =>
    s
      .toLowerCase()
      .replace(/[ -]+/g, '-')
      .replace(/[^a-z0-9\-_]/g, '');

  handleText = e =>
    this.setState({
      name: this.dash(e.currentTarget.value)
    });

  handleSub = e => {
    if (e.key === 'Enter') {
      storage.setItem('username', this.dash(this.state.name));
      ipc.send('ipc-send', {
        method: 'username',
        username: this.dash(this.state.name)
      });
      this.setState({ done: true });
    }
  };

  componentDidMount() {
    let username;
    if ((username = storage.getItem('username'))) {
      ipc.send('ipc-send', { method: 'username', username });
      this.setState({ done: true });
    }
    if (this.textbox.current) this.textbox.current.focus();
  }

  render() {
    return this.state.done ? (
      <Redirect to="/main" />
    ) : (
      <div id="entry">
        <h1>Entry Page</h1>
        <input
          type="text"
          placeholder="Your Username"
          ref={this.textbox}
          value={this.state.name}
          onKeyUp={this.handleSub}
          onChange={this.handleText}
        />
      </div>
    );
  }
}
