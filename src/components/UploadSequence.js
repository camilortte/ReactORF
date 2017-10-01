import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './global/css/UploadSequence.css';
import ReadFASTAContent from './ReadFile';


class UploadSequence extends Component {

  constructor(props){
    super(props);
    this.state = {
      accepted: [],
      rejected: [],
      sequence: null,
    };

    this.onDrop = this.onDrop.bind(this);
  }

  onLoadSequences(sequence){
    this.props.onLoadSequences(sequence);
  }

  onDrop(accepted, rejected){
    if(accepted !== null && accepted !== undefined){
      this.readTextFile(accepted[0]);
    }
    this.setState({ accepted, rejected });
  }


	readTextFile(file){
		const reader = new FileReader();
    reader.onload = () => {
        const fileAsBinaryString = reader.result;
        // do whatever you want with the file content
        let fastanContent = new ReadFASTAContent(fileAsBinaryString);
        const sequence = fastanContent.getSequence();
        this.setState({sequence});
        this.onLoadSequences(sequence);
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    reader.readAsBinaryString(file);
	};


  render() {
    let acceptedFile = null;
    if(this.state.accepted.length > 0){
      acceptedFile = (
        <aside>
          <h4 className="file-text">Archivo "{this.state.accepted[0].name}" ({this.state.accepted[0].size} bytes) cargado.</h4>
        </aside>
      );
    }

    let resultSequences =  null;
    if(this.state.sequence !== null){
      resultSequences = (
          <section className="sequences ">
            <aside className="pure-g">
              <div className="pure-u-24-24">
                <div className="sequence-container">
                  <h4 className="">{this.state.sequence.description}</h4>
                  <textarea value={this.state.sequence.payload}/>
                </div>
              </div>
            </aside>
          </section>
      );
    }else{
      resultSequences =  null;
    }

    return (
      <section id="App-UploadSequence">
        {acceptedFile}

        <div className="dropzone">
          <Dropzone
            accept=".fasta,.fast,.fa,.txt"
            className="drop-zone"
            acceptClassName="drop-zone-active"
            rejectClassName="drop-zone-reject"
            multiple={false}
            onDrop={this.onDrop}
          >

            <p>Click o arrastrar para cargar una archivo con secuencas.</p>
            <p>Solo son permitidos los archivos *.fasta, *fast o *.txt</p>
          </Dropzone>
        </div>

        {resultSequences}


      </section>
    );
  }


}

export default UploadSequence;
