import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Quiz } from '../models/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
quizData;
  private API_URL = "http://localhost:3000"
  private createQuizURL = this.API_URL + "/api/v1/quiz/createquiz";
  private DisplayQuizURL = this.API_URL + "/api/v1/teacher/profile/myQuizzes";

  receivedQuiz: EventEmitter<any>;

  constructor(private _http: HttpClient) {
    this.quizData= {};
   }

  createQuiz(quiz:Quiz){
    return this._http.post(this.createQuizURL,quiz);
  }

  displayQuizzes(){
    return this._http.get(this.DisplayQuizURL);
  }


  setdisplayQuizById(val:number) {
    this.quizData = val;
  }
  getQuizData(){

    console.log("ID", this.quizData)
    return this._http.get(this.API_URL + "/api/v1/teacher/profile/myQuizzById"+"/:" + this.quizData);
  }
  // private DisplayQuizByIdURL = this.API_URL + "/api/v1/teacher/profile/myQuizzById"+"/:" + this.quizData;

}
