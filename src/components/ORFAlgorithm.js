export default class ORFAlgorithm  {

  constructor(sequence){
    this.DEBUG = true;

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

  _saveFrame(ORF, frame_number, start_frame, end_frame, blank, isInverse){
    console.log("Addin:", ORF);
    let frame_dict = {
      "frame": frame_number,
      "range": [start_frame - this.GAP, end_frame - this.GAP].toString(),
      "blank": blank
    };
    frame_dict["subSequence"] = this.sequence.substring(start_frame - this.GAP, end_frame - this.GAP + 1);
    if(isInverse){
       frame_dict["subSequence"] = this.getInverseSequence(frame_dict["subSequence"]);
    }

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
    let gap = 0;
    let isInverse = false;
    switch (ORF){
      case '+3':
        current_sequence = "_" + this.sequence;
        this.GAP = 1;
        break;
      case '+2':
        current_sequence = "__" + this.sequence;
        this.GAP = 2;
        break;
      case '+1':
        current_sequence = this.sequence;
        this.GAP = 0;
        break;
      case '-1':
        current_sequence = this.reverseString(this.getInverseSequence(this.sequence));
        isInverse = true;
        this.GAP = 0;
        break;
      case '-2':
        current_sequence = "__" + this.reverseString(this.getInverseSequence(this.sequence));
        isInverse = true;
        this.GAP = 2;
        break;
      case '-3':
        current_sequence = "_" + this.reverseString(this.getInverseSequence(this.sequence));
        isInverse = true;
        this.GAP = 1;
        break;
    }
    let sections = Math.ceil(current_sequence.length / 3); // Calculate the sections of codons
    let codon_index = 0;
    let searchStart = true;
    let start_frame, end_frame; // Save index for frame
    let start_empty_frame, end_empty_frame; // save index for empty frames
    let frame_number = 0;


    // start_frame = codon_index + this.GAP;
    start_frame = null;
    end_frame = null;

    start_empty_frame = null;
    end_empty_frame = null;

    start_empty_frame = 0;
    for(let i=0;i<sections;i++){
      if(codon_index >= current_sequence.length){
        break;
      }else{
        let codon = current_sequence.substr(codon_index, 3);
        // console.log("SearchStart");
        // console.log("Check codon: ", codon, codon_index);
        // Searching Start codon
        if(searchStart){
          // console.log("SearchStart")
          for(let j=0;j<this.START_CODONS.length;j++){
            // When start codon
            if(codon === this.START_CODONS[j]){
              // console.log(">>>>>Start: ");
              if(codon_index === 0){
                start_empty_frame = null;
                end_empty_frame = null;
              }else{
                end_empty_frame = codon_index - 1;
              }
              start_frame = codon_index;
              searchStart = false;
              break;
            }
          }
        }else{
          // console.log("SearchStop");
          // console.log("Check codon: ", codon, codon_index);
          // Searching Stop codon
          for(let j=0;j<this.STOP_CODONS.length;j++){
            // When finish codon
            // console.log("Compare: ", codon , " === ", this.STOP_CODONS[j]);
            if(codon === this.STOP_CODONS[j]){
              // console.log(">>>>>End");
              searchStart = true;
              end_frame = codon_index + 2;
              start_empty_frame = end_frame + 1;
              break;
            }
          }
        }

        // console.log("\tstart_empty_frame: ", start_empty_frame);
        // console.log("\tend_empty_frame: ", end_empty_frame);
        // console.log("\tstart_frame: ", start_frame);
        // console.log("\tend_frame: ", end_frame);
        // To save empty sequence
        if(start_empty_frame !== null && end_empty_frame !== null){
          this._saveFrame(ORF, frame_number, start_empty_frame, end_empty_frame, true, isInverse);
          start_empty_frame = null;
          end_empty_frame = null;
          frame_number += 1;
        }
        if(start_frame !== null && end_frame !== null){
          // console.log("Added from: 1", start_frame, end_frame, start_empty_frame);
          this._saveFrame(ORF, frame_number, start_frame, end_frame, false, isInverse);
          start_frame = null;
          end_frame = null;
          frame_number += 1;
        }
        codon_index += 3;
      }
    }

    // when start frame but not end
    if(start_frame !== null && end_frame === null && start_empty_frame === null && end_empty_frame === null){
      // console.log("Save  from 1");
      let blank=false;
      this._saveFrame(ORF, frame_number, start_frame, current_sequence.length - 1 + this.GAP, blank, isInverse);
    }

    // When start_empty_frame and not end frame
    if(start_frame === null && end_frame === null && start_empty_frame !== null && end_empty_frame === null){
      // console.log("Save  from 2");
      let blank=true;
      this._saveFrame(ORF, frame_number, start_empty_frame, current_sequence.length - 1 + this.GAP, blank, isInverse);
    }
    // current_sequence.length - 1 - this.GAP    <!--- squence length
  }

  getInverseSequence(sequence){
    let inverseSequence = "";
    for(let i=0; i<sequence.length; i++){
      switch (sequence[i]){
        case "A":
          inverseSequence += "T";
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

  reverseString(str) {
    return str.split("").reverse().join("");
  }


}