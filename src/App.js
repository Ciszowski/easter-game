import React, { Component } from 'react';
import './style.css'

import Router from './composants/Router'

class App extends Component {
  render() {
    return (
      <div className="app">
         <Router />
      </div>
    );
  }
}

export default App;