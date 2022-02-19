export class Transaction{
    
    public amount : number;
    public date : string;
    public description : string;

    constructor(amount: number, date : string, description: string){
        this.amount = amount;
        this.date = date;
        this.description = description;
    }
}