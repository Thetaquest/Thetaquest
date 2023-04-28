import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChallengeService } from 'src/app/services/challenge.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-challengetable',
  templateUrl: './challengetable.component.html',
  styleUrls: ['./challengetable.component.scss']
})
export class ChallengetableComponent implements OnInit {

  public error_message;
  public challenge_info: any;
  public hosted_quiz_info: any[];
  challengeid: any;
  config: any;
  total;
  constructor(private _challengeService: ChallengeService, private reportservice: ReportsService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.total
    };
  }
  public currentDate: any;

  ngOnInit() {
    this._challengeService.displayChallenges()
      .subscribe((res) => {
          console.log("display : success");
        this.challenge_info = JSON.parse(JSON.stringify (res));
        console.log("INFO.DATA", this.challenge_info[0].data);
        this.hosted_quiz_info = this.challenge_info;
        this.total = this.hosted_quiz_info.length;
        const date=new Date()
      this.currentDate=date;

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

  ChallengeByID(c_id) {
    this.challengeid=c_id
    console.log("HERE"+this.challengeid)
    //this.reportservice.setdisplayChallenegeById(this.challengeid);
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
}
