import React, { Component } from 'react';

import Sidebar from '../components/Sidebar';
import NewFriend from '../components/NewFriend';

import './Main.css';

export default class Main extends Component {
  state = {
    modal: null
  };

  endModal = e => this.setState({ modal: null });

  newFriend = e =>
    this.setState({
      modal: <NewFriend done={this.endModal} />
    });

  render() {
    return (
      <div id="cont">
        {this.state.modal ? (
          <div id="modal">
            <div className="modal-bg" onClick={this.endModal} />
            <div className="modal">{this.state.modal}</div>
          </div>
        ) : null}
        <Sidebar newFriend={this.newFriend} />
        <div className="main">
          <p>Main</p>
        </div>
      </div>
    );
  }
}
