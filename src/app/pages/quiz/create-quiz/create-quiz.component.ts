import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Question } from 'src/app/models/Question';
import { Quiz } from 'src/app/models/Quiz';
import { BgColorService } from 'src/app/services/bg-color.service';
import { QuizService } from 'src/app/services/quiz.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  // Observable Question sources
  private activeQuestion = new BehaviorSubject<Question>(null);

  // Observable string streams
  activeQuestion$ = this.activeQuestion.asObservable();

  quiz = new Quiz()
  questions = [];

  // visual feedback related
  isError = false;
  isSuccess = false;
  errorMessage = '';
  constructor(private _bgColorService:BgColorService, private _quizService: QuizService, private _router: Router) { 
    
  }

  ngOnInit(): void {
    this._bgColorService.updateBodyClass('qz-bg-blue');
    this.addQuestion();
    document.getElementById("quizSettingsBtn").click();
  }

  onAddQuestion(){
    this.addQuestion();
  }

  onDeleteQuestion(questionTempId){
    this.deleteQuestion(questionTempId);
  }

  setActiveQuestion(question){
    this.activeQuestion.next(question);
  }

  onClickSave() {
    this.saveQuiz();
  }

  dismissErrorAlert(){
    this.isError = false;
  }

  saveQuiz(){
    this.isError = false;
    console.log("in saveQuiz")
    if(this.validateQuiz()){
      this.quiz.questions = this.questions;
      console.log(this.quiz);
      this._quizService.createQuiz(this.quiz).subscribe(
        (response) => {
          console.log(response);
          this.isSuccess = true;
          // this will redirect to login after 3 seconds
          setTimeout(() => 
          {
              this._router.navigate(['/teacherdashboard/quiztable']);
          },
          3000);
        },
        (error) => {
          console.log(error);
          this.isError = true;
          this.errorMessage = error.error?.error?.message;
          if (error.error instanceof ErrorEvent) {
            // client-side error
            this.errorMessage = `${error.error.message}`;
          }
          if(!this.errorMessage){
            //console.log(err.status);
            if(error.status == 0 || error.status == 500){
              this.errorMessage = "Something wrong at server side. Sorry for inconvenience!"
            }
            if(!this.errorMessage){
              this.errorMessage = error.message;
            }
          }
        }
      );
    }else{
      // not need to set error message. Because appropriate error message will set in validation function.
      this.isError = true;
      console.log(this.isError)
    }
  }

  getAllValuesFromObjects(_object){
    return Object.keys(_object).map(k => _object[k])
  }

  validateAllQuestions(){
    let invalidQuestionsCount = 0;
    for(let i=0;i < this.questions.length; i++){
      let _question = this.questions[i];
      let isInvalidQuestion = false;
      console.log(_question.options);
      if(_question.title == ''){
        isInvalidQuestion = true;
      }else if([...new Set(this.getAllValuesFromObjects(_question.options))].length < 3){
        isInvalidQuestion = true;
      }else if(_question.answers.length < 1){
        isInvalidQuestion = true;
      }

      if(isInvalidQuestion){
        invalidQuestionsCount++;
      }
    }
    return invalidQuestionsCount > 0 ? false : true;
  }

  validateQuiz(){
    let isQuizInvalid = false;
    if(!this.validateAllQuestions()){
      isQuizInvalid = true;
      this.errorMessage = "Some questions are invalid ! Please check the questions..."
    }else if(this.quiz.title == ''){
      isQuizInvalid = true;
      this.errorMessage = "You must enter Quiz title !"
    }
    return !isQuizInvalid;
  }

  addQuestion(){
    let newQuestion = new Question(uuid());
    this.questions.push(newQuestion);
    this.setActiveQuestion(newQuestion);
  }

  deleteQuestion(questionTempId) {
    const toDelete = new Set([questionTempId]);
    this.questions = this.questions.filter(obj => !toDelete.has(obj.temp_id));
  }

}
