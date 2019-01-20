import React, { Component } from 'react';

import '../styles/Sidebar.css';

const os = window.require('os');
const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default class Sidebar extends Component {
  state = {
    friends: [
      {
        name: 'hingobway',
        msg: 'snippet snippet...'
      },
      {
        name: 'hingobway',
        msg: 'snippet snippet...'
      }
    ],
    selfIP: '',
    selfID: ''
  };

  IPs = [['', '']];
  getIPs() {
    let out = [];
    const ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(ifname => {
      let acceptedIndex = 0;
      ifaces[ifname].forEach(iface => {
        if ('IPv4' !== iface.family || iface.internal !== false) return;

        if (acceptedIndex === 0) out.push([ifname, iface.address]);
        acceptedIndex++;
      });
    });
    return out;
  }

  constructor(props) {
    super(props);

    this.IPs.push(...this.getIPs());
  }

  handleIP = e => {
    this.setState({
      selfIP: e.target.value,
      selfID: ipc.sendSync('ptod', e.target.value).slice(2)
    });
  };

  render() {
    return (
      <div id="sidebar" style={{ margin: 0 }}>
        <div className="header">
          <h3>Friends</h3>
          <i className="material-icons" onClick={this.props.newFriend}>
            add
          </i>
        </div>
        <ul className="sidebar">
          {this.state.friends.map((cur, ind) => (
            <li className="sidebar" key={ind}>
              <div className="name">{cur.name}</div>
              <div className="msg">{cur.msg}</div>
            </li>
          ))}
        </ul>
        <div className="sidebar share">
          <div id="selfID">
            Your ID:{' '}
            <span className="gray">{this.state.selfID || '[select IP]'}</span>
          </div>
          <select name="share" id="share" onChange={this.handleIP}>
            {this.IPs.map((cur, ind) => (
              <option key={ind} value={cur[1]}>
                {ind === 0
                  ? 'Choose the correct IP'
                  : `${cur[0].slice(0, 7)}...: ${cur[1]}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
