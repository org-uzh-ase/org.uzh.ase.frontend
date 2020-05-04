import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable()
export class GameService {
  BASE_URL = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  getQuiz(level: integer){
    var tmp = this.http.get(this.BASE_URL + "/api/quizzes/quiz?level=" + level)
    .pipe(
      retry(3)
    );

    console.log(tmp);
    return tmp;
  }
}
