import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/Question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  @Input() activeQuestion: Observable<Question>;
  _activeQuestion: Question;
  constructor() { }

  ngOnInit(): void {
    this.activeQuestion.subscribe(
      (question) => {
        //console.log("in Edit QU")
        this._activeQuestion = question;
        this._activeQuestion.questionType = "singleselect";
        //console.log(this._activeQuestion);
      }
    )
  }

  selectAnswer(event){
    let value:string = event.target.value;
    let isChecked = event.target.checked;
    isChecked ? this._activeQuestion.answers.push(value) : this._activeQuestion.answers.splice(this._activeQuestion.answers.indexOf(value), 1);

    if(this._activeQuestion.answers.length > 1){
      this._activeQuestion.questionType = "multiselect";
    }else{
      this._activeQuestion.questionType = "singleselect";
    }
    // console.log(this._activeQuestion.answers)
  }

  isOptionSelectedAsAnswer(optionNo){
    if(this._activeQuestion.answers.indexOf(optionNo) !== -1){
      return true;
    }else{
      return false;
    }
  }
}
