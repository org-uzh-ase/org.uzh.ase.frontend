/**Representation of the score object received and sent to the User Microservice.*/
export class Score{
    user: string;
    scoreNo: integer;
    
    constructor(user: string, scoreNo: integer){
        this.user = user;
        this.scoreNo = scoreNo;
    }
 }