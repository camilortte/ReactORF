export default class ReadFASTAContent  {

  constructor(content){
    this.content = content;
    this.sequence = {
      description: null,
      payload: ""
    };
    this.readSequences();
  }

  readSequences(){
    let lines = this.content.split('\n');
    let error = false;
    for(let i = 0;i < lines.length;i++){
      if (lines[i].indexOf('>') >= 0){
        if(this.sequence.description === null){
          this.sequence.description = lines[i].substr(1);
        }else{
          // An error occured
          error = true;
          break;
        }
      }else{
        if(lines[i] !== '' && lines[i] !== '\n'){
          // Save the payload of first sequence
          this.sequence.payload += lines[i];
        }
      }
    }

    if(error){
      this.sequence.payload = null;
    }else{
      this.sequence.payload = this.sequence.payload.replace(/\r?\n|\r/g,"");
    }
  }


  getSequence(){
    return this.sequence;
  }
}
