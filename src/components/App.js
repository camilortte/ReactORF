import React, { Component } from 'react';
import './global/css/App.css';
import Header from './global/Header'
import UploadSequence from './UploadSequence'
import Footer from "./global/Footer";
import CalcORF from "./CalcORF";
import ORFAlgorithm from "./ORFAlgorithm";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      sequence: null,
    };
    //            3   6   9  12  15  18  21  24  27  30  33  36  39 41
    //         "_AA CTG CAA TGG TAC GTA ACT AAG TCA ATG GTA CGT AAA SC".replace(/\s/g,"");
    // //         "__AACTGCA ATGGTACGTAACTAA ATGGTACGTAACTAA ASC".replace(/\s/g,"");
    // let shit = "AACTGCA ATGGTACGTAACTAA ATGGTACGTAACTAA ASC".replace(/\s/g,"");
    // // shit = "AACTGCATAA ATGGTACGTAACTAA ATGGTACGTAACTAA ASC".replace(/\s/g,"");
    // shit = "AAGATGGCCGCGGCGCGCACGGCTCCTGCGGCGGGGTAGAGGCGGAGGCGGAGTCGAGTCACTCCCGCACTTCGGGGCTCCGGTGCCCCGCGCCAGGCTGCAGCTTACTGCCCGCCGCGGCCATGCGGGGCTCCGTGCACGGATGAGAGAAGCCGCTGCCGCGCTGGTCCCTCCTCCCGCCTTTGCCGTCACGCCTGCCGCCGCCATGGAGGAGCCGCCGCCACCGCCGCCGCCGCCACCACCGCCACCGGAACCCGAGACCGAGTCAGAACCCGAGTGCTGCTTGGCGGCGAGGCAAGAGGGCACATTGGGAGATTCAGCTTGCAAGAGTCCTGAATCTGATCTAGAAGACTTCTCCGATGAAACAAATACAGAGAATCTTTATGGTACCTCTCCCCCCAGCACACCTCGACAGATGAAACGCATGTCAACCAAACATCAGAGGAATAATGTGGGGAGGCCAGCCAGTCGGTCTAATTTGAAAGAAAAAATGAATGCACCAAATCAGCCTCCACATAAAGACACTGGAAAAACAGTGGAGAATGTGGAAGAATACAGCTATAAGCAGGAGAAAAAGATCCGAGCAGCTCTTAGAACAACAGAGCGTGATCATAAAAAAAATGTACAGTGCTCATTCATGTTAGACTCAGTGGGTGGATCTTTGCCAAAAAAATCAATTCCAGATGTGGATCTCAATAAGCCTTACCTCAGCCTTGGCTGTAGCAATGCTAAGCTTCCAGTATCTGTGCCCATGCCTATAGCCAGACCTGCACGCCAGACTTCTAGGACTGACTGTCCAGCAGATCGTTTAAAGTTTTTTGAAACTTTACGACTTTTGCTAAAGCTTACCTCAGTCTCAAAGAAAAAAGACAGGGAGCAAAGAGGACAAGAAAATACGTCTGGTTTCTGGCTTAACCGATCTAACGAACTGATCTGGTTAGAGCTACAAGCCTGGCATGCAGGACGGACAATTAACGACCAGGACTTCTTTTTATATACAGCCCGTCAAGCCATCCCAGATATTATTAATGAAATCCTTACTTTCAAAGTCGACTATGGGAGCTTCGCCTTTGTTAGAGATAGAGCTGGTTTTAATGGTACTTCAGTAGAAGGGCAGTGCAAAGCCACTCCTGGAACAAAGATTGTAGGTTACTCAACACATCATGAGCATCTCCAACGCCAGAGGGTCTCATTTGAGCAGGTAAAACGGATAATGGAGCTGCTAGAGTACATAGAAGCACTTTATCCATCATTGCAGGCTCTTCAGAAGGACTATGAAAAATATGCTGCAAAAGACTTCCAGGACAGGGTGCAGGCACTCTGTTTGTGGTTAAACATCACAAAAGACTTAAATCAGAAATTAAGGATTATGGGCACTGTTTTGGGCATCAAGAATTTATCAGACATTGGCTGGCCAGTGTTTGAAATCCCTTCCCCTCGACCATCCAAAGGTAATGAGCCGGAGTATGAGGGTGATGACACAGAAGGAGAATTAAAGGAGTTGGAAAGTAGTACGGATGAGAGTGAAGAAGAACAAATCTCTGATCCTAGGGTACCGGAAATCAGACAGCCCATAGATAACAGCTTCGACATCCAGTCGCGGGACTGCATATCCAAGAAGCTTGAGAGGCTCGAATCTGAGGATGATTCTCTTGGCTGGGGAGCACCAGACTGGAGCACAGAAGCAGGCTTTAGTAGACATTGTCTGACTTCTATTTATAGACCATTTGTAGACAAAGCACTGAAGCAGATGGGGTTAAGAAAGTTAATTTTAAGACTTCACAAGCTAATGGATGGTTCCTTGCAAAGGGCACGTATAGCATTGGTAAAGAACGATCGTCCAGTGGAGTTTTCTGAATTTCCAGATCCCATGTGGGGTTCAGATTATGTGCAGTTGTCAAGGACACCACCTTCATCTGAGGAGAAATGCAGTGCTGTGTCGTGGGAGGAGCTGAAGGCCATGGATTTACCTTCATTCGAACCTGCCTTCCTAGTTCTCTGCCGAGTCCTTCTGAATGTCATACATGAGTGTCTGAAGTTAAGATTGGAGCAGAGACCTGCTGGAGAACCATCTCTCTTGAGTATTAAGCAGCTGGTGAGAGAGTGTAAGGAGGTCCTGAAGGGCGGCCTGCTGATGAAGCAGTACTACCAGTTCATGCTGCAGGAGGTTCTGGAGGACTTGGAGAAGCCCGACTGCAACATTGACGCTTTTGAAGAGGATCTACATAAAATGCTTATGGTGTATTTTGATTACATGAGAAGCTGGATCCAAATGCTACAGCAATTACCTCAAGCATCGCATAGTTTAAAAAATCTGTTAGAAGAAGAATGGAATTTCACCAAAGAAATAACTCATTACATACGGGGAGGAGAAGCACAGGCCGGGAAGCTTTTCTGTGACATTGCAGGAATGCTGCTGAAATCTACAGGAAGTTTTTTAGAATTTGGCTTACAGGAGAGCTGTGCTGAATTTTGGACTAGTGCGGATGACAGCAGTGCTTCCGACGAAATCATCAGGTCTGTTATAGAGATCAGTCGAGCCCTGAAGGAGCTCTTCCATGAAGCCAGAGAAAGGGCTTCCAAAGCACTTGGATTTGCTAAAATGTTGAGAAAGGACCTGGAAATAGCAGCAGAATTCAGGCTTTCAGCCCCAGTTAGAGACCTCCTGGATGTTCTGAAATCAAAACAGTATGTCAAGGTGCAAATTCCTGGGTTAGAAAACTTGCAAATGTTTGTTCCAGACACTCTTGCTGAGGAGAAGAGTATTATTTTGCAGTTACTCAATGCAGCTGCAGGAAAGGACTGTTCAAAAGATTCAGATGACGTACTCATCGATGCCTATCTGCTTCTGACCAAGCACGGTGATCGAGCCCGTGATTCAGAGGACAGCTGGGGCACCTGGGAGGCACAGCCTGTCAAAGTCGTGCCTCAGGTGGAGACTGTTGACACCCTGAGAAGCATGCAGGTGGATAATCTTTTACTAGTTGTCATGCAGTCTGCGCATCTCACAATTCAGAGAAAAGCTTTCCAGCAGTCCATTGAGGGACTTATGACTCTGTGCCAGGAGCAGACATCCAGTCAGCCGGTCATCGCCAAAGCTTTGCAGCAGCTGAAGAATGATGCATTGGAGCTATGCAACAGGATAAGCAATGCCATTGACCGCGTGGACCACATGTTCACATCAGAATTTGATGCTGAGGTTGATGAATCTGAATCTGTCACCTTGCAACAGTACTACCGAGAAGCAATGATTCAGGGGTACAATTTTGGATTTGAGTATCATAAAGAAGTTGTTCGTTTGATGTCTGGGGAGTTTAGACAGAAGATAGGAGACAAATATATAAGCTTTGCCCGGAAGTGGATGAATTATGTCCTGACTAAATGTGAGAGTGGTAGAGGTACAAGACCCAGGTGGGCGACTCAAGGATTTGATTTTCTACAAGCAATTGAACCTGCCTTTATTTCAGCTTTACCAGAAGATGACTTCTTGAGTTTACAAGCCTTGATGAATGAATGCATTGGCCATGTCATAGGAAAACCACACAGTCCTGTTACAGGTTTGTACCTTGCCATTCATCGGAACAGCCCCCGTCCTATGAAGGTACCTCGATGCCATAGTGACCCTCCTAACCCACACCTCATTATCCCCACTCCAGAGGGATTCAGCACTCGGAGCATGCCTTCCGACGCGCGGAGCCATGGCAGCCCTGCTGCTGCTGCTGCTGCTGCTGCTGCTGTTGCTGCCAGTCGGCCCAGCCCCTCTGGTGGTGACTCTGTGCTGCCCAAATCCATCAGCAGTGCCCATGATACCAGGGGTTCCAGCGTTCCTGAAAATGATCGATTGGCTTCCATAGCTGCTGAATTGCAGTTTAGGTCCCTGAGTCGTCACTCAAGCCCCACGGAGGAGCGAGATGAACCAGCATATCCAAGAGGAGATTCAAGTGGGTCCACAAGAAGAAGTTGGGAACTTCGGACACTAATCAGCCAGAGTAAAGATACTGCTTCTAAACTAGGACCCATAGAAGCTATCCAGAAGTCAGTCCGATTGTTTGAAGAAAAGAGGTACCGAGAAATGAGGAGAAAGAATATCATTGGTCAAGTTTGTGATACGCCTAAGTCCTATGATAATGTTATGCACGTTGGCTTGAGGAAGGTGACCTTCAAATGGCAAAGAGGAAACAAAATTGGAGAAGGCCAGTATGGGAAGGTGTACACCTGCATCAGCGTCGACACCGGGGAGCTGATGGCCATGAAAGAGATTCGATTTCAACCTAATGACCATAAGACTATCAAGGAAACTGCAGACGAATTGAAAATATTCGAAGGCATCAAACACCCCAATCTGGTTCGGTATTTTGGTGTGGAGCTCCATAGAGAAGAAATGTACATCTTCATGGAGTACTGCGATGAGGGGACTTTAGAAGAGGTGTCAAGGCTGGGACTTCAGGAACATGTGATTAGGCTGTATTCAAAGCAGATCACCATTGCGATCAACGTCCTCCATGAGCATGGCATAGTCCACCGTGACATTAAAGGTGCCAATATCTTCCTTACCTCATCTGGATTAATCAAACTGGGAGATTTTGGATGTTCAGTAAAGCTCAAAAACAATGCCCAGACCATGCCTGGTGAAGTGAACAGCACCCTGGGGACAGCAGCATACATGGCACCTGAAGTCATCACTCGTGCCAAAGGAGAGGGCCATGGGCGTGCGGCCGACATCTGGAGTCTGGGGTGTGTTGTCATAGAGATGGTGACTGGCAAGAGGCCTTGGCATGAGTATGAGCACAACTTTCAAATTATGTATAAAGTGGGGATGGGACATAAGCCACCAATCCCTGAAAGATTAAGCCCTGAAGGAAAGGACTTCCTTTCTCACTGCCTTGAGAGTGACCCAAAGATGAGATGGACCGCCAGCCAGCTCCTCGACCATTCGTTTGTCAAGGTTTGCACAGATGAAGAATGAAGCCTAGTAGAATATGGACTTGGAAAATTCTCTTAATCACTACTGTATGTAATATTTACATAAAGACTGTGCTGAGAAGCAGTATAAGCCTTTTTAACCTTCCAAGACTGAAGACTGCACAGGTGACAAGCGTCACTTCTCCTGCTGCTCCTGTTTGTCTGATGTGGCAAAAGGCCCTCTGGAGGGCTGGTGGCCACGAGGTTAAAGAAGCTGCATGTTAAGTGCCATTACTACTGTACACGGACCATCGCCTCTGTCTCCTCCGTGTCTCGCGCGACTGAGAACCGTGACATCAGCGTAGTGTTTTGACCTTTCTAGGTTCAAAAGAAGTTGTAGTGTTATCAGGCGTCCCATACCTTGTTTTTAATCTCCTGTTTGTTGAGTGCACTGACTGTGAAACCTTTACCTTTTTTGTTGTTGTTGGCAAGCTGCAGGTTTGTAATGCAAAAGGCTGATTACTGAAATTTAAGAAAAAGGTT";
    // // shit = "AACTGCAGTACGTAACGTCA";
    // console.log(shit);
    // let ORFalg = new ORFAlgorithm(shit);
    // ORFalg.readSequence("+3");
    // ORFalg.readSequence("+2");
    // ORFalg.readSequence("+1");
    // ORFalg.printORFResult();

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