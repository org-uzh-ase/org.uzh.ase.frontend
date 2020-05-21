import {Movie} from './movie'

/**Representation of the quiz object received by the Quiz Microservice.*/
export class Quiz{
    /** Description of correct movie */
    description: string;
    /** All movies that were chosen to be displayed */
    answers: Movie[];
    /** Answer code of the movie that is being described */
    correctAnswer: string;
    
    constructor(description: string, movies: Movie[], correctAnswer: string){
        this.description = description;
        this.answers = movies;
        this.correctAnswer = correctAnswer;
    }
 }