export class Question {
    temp_id: string;
    title: string;
    questionType: string;
    timeLimit: Number;
    maxCreditPoint: Number;
    options: {
        option1: String;
        option2: String;
        option3: String;
        option4: String;
    };
    answers= [];

    constructor(uuid: string){
        this.temp_id = uuid;
        this.timeLimit = 20;
        this.maxCreditPoint = 100;
        this.title = '';
        this.questionType = '';
        this.options = {
            option1: '',
            option2: '',
            option3: '',
            option4: ''
        }
        this.answers = [];
    }
}