
export class Quiz{
    title: string;
    description: string;
    category: string;
    questions = [];

    constructor(){
        this.title = '';
        this.description = '';
        this.category = 'Default';
        this.questions = [];
    }
}