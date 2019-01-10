import React, { Component } from 'react';

import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div id="cont">
        <h1>Home Page</h1>
        <input type="text" placeholder="Friend ID" />
      </div>
    );
  }
}
