import {Movie} from './movie'

export class Quiz{
    description: string;
    answers: Movie[];
    
    constructor(description: string, movies: Movie[]){
        this.description = description;
        this.answers = movies;
    }
 }