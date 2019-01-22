import React, { Component } from 'react';

import Sidebar from '../components/Sidebar';
import NewFriend from '../components/NewFriend';
import Chat from '../components/Chat';

import './Main.css';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

const storage = window.localStorage;

export default class Main extends Component {
  state = {
    modal: null,
    chats: {
      '0.bado ladino': {
        name: 'hingobway',
        messages: [
          {
            from: 'hingobway',
            content:
              'supsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsupsup',
            timestamp: 500000000
          }
        ]
      },
      '0.oopsie doopsie': {
        name: 'the bois',
        messages: [
          {
            from: 'yo',
            content: 'yo',
            timestamp: 50000
          }
        ]
      }
    }
  };

  endModal = e => this.setState({ modal: null });

  newFriend = e =>
    this.setState({
      modal: <NewFriend done={this.endModal} />
    });

  switchChat = chat => {
    this.setState(({ chats }) => ({
      chats: Object.keys(chats).reduce((out, k) => {
        const cur = chats[k];
        cur.active = k === chat;
        out[k] = cur;
        return out;
      }, {})
    }));
  };

  componentDidMount() {
    ipc.send('chat-ready');
    ipc.on('chat-new-peer', (_, { username, id }) => {
      this.setState(({ chats }) => {
        let nc = chats;
        nc[id] = {
          name: username,
          messages: []
        };
        nc = Object.keys(nc).reduce((out, k) => {
          const cur = nc[k];
          cur.active = k === id;
          out[k] = cur;
          return out;
        }, {});
        return nc;
      });
    });
    ipc.on('chat-new-msg', (_, { to, from, content, timestamp }) => {
      this.setState(({ chats }) => {
        if (chats[to]) {
          chats[to].messages.push({
            from,
            content: decodeURIComponent(content),
            timestamp
          });

          return chats;
        }
      });
    });
  }

  newMsg = (chat, content, timestamp) => {
    this.setState(({ chats }) => {
      if (chats[chat]) {
        chats[chat].messages.push({
          from: storage.getItem('username'),
          content: decodeURIComponent(content),
          timestamp
        });

        return chats;
      }
    });
  };

  render() {
    return (
      <div id="cont">
        {this.state.modal ? (
          <div id="modal">
            <div className="modal-bg" onClick={this.endModal} />
            <div className="modal">{this.state.modal}</div>
          </div>
        ) : null}
        <Sidebar
          newFriend={this.newFriend}
          chats={this.state.chats}
          switchChat={e =>
            this.switchChat(e.currentTarget.getAttribute('data-chat'))
          }
        />
        <div className="main" style={{ margin: 0 }}>
          {Object.keys(this.state.chats).findIndex(
            i => this.state.chats[i].active
          ) > -1 ? (
            <Chat
              chat={
                Object.keys(this.state.chats)[
                  Object.keys(this.state.chats).findIndex(
                    i => this.state.chats[i].active
                  )
                ]
              }
              messages={
                this.state.chats[
                  Object.keys(this.state.chats)[
                    Object.keys(this.state.chats).findIndex(
                      i => this.state.chats[i].active
                    )
                  ]
                ].messages
              }
              newMsg={this.newMsg}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
