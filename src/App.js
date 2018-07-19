import React, { Component } from 'react';
import './App.css';

import { Header } from './header/header'
import { Footer } from './footer/footer'
import Markers from './main/markerlist'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Markers />
        <Footer />
      </div>
    );
  }
}

export default App;