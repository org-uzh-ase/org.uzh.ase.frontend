/**Representation of the score object received and sent to the User Microservice.*/
export class Score{
    /** User name that should get saved in the leaderboard */
    user: string;
    /** Score amount that player reached */
    scoreNo: integer;
    
    constructor(user: string, scoreNo: integer){
        this.user = user;
        this.scoreNo = scoreNo;
    }
 }