import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BgColorService } from 'src/app/services/bg-color.service';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})

export class DisplayQuizComponent implements OnInit {
  selectedQuiz;
  info;
  quiz_info;
  title;
  public error_message;
  constructor(private quizServe: QuizService,private _authService: AuthService, private _router: Router,private _bgColorService:BgColorService) {
  }

  ngOnInit(): void {
    this._bgColorService.updateBodyClass('qz-bg-blue-light')

    this.quizServe.getQuizData()
      .subscribe((res) => {
          console.log("display : success");
        this.info = JSON.parse(JSON.stringify(res));
        // console.log("INFO.DATA", this.info.data.quiz);
        this.quiz_info = this.info.data.quiz;
        this.title = this.quiz_info[0].title;

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

  logout() {
    console.log("in logout")
    this._authService.logOut();
    this._router.navigate(['/'])
  }
}
