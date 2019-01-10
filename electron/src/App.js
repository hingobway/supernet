import React, { Component } from 'react';

import TitleBar from './components/TitleBar';

import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <TitleBar />
      </div>
    );
  }
}

export default App;
