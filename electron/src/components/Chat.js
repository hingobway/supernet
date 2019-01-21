import React, { Component } from 'react';

import moment from 'moment';

import '../styles/Chat.css';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default class Chat extends Component {
  state = {
    text: '',
    update: 0
  };

  scrollPointer = React.createRef();
  scrollToBottom() {
    const s = this.scrollPointer.current;
    s.scrollTop = s.scrollHeight;
  }

  handleText = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    if (e.key === 'Enter') {
      ipc.send(
        'chat-send-msg',
        this.props.chat,
        encodeURIComponent(e.target.value)
      );
    }
  };

  componentDidUpdate = () => {
    this.scrollToBottom();
  };
  componentDidMount = () => {
    this.scrollToBottom();
    setInterval(
      () => this.setState(({ update }) => ({ update: update++ })),
      2000
    );
  };

  render() {
    return (
      <div id="chat">
        <div className="messages" ref={this.scrollPointer}>
          {this.props.messages.map((cur, ind) => (
            <div className="message" key={ind}>
              <div className="info">
                <span className="author">{cur.from}</span>
                <span>&mdash;</span>
                <span className="time">
                  {moment.unix(cur.timestamp).fromNow()}
                </span>
              </div>
              <div className="content">{cur.content}</div>
            </div>
          ))}
        </div>
        <div className="text">
          <input
            type="text"
            id="text"
            value={this.state.text}
            onChange={this.handleText}
            onKeyUp={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}
