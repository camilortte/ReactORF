import React, { Component } from 'react';
import './css/Header.css'
import './css/utils.css'
import logo from './images/logo.svg';

class Header extends Component {

  render() {
    return (
      <div id="App-Header">
        <div className="pure-g">
          <div className="pure-u-24-24 text-container text-center">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Universidad Distrital</h1>
            <h3>Bioinformática - Marco de lectura (ORF)</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
