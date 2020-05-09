import {Movie} from './movie'

/**Representation of the quiz object received by the Quiz Microservice.*/
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