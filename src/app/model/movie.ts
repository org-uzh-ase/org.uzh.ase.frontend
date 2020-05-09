/**Representatin of the movie object which is part of the received {@link Quiz}.*/
export class Movie{
   poster: string;
   title: string;
   code: string;
   
   constructor(poster: string, title: string, code: string){
       this.poster = poster;
       this.title = title;
       this.code = code;
   }
}