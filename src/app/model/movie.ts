/**Representatin of the movie object which is part of the received {@link Quiz}.*/
export class Movie{
    /** URL of a poster image for the movie */
    poster: string;
    /** Title of a movie */
    title: string;
    /** Anser code of a movie */
    code: string;
    
    constructor(poster: string, title: string, code: string){
        this.poster = poster;
        this.title = title;
        this.code = code;
    }
}