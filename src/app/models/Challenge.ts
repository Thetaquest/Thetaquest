
export class Challenge{
    title: string;
    description: string;
    startDatetime: Date;
    endDatetime: Date;

    constructor(){
        this.title = '';
        this.description = '';
        this.startDatetime = null;
        this.endDatetime = null;
    }
}