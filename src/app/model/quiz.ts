import {Movie} from './movie'

export class Quiz{
    description: string;
    answers: Movie[];
    correctAnswer: String;
    
    constructor(description: string, movies: Movie[], correctAnswer: String){
        this.description = description;
        this.answers = movies;
        this.correctAnswer = correctAnswer;
    }
 }