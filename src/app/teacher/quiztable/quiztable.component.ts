import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { HttpClient } from '@angular/common/http';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-quiztable',
  templateUrl: './quiztable.component.html',
  styleUrls: ['./quiztable.component.scss']
})
export class QuiztableComponent implements OnInit {
  public error_message;
  public info;
  public quiz_info;
  public quiz_id: any;
  config: any;
  total;
  constructor(private _quizService: QuizService, private challengeservice: ChallengeService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.total
    };
   }

  ngOnInit() {
    this._quizService.displayQuizzes()
      .subscribe((res) => {
          console.log("display : success");
        this.info = JSON.parse(JSON.stringify(res));
        console.log("INFO.DATA", this.info.data);
        this.quiz_info = this.info.data.quiz
        this.total = this.quiz_info.length;

      },
      (err) => {
          console.log("display : Failed");
          console.log(err);
          this.error_message = err.error?.error?.message;
          if (err.error instanceof ErrorEvent) {
            // client-side error
            this.error_message = `${err.error.message}`;
          }
          if(!this.error_message){
            //console.log(err.status);

            if(err.status == 0 || err.status == 500){
              this.error_message = "Something wrong at server side. Sorry for inconvenience!"
            }
            if(!this.error_message){
              this.error_message = err.message;
            }
          }
      }
      )
  }

  QuizByID(quiz_id) {
    this._quizService.setdisplayQuizById(quiz_id);
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

}
