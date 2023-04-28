import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BgColorService } from 'src/app/services/bg-color.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
  public challengeId;
  public challengeData;
  public currentDate: number;
  public endDate: any;
  constructor(private _bgColorService:BgColorService, private _authService: AuthService, private _router: Router, private reportsservice:ReportsService,
    private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._bgColorService.updateBodyClass('qz-bg-blue-light');
    this.challengeId=this._Activatedroute.snapshot.paramMap.get("id");
    this.reportsservice.getChallengeReport(this.challengeId).subscribe(
      (res) => {
        console.log("Challnge reports: success")
        console.log(res);
        this.challengeData = res['data'];
        this.endDate=this.challengeData.end_time.getTime();
        const date = new Date()
        this.currentDate=date.getTime()
      },
      (error) => {
        console.log("Challnge reports: Error")
        console.log(error);
      }
    );
  }

  logout() {
    console.log("in logout")
    this._authService.logOut();
    this._router.navigate(['/login'])
  }

}
