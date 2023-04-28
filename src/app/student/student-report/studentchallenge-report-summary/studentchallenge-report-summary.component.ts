import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-studentchallenge-report-summary',
  templateUrl: './studentchallenge-report-summary.component.html',
  styleUrls: ['./studentchallenge-report-summary.component.scss']
})
export class StudentchallengeReportSummaryComponent implements OnInit {
  public challengeId;
  public challengeData;
  public currentDate: number;
  public endDate: any;
  a: any;
  constructor(private _Activatedroute:ActivatedRoute, private reportsservice:ReportsService) { }

  ngOnInit(): void {
    this.challengeId=this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.reportsservice.getChallengeReportPlayer(this.challengeId).subscribe(
      (res) => {
        console.log("Challnge reports: success")
        console.log(res);
        this.challengeData = res['data'];
        this.a=new Date(this.challengeData.end_date)
        this.endDate=this.a.getTime();
        console.log("END DATE "+this.a)
        console.log(this.endDate)

        const date = new Date()
        this.currentDate=date.getTime()
        console.log(this.currentDate)
      },
      (error) => {
        console.log("Challnge reports: Error")
        console.log(error);
      }
    );
  }

}
