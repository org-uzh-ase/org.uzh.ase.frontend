import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
/**Representation of the Description of the movie we are looking for in the {@link AnswerComponent}.*/
export class QuestionComponent implements OnInit, OnChanges {

  /**Movie description provided by the {@link GameComponent}.*/
  @Input() description: string;
  /**Description might be too long and thus is split up into two columns. This attribute contains part I.*/
  description1: string;
  /**Description might be too long and thus is split up into two columns. This attribute contains part II.*/
  description2: string;
  
  constructor() { }

  ngOnInit() {
    this.updateDescriptions() }

  ngOnChanges(){
    this.updateDescriptions()
  }

  /**This method splits up the description into two parts if it's too long.*/
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
