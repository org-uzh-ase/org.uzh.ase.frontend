import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Quiz} from './model/quiz';

@Injectable()
export class GameService {
  BASE_URL = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  getQuiz(){
    return this.http.get(this.BASE_URL + "/api/quizzes/quiz");
  }
}
