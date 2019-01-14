import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TitleBar from './components/TitleBar';

import Entry from './pages/Entry';
import Main from './pages/Main';

import './styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <TitleBar />

          <Route path="/" exact component={Entry} />
          <Route path="/main" component={Main} />
        </div>
      </Router>
    );
  }
}

export default App;
