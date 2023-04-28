import { ReportsService } from 'src/app/services/reports.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss']
})
export class PlayerlistComponent implements OnInit {
  public players=[];
  info: any;
  error_message: any;
  public player_info: any;
  public doughnutChartLabels:any = ['Wrong answers', 'Correct answers'];
  public doughnutChartData:any =[];
  public doughnutChartType:any = 'doughnut';
  public  doughnutColors=
  [{ backgroundColor: ["#8B0000", "#006400"] }];
  index: any;
  
  public challengeId: string;
  constructor(private reportsservice:ReportsService,private _Activatedroute:ActivatedRoute) { }


  ngOnInit() {
    this.challengeId=this._Activatedroute.parent.snapshot.paramMap.get("id");
    //console.log(this.challengeId)
    this.reportsservice.getPlayers(this.challengeId)
      .subscribe((res) => {
        //console.log("display : success");
        this.info = JSON.parse(JSON.stringify(res));
  
        let chartdata=[] 
        this.info.forEach(function(obj) {
          chartdata.push(obj.data.wrong_answers);
          chartdata.push(obj.data.correct_answers); 
          
        });
        this.doughnutChartData=chartdata
        //console.log("INFO.DATA", this.info);
        

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
  }


