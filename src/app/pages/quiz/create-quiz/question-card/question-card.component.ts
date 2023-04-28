import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question: any;
  @Input() index: number;
  @Output() deleteQuestion = new EventEmitter<any>();
  constructor() { }

  faTrashAlt = faTrashAlt; 
  ngOnInit(): void {
  }

  onDelete() {
    console.log("IN Q-card")
    this.deleteQuestion.emit(this.question.temp_id)
  }

  checkOptionMarkedAsAnswer(optionNo){
    //console.log(this.question.answers)
    if(this.question.answers.indexOf(optionNo) !== -1){
      return 'visible';
    }else{
      return 'hidden';
    }
  }
}
