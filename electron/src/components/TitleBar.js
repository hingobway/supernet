import React, { Component } from 'react';

import '../styles/TitleBar.css';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default class TitleBar extends Component {
  render() {
    return (
      <div className="header-bar">
        <div id="title">
          <ul className="title">
            <li className="name ml-1">Supernet</li>
            <li
              className="navbtn minim px-2"
              onClick={() => ipc.send('devtools')}
            >
              <i className="material-icons">bug_report</i>
            </li>
            <li
              className="navbtn minim px-2"
              onClick={() => ipc.send('minimize')}
            >
              <i className="material-icons">minimize</i>
            </li>
            <li className="navbtn close px-2" onClick={() => ipc.send('close')}>
              <i className="material-icons">close</i>
            </li>
          </ul>
        </div>
        <div className="title-placeholder" />
      </div>
    );
  }
}
