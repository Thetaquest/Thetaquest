import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from 'src/app/services/challenge.service';
import { ReportsService } from 'src/app/services/reports.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-challenge-report-summary',
  templateUrl: './challenge-report-summary.component.html',
  styleUrls: ['./challenge-report-summary.component.scss']
})
export class ChallengeReportSummaryComponent implements OnInit {

  public challengeId;
  public challengeData;
  public gameURL;
  public numberOfPlayer;
  info: any;
  feedbackinfo: any;
  public NamesData: string[] = [];
  public scoreChartData: any = [];
  public correctanswers: any = [];
  public wronganswers: any = [];
  error_message: any;
  public avgcorrectans;
  public avgwrongans;

  public val1 = "11%";


  barchart;
  linechart;
  doughnutchart1;
  doughnutchart2;
  doughnutchart3;

  public totalfeedbacks;
  public difficultyLevel;
  public overallExperience;
  public questionQuality;


  data1 = [];
  constructor(private _Activatedroute:ActivatedRoute, private reportsservice:ReportsService,
    private challengeservice:ChallengeService) { }

  ngOnInit(): void{
    //getting challenge id
    this.challengeId = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.reportsservice.getChallengeReport(this.challengeId).subscribe(
      (res) => {
        console.log("Challnge reports: success")
        console.log(res);
        this.challengeData = res['data'];
        this.gameURL = `http://localhost:4200/challenge/play/${this.challengeData.game_pin}`
        this.numberOfPlayer = this.challengeData['numberOfPlayers'];
      },
      (error) => {
        console.log("Challnge reports: Error")
        console.log(error);
      }
    );

    //getting feedback data
    this.reportsservice.getfeedbackdata(this.challengeId).subscribe(
      (res) => {
        // console.log("Printing feedback data",res);
        let temptotalfeedbacks;
        let tempdifficultyLevel;
        let tempoverallExperience;
        let tempquestionQuality;
        this.feedbackinfo = JSON.parse(JSON.stringify(res));
        console.log("Printing feedback data");
        console.log(this.feedbackinfo.data.fetchedData);
        temptotalfeedbacks = this.feedbackinfo.data.fetchedData.totalFeedbacks;
        tempdifficultyLevel = this.feedbackinfo.data.fetchedData.totalRatings.difficultyLevel;
        tempoverallExperience = this.feedbackinfo.data.fetchedData.totalRatings.overallExperience;
        tempquestionQuality = this.feedbackinfo.data.fetchedData.totalRatings.questionQuality;
        this.totalfeedbacks=temptotalfeedbacks;
        this.difficultyLevel=tempdifficultyLevel;
        this.overallExperience=tempoverallExperience;
        this.questionQuality=tempquestionQuality;
        console.log("total feedbacks", this.totalfeedbacks);
        console.log("Difficulty level", this.difficultyLevel);
        console.log("overallExperience", this.overallExperience);
        console.log("questionQuality", this.questionQuality);
      },
      (error) => {
        console.log("Feedback Data: Error")
        console.log(error);
      }
    );

    //getting the playerlist
    this.reportsservice.getPlayers(this.challengeId)
      .subscribe((res) => {
        //console.log("display : success");
        this.info = JSON.parse(JSON.stringify(res));
        console.log("This is info", this.info);
        let chartdata = [];
        let scoredata = [];
        let correctansdata = [];
        let wrongansdata = [];
        this.info.forEach(function (obj) {
          chartdata.push(obj.data.player_name);
          scoredata.push(obj.data.score);
          correctansdata.push(obj.data.correct_answers);
          wrongansdata.push(obj.data.wrong_answers);
        });
        for (let i = 0; i < chartdata.length; i++) {
          this.NamesData.push(chartdata[i]);
          this.scoreChartData.push(scoredata[i]);
          this.correctanswers.push(correctansdata[i]);
          this.wronganswers.push(wrongansdata[i]);
        }
        this.generatebargraph();
        this.generatelinegraph();
        this.calculateaveragedata();
        this.generatequestionqualitycharts();
        this.generateoverallexperiencecharts();
        this.generatedifficultylevelchart();
         console.log("barchart",this.NamesData);
         console.log("scorechart",this.scoreChartData);
      },
        (err) => {
          console.log("display : Failed");
          console.log(err);
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
  generatebargraph(){

    //bar chart
    this.barchart = new Chart('bar', {
      type: 'bar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Bar Chart'
        },
      },
      data: {
        labels: this.NamesData,
        datasets: [
          {
            type: 'bar',
            label: 'Points scored',
            data: this.scoreChartData,
            backgroundColor: "#3e95cd",
            // backgroundColor: 'rgba(51,204,255,1)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false,
          },
        ]
      }
    });

  }

  generatelinegraph() {
    this.linechart = new Chart('line', {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Line Chart'
        },
      },
      data: {
        labels: this.NamesData,
        datasets: [{
          data: this.correctanswers,
          label: "Correct answers",
          borderColor: "#3cba9f",
          fill: false
        }, {
          data: this.wronganswers,
          label: "Wrong answers ",
          borderColor: "#c45850",
          fill: false
        }
        ]
      }
    });

  }
  calculateaveragedata() {
    var no = this.NamesData.length;
    var tempcorrectsum = 0;
    var tempwrongsum = 0;
    for (var i = 0; i < this.correctanswers.length; i++) {
      tempcorrectsum = tempcorrectsum + this.correctanswers[i];
    }

    for (var j = 0; j < this.wronganswers.length; j++) {
      tempwrongsum = tempwrongsum + this.wronganswers[j];
    }

    this.avgcorrectans = tempcorrectsum / no;
    this.avgwrongans = tempwrongsum / no;
    // console.log(this.avgcorrectans);
    // console.log(this.avgwrongans);
  }

  generatequestionqualitycharts() {
    let no =Math.floor(((this.questionQuality/this.totalfeedbacks)/5)*100);
    let val2 = no+"%";
    let val3=Math.floor(this.questionQuality/this.totalfeedbacks)+"/5";

    this.doughnutchart1 = new Chart('doughnut1', {
      type: 'doughnut',
      plugins: [{
        beforeDraw: function (chart) {
          var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = val3,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
          ctx.fillStyle="#fff";
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }],
      options: {
        responsive: true,
        cutoutPercentage: 80,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      data: {
        // labels: ["percentage"],
        datasets: [
          {
             // label: "feedback",
            backgroundColor: ["rgb(252, 248, 6)", "#115FBA"],
            borderColor: ["rgb(252, 248, 6)", "#115FBA"],
            data: [this.questionQuality/this.totalfeedbacks,5-(this.questionQuality/this.totalfeedbacks)]
          }
        ]
      }
    });
  }

  generateoverallexperiencecharts() {
    let no =Math.floor(((this.overallExperience/this.totalfeedbacks)/5)*100);
    let val2 = no+"%";
    let val3=Math.floor(this.overallExperience/this.totalfeedbacks)+"/5";
    this.doughnutchart2 = new Chart('doughnut2', {
      type: 'doughnut',
      plugins: [{
        beforeDraw: function (chart) {
          var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = val3,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
          ctx.fillStyle="#fff";
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }],
      options: {
        responsive: true,
        cutoutPercentage: 80,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      data: {
        // labels: ["percentage"],
        datasets: [
          {
             // label: "feedback",
            backgroundColor: ["rgb(252, 248, 6)", "#115FBA"],
            borderColor: ["rgb(252, 248, 6)", "#115FBA"],
            data: [this.overallExperience/this.totalfeedbacks,5-(this.overallExperience/this.totalfeedbacks)]
          }
        ]
      }
    });

  }

  generatedifficultylevelchart() {
    let no =Math.floor(((this.difficultyLevel/this.totalfeedbacks)/5)*100);
    let val2 = no+"%";
    let val3=Math.floor(this.difficultyLevel/this.totalfeedbacks)+"/5";
    this.doughnutchart3 = new Chart('doughnut3', {
      type: 'doughnut',
      plugins: [{
        beforeDraw: function (chart) {
          var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = val3,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
          ctx.fillStyle="#fff";
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }],
      options: {
        responsive: true,
        cutoutPercentage: 80,
        animation: {
          animateScale: true,
          animateRotate: true,
          onComplete: function () {
          }
        }
      },
      data: {
        // labels: ["percentage"],
        datasets: [
          {
            // label: "feedback",
            backgroundColor: ["rgb(252, 248, 6)", "#115FBA"],
            borderColor: ["rgb(252, 248, 6)", "#115FBA"],
            data: [this.difficultyLevel/this.totalfeedbacks,5-(this.difficultyLevel/this.totalfeedbacks)]
          }
        ]
      }
    });

  }
    
  endChallenge()
  {
     this.challengeservice.endNowChallenge(this.challengeId).subscribe(
      (res) => {
        console.log("Challnge reports: success")
        console.log(res);
        //this.challengeData = res['data'];
      },
      (error) => {
        console.log("Challnge reports: Error")
        console.log(error);
      }
    );
  }
}
    /*his.c_id=this.challengeId
    console.log(this.c_id)
    this.challengeservice.endNowChallenge(this.challengeId)*/
    //getting the playerlist
    
 
  


