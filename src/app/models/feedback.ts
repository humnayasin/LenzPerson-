export class feedback{
    PId : number;
    BId : number;
    CId: number;
    CName: string 
    Comment: string;

    


    constructor(
        PId: number,
        BId: number,
        CId: number,
        CName: string,
        Comment: string,
    ) {
      this.PId = PId;
      this.BId = BId;
      this.CId = CId;
      this.CName = CName;
      this.Comment = Comment;
      
    }



}