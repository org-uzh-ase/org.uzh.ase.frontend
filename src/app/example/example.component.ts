import { Component, OnInit } from '@angular/core';
import { ExampleService } from "./example.service";

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.sass']
  })
  export class ExampleComponent implements OnInit{
  
    buttonText;
    counter = 1;

    constructor(private exampleService: ExampleService){}

    ngOnInit(){
        this.getExample();
    }

    getExample(){
      this.exampleService.getExample().subscribe((data: any) => {
        console.log(data);
        this.buttonText = data.text + " I clicked the button " + this.counter + " times";
        this.counter++;
      });
    }
  }