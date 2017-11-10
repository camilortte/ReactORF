import React, { Component } from 'react';
// import './global/css/CalcORF.css';
import  ORFAlgorithm from './ORFAlgorithm';
import './global/css/CalcORF.css'

class CalcORF extends Component {

  constructor(props){
    super(props);
    this.state = {
      sequence: props.sequence,
      loadingAlgorithm: false,
      ORF_result: null,
      selectedSubSequence: null
    };

    this._onClickCalcORFButton = this._onClickCalcORFButton.bind(this);
    this._renderCalcORFButton = this._renderCalcORFButton.bind(this);
    this._calcORF = this._calcORF.bind(this);
    this._renderResultGraph = this._renderResultGraph.bind(this);
    this._renderResultData = this._renderResultData.bind(this);
    this._onClickSubSequence = this._onClickSubSequence.bind(this);
  }

  _onClickCalcORFButton(){
    if(this.state.sequence !== null){
      this._calcORF();
    }
  }

  _calcORF(){
    this.setState({loadingAlgorithm: true}, () => {
      setTimeout (() => {
        let ORFalg = new ORFAlgorithm(this.state.sequence);
        ORFalg.calcORF();
        console.log(ORFalg.ORF);
        this.setState({ORF_result: ORFalg.ORF, selectedSubSequence: ORFalg.bestCandidate, loadingAlgorithm:false});
      }, 800);
    });
  }

  render() {
    let renderCalcORFButton = null;
    if(this.state.sequence && this.state.ORF_result === null){
      renderCalcORFButton = this._renderCalcORFButton();
    }
    let resultGraph = null;
    let resultData = null;
    if(this.state.ORF_result !== null){
      resultGraph = this._renderResultGraph();
    }
    if(this.state.ORF_result !== null && this.state.selectedSubSequence !== null){
      resultData = this._renderResultData();
    }
    return(
      <div className="pure-g">
        {renderCalcORFButton}
        <section className="pure-u-24-24" style={ {boxSizing: "border-box"}}>
          {resultGraph}
          {resultData}
        </section>
      </div>
    )
  }

  _renderResultData(){
    let selectedSubSequence = this.state.selectedSubSequence;
    let isSecuence = "Si";
    if(selectedSubSequence.blank){
      isSecuence = "No";
    }
    let searchOnBlast = (
      <div>
        <form id="orfform" method="POST" action="//blast.ncbi.nlm.nih.gov/Blast.cgi" target="_blank">
          <input type="hidden" id="cmdpar" name="CMD" value="Web"/>
          <input type="hidden" name="PAGE" value="Nucleotide"/>
          <input type="hidden" id="qpar" name="QUERY" value={selectedSubSequence.subSequence}/>
          <button id="bblast" type="submit"  className={"pure-button "}> Search on BLAST</button>
        </form>
      </div>
    );
    return(
      <article className="pure-u-24-24 frame-data" >
        <div className="pure-u-12-24">
          <table className="pure-table pure-table-bordered">
            <thead>
            </thead>
            <tbody>
              <tr><th>ORF</th><td>{selectedSubSequence.ORF}</td></tr>
              <tr><th>Frame</th><td>{selectedSubSequence.frame}</td></tr>
              <tr><th>Longitud</th><td>{selectedSubSequence.length}</td></tr>
              <tr><th>Rango</th><td>[{selectedSubSequence.range}]</td></tr>
              <tr><th>Porcentaje</th><td>{Number((selectedSubSequence.percent).toFixed(1)) }%</td></tr>
              <tr><th>Secuencia</th><td>{isSecuence}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="pure-u-12-24">
          <textarea value={selectedSubSequence.subSequence}/>
          {searchOnBlast}
        </div>
      </article>
    );
  }

  _renderResultGraph(){
    let dataRender = [];
    const ORF = this.state.ORF_result;
    for (let frame in ORF) {
      let elements = [];
      for(let frame_count=0;frame_count<ORF[frame].length;frame_count++){
        let style = {
          width: ORF[frame][frame_count]['percent'] + "%",
        };
        if(ORF[frame][frame_count].blank){
          style.backgroundColor = "#aad2aa";
        }
        let element = (
            <div className={"frame-block"} key={frame+frame_count} style={style} title={"Frame: " + ORF[frame][frame_count]["frame"]} onClick={() => this._onClickSubSequence(frame, ORF[frame][frame_count]["frame"])}></div>
        );
        elements.push(element);
      }
      dataRender.push(
          (<div className="pure-u-24-24">
            <div className="pure-u-1-24">
              {frame}
            </div>
            <div className="pure-u-23-24">
              {elements}
            </div>
          </div>)
      )
    };
    return (
        <article className="pure-u-24-24" >
          {dataRender}
        </article>
    );
  }

  _onClickSubSequence(frame, index){
    this.setState({selectedSubSequence: this.state.ORF_result[frame][index]});
  }

  // Render the button
  _renderCalcORFButton(){
    if(this.sequence === null){
      return null
    }
    let btnAlignClass = "animated infinite pulse";
    let btnString = "Calcular";
    if(this.state.loadingAlgorithm){
      console.log("Rendering button align en true");
      btnString = "Cargando...";
      btnAlignClass = "animated infinite jello";
    }
    return (
      <aside className="pure-u-24-24 action-align">
        <button className={"pure-button button-warning " + btnAlignClass}
              onClick={this._onClickCalcORFButton}>{btnString}</button>
      </aside>
    )
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        sequence: nextProps.sequence,
        ORF_result: null,
        loadingAlgorithm: false
      });
    }
  }

}

export default CalcORF;
