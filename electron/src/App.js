import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TitleBar from './components/TitleBar';

import Home from './pages/Home';

import './styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <TitleBar />

          <Route path="/" exact component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
