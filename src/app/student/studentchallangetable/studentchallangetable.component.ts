import { Component, OnInit } from '@angular/core';
import { BgColorService } from 'src/app/services/bg-color.service';
import { ChallengeService } from 'src/app/services/challenge.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-studentchallangetable',
  templateUrl: './studentchallangetable.component.html',
  styleUrls: ['./studentchallangetable.component.scss']
})
export class StudentchallangetableComponent implements OnInit {
  public error_message;
  public challenge_info: any;
  public hosted_quiz_info: any[];
  public oneDay = 24 * 60 * 60 * 1000;
  challengeid: any;
  public currentDate: any;
  constructor(private _challengeService: ChallengeService,private reportservice:ReportsService,private _bgColorService:BgColorService) { }

  ngOnInit(): void {
    this._bgColorService.updateBodyClass('qz-bg-blue-light')
    this._challengeService.displayChallengesStudent()
    .subscribe((res) => {
        console.log("display : success");
      this.challenge_info = JSON.parse(JSON.stringify (res));
      console.log("INFO.DATA", this.challenge_info[0].data);
      this.hosted_quiz_info = this.challenge_info;
      const date=new Date()
      this.currentDate=date;
      console.log("currentdate"+this.currentDate)
      console.log("end date"+this.hosted_quiz_info[0].data.end_date)

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

}
