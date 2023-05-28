export class Challenge {
    title: string;
    description: string;
    startDatetime: Date;
    endDatetime: Date;
    image: string;
    participationRange: number;
    rowsData: number[];
    sum: number;

    constructor() {
        this.title = '';
        this.description = '';
        this.startDatetime = null;
        this.endDatetime = null;
        this.image = '';
        this.participationRange = 0;
        this.rowsData = [];
        this.sum = 0;
    }
}
