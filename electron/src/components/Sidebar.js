import React, { Component } from 'react';

import '../styles/Sidebar.css';

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
    ]
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
      </div>
    );
  }
}
