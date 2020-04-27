import {Movie} from './movie'

export class Quiz{
    description: string;
    answers: Movie[];
    correctAnswer: string;
    
    constructor(description: string, movies: Movie[], correctAnswer: string){
        this.description = description;
        this.answers = movies;
        this.correctAnswer = correctAnswer;
    }
 }