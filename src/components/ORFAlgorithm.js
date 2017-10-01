export default class ORFAlgorithm  {

  constructor(sequence){
    this.DEBUG = false;

    this.sequence = sequence;
    this.sequence_length = sequence.length;
    this.START_CODONS = ['ATG'];
    this.STOP_CODONS = ['TAA', 'TAG', 'TGA'];
    this.GAP = 0;
    this.ORF = {
      "+3": [], // [ { frame: 1, range: [0,10], read: blank } ]
      "+2": [], // { 1:{ range: [11,20], read: CONTENT}}
      "+1": [],
      "-1": [],
      "-2": [],
      "-3": [],
    };
    this.bestCandidate = null;
  }

  _saveFrame(ORF, frame_number, start_frame, end_frame, blank){
    console.log("Addin:", ORF);
    let frame_dict = {
      "frame": frame_number,
      "range": [start_frame - this.GAP, end_frame - this.GAP].toString(),
      "blank": blank
    };
    frame_dict["subSequence"] = this.sequence.substring(start_frame - this.GAP, end_frame - this.GAP + 1);

    frame_dict["length"] = frame_dict.subSequence.length;
    frame_dict["percent"] = (frame_dict["length"]  * 100) / this.sequence_length;
    frame_dict["ORF"] = ORF;
    if(this.bestCandidate === null){
      this.bestCandidate = frame_dict
    }else if(this.bestCandidate.length < frame_dict.length){
      this.bestCandidate = frame_dict;
    }
    this.ORF[ORF].push(frame_dict);
  }

  readSequence(ORF){
    let current_sequence = null;
    switch (ORF){
      case '+3':
        current_sequence = "__" + this.sequence;
        this.GAP = 2;
        break;
      case '+2':
        current_sequence = "_" + this.sequence;
        this.GAP = 1;
        break;
      case '+1':
        current_sequence = this.sequence;
        this.GAP = 0;
        break;
      case '-1':
        current_sequence = this.getInverseSequence(this.sequence);
        this.GAP = 0;
        break;
      case '-2':
        current_sequence = "_" + this.getInverseSequence(this.sequence);
        this.GAP = 1;
        break;
      case '-3':
        current_sequence = "__" + this.getInverseSequence(this.sequence);
        this.GAP = 0;
        break;
    }
    let sections = Math.ceil(current_sequence.length / 3); // Calculate the sections of codons
    let codon_start = 0;
    let searchStart = true;
    let start_frame = null;
    let end_frame = null;
    let frame_number = 0;
    let start_empty_frame;

    // start_frame = codon_start + this.GAP;
    start_frame = null;
    start_empty_frame = null;

    for(let i=0;i<sections;i++){
      if(codon_start >= current_sequence.length){
        break;
      }else{
        let codon = current_sequence.substr(codon_start, 3);
        // console.log("Check codon: ", codon, codon_start);
        // Searching Start codon
        if(searchStart){
          // console.log("SearchStart")
          for(let j=0;j<this.START_CODONS.length;j++){
            // When start codon
            if(codon === this.START_CODONS[j]){
              // console.log("Entre en Start");
              if(start_empty_frame !== null){
                end_frame = codon_start - 1;
              }
              start_frame = codon_start;
              searchStart = false;
              break;
            }else if(start_empty_frame === null){
              start_empty_frame = codon_start + this.GAP;
            }
          }
        }else{
          // console.log("no SearchStart")
          // Searching Stop codon
          for(let j=0;j<this.STOP_CODONS.length;j++){
            // When finish codon
            // console.log("Compare: ", codon , " === ", this.STOP_CODONS[j]);
            if(codon === this.STOP_CODONS[j]){
              // console.log("Entre en End");
              // console.log("Find stop");
              searchStart = true;
              end_frame = codon_start + 2;
              break;
            }
          }
        }
        codon_start += 3;
        if(start_frame !== null && end_frame !== null && start_empty_frame === null){
          // console.log("Added from: 1", start_frame, end_frame, start_empty_frame);
          this._saveFrame(ORF, frame_number, start_frame, end_frame, !searchStart);
          start_frame = end_frame + 1;
          end_frame = null;
          frame_number += 1;
        }
        if(start_frame !== null && end_frame !== null && start_empty_frame !== null){
          // console.log("Added from: 2", start_frame, end_frame, start_empty_frame);
          this._saveFrame(ORF, frame_number, start_empty_frame, end_frame, !searchStart);
          start_empty_frame = null;
          end_frame = null;
          frame_number += 1;
        }
      }
    }

    if(start_frame === null && end_frame === null && start_empty_frame !== null){
      let blank=true;
      this._saveFrame(ORF, frame_number, 0, current_sequence.length - 1, blank);
    }
    if(start_frame !== null && end_frame === null){
      let blank=true;
      if(!searchStart){
        blank=false;
      }
      this._saveFrame(ORF, frame_number, start_frame, current_sequence.length - 1, blank);
    }
    // current_sequence.length - 1 - this.GAP    <!--- squence length
  }

  getInverseSequence(sequence){
    let inverseSequence = "";
    for(let i=0; i<sequence.length; i++){
      switch (sequence[i]){
        case "A":
          inverseSequence += "G";
          break;
        case "G":
          inverseSequence += "C";
          break;
        case "C":
          inverseSequence += "G";
          break;
        case "T":
          inverseSequence += "A";
          break;
      }
    }
    return inverseSequence;
  }

  printORFResult(){
    console.log(this.ORF);
  }

  calcORF(){
    this.readSequence("+3");
    this.readSequence("+2");
    this.readSequence("+1");
    this.readSequence("-1");
    this.readSequence("-2");
    this.readSequence("-3");
  }


}