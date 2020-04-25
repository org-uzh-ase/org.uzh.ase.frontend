import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit, OnChanges {

  @Input() description: string;
  description1: string;
  description2: string;
  
  constructor() { }

  ngOnInit() {
    this.updateDescriptions() }

  ngOnChanges(){
    this.updateDescriptions()
  }

  updateDescriptions(){
    var wordlist = this.description.split(" ");
    if(this.description.length > 450){
      var half = Math.floor(wordlist.length/2);
      this.description1 = wordlist.slice(0, half).join(" ");
      this.description2 = wordlist.slice(half, wordlist.length).join(" ");  
    }else{
      this.description1 = this.description;
      this.description2 = "";
    }
  }

}
