import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/services/challenge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BgColorService } from 'src/app/services/bg-color.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {
  info;
  quiz_info;
  public error_message;
  isError;
  isSubmitted;
  gamePin;
  answers = [];
  answersToSend = [];
  challengeID;
  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  config = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private challengeServe: ChallengeService,private _router: Router,private _Activatedroute:ActivatedRoute,
    private _bgColorService: BgColorService) {
    this.error_message = '';
   }

  async ngOnInit() {
    this._bgColorService.updateBodyClass("qz-bg-blue-light");
    this.gamePin = this._Activatedroute.snapshot.paramMap.get("gamePIN");
    let isJoinedChallege = false;
    
    await this.challengeServe.joinChallenge(this.gamePin)
    .toPromise()
    .then(res => {
      console.log("Join : success");
      console.log(res);
      if(res['success']){
        isJoinedChallege = true;
      }
    }).catch(err => {
      console.log("Join : Failed");
          console.log(err);
          this.isError = true;
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
          if(this.error_message=="Already Submitted!"){
            this.error_message="Already Submitted! You will automatically redirected..."
            // this will redirect to dashboard after 3 seconds
            setTimeout(() => 
            {
              // usign /login route because, login route will decide where to redirect based on roles, if user already logged in.
              this._router.navigate(['/login']);
            },
            3000);
          }
    })
    
    if(isJoinedChallege){
      this.challengeServe.playChallenge(this.gamePin)
        .subscribe((res) => {
          //console.log("display : success");
          this.info = JSON.parse(JSON.stringify(res));
          console.log("INFO.DATA", this.info);
          this.quiz_info = this.info.data.quiz.questions;
          this.pager.count = this.info.data.question_length;
          this.challengeID = this.info.data.Challenge_ID;
          this.goTo(0);
        },
        (err) => {
            console.log("display : Failed");
            console.log(err);
            this.isError = true;
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
            //console.log(this.error_message)
        }
      )
    }
    // this.initializeTimer();
    
  }

  isCurrentQuestionLastQuestion(){
    return this.pager.index == (this.pager.count - 1);
  }

  initializeTimer(duration){
    this.config.duration = duration;
    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    this.timer = setInterval(() => { this.tick(); }, 1000);
    this.duration = this.parseTime(this.config.duration);
  }

  dismissErrorAlert(){
    this.isError = false;
  }

  tick() {
    if(!this.isSubmitted){
      const now = new Date();
      const diff = (now.getTime() - this.startTime.getTime()) / 1000;
      if (diff >= this.config.duration) {
        if(!this.isCurrentQuestionLastQuestion()){
          this.goTo(this.pager.index+1)
        }
        else{
          this.onSubmit();
          this.isSubmitted = true;
        }
      }
      this.ellapsedTime = this.parseTime(diff);
    }
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz_info) ? this.quiz_info.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelectFromMultiSelectQuestion(question, event) {
    console.log("question and answer by user", question._id, event.target.value);
    let value = event.target.value;
    let isChecked = event.target.checked;
    let pageIndex = this.pager.index;
    //var questionID = question._id;
    isChecked ? this.answers[pageIndex].answer.push(value) : this.answers[pageIndex].answer.splice(this.answers.indexOf(value), 1);
    console.log("USER ANSWERS", this.answers);

  }

  onSelectFromSingleSelectQuestion(question, event) {
    console.log("Single select question and answer by user", question._id, event.target.value);
    let value = event.target.value;
    let isChecked = event.target.checked;
    let pageIndex = this.pager.index;
    //var questionID = question._id;
    isChecked ? this.answers[pageIndex].answer = [value] : this.answers[pageIndex].answer.splice(this.answers.indexOf(value), 1);
    console.log("USER ANSWERS", this.answers);

  }


  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      console.log(this.filteredQuestions)
      this.answers.push({"question_id":this.filteredQuestions[0]._id,"answer":[]})
      this.initializeTimer(this.filteredQuestions[0]['timeLimit'])
    }
  }

  onSubmit() {
    console.log("Quiz Submitted");
    this.challengeServe.submitChallenge(this.answers, this.challengeID)
    .subscribe((res) => {
        console.log("Submit : success");
        console.log(res);
        this._router.navigate([`challenge/${this.challengeID}/feedback`]);

      },
        (err) => {
          console.log("Submit : Failed");
          console.log(err);
          this.isError = true;
          this.error_message = err.error?.error?.message;
          if (err.error instanceof ErrorEvent) {
            // client-side error
            this.error_message = `${err.error.message}`;
          }
          if (!this.error_message) {
            //console.log(err.status);

            if (err.status == 0 || err.status == 500) {
              this.error_message = "Something wrong at server side. Sorry for inconvenience!"
            }
            if (!this.error_message) {
              this.error_message = err.message;
            }
          }
        }
      )
  }

}
