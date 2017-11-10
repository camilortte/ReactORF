import React, { Component } from 'react';
import './global/css/App.css';
import Header from './global/Header'
import UploadSequence from './UploadSequence'
import Footer from "./global/Footer";
import CalcORF from "./CalcORF";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      sequence: null,
    };
    this.onLoadSequences = this.onLoadSequences.bind(this);
  }
  // When the sequences are load
  onLoadSequences(sequence){
    const sequence_data = sequence.payload;
    this.setState({
      sequence:sequence_data,
      }
    );
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <Header/>
          <UploadSequence onLoadSequences={this.onLoadSequences}/>
          <CalcORF sequence={this.state.sequence}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
