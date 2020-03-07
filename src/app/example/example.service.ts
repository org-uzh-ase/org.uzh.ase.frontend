import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExampleService {
    BASE_URL = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  getExample(){
      return this.http.get(this.BASE_URL + "/example");
  }
}