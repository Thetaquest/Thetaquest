import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Challenge } from 'src/app/models/Challenge';
import { BgColorService } from 'src/app/services/bg-color.service';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-host-quiz',
  templateUrl: './host-quiz.component.html',
  styleUrls: ['./host-quiz.component.scss']
})
export class HostQuizComponent implements OnInit {
  quizId: string;
  hostQuizForm: any;
  showStartDateTimePicker: boolean;
  showEndDateTimePicker: boolean;
  isError = false;
  isSuccess = false;
  errorMessage = '';
  private _authService: any;

  rows: any[] = [
    { value: null },
    { value: null },
    { value: null }
  ];
  sum: number = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private challengeservice: ChallengeService,
    private _bgColorService: BgColorService,
    private _router: Router
  ) {
    this.showEndDateTimePicker = false;
    this.showStartDateTimePicker = false;
    this.hostQuizForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', []],
      startDatetime: ['', [Validators.required]],
      endDatetime: ['', [Validators.required]],
      image: ['', []], // Add the 'image' field
      settings: this.formBuilder.group({
        isTimeOn: [true],
        isRandomQuestionsOn: [false],
        isRandomOptionsOn: [false]
      })
    });
  }

  ngOnInit(): void {
    this._bgColorService.updateBodyClass("qz-bg-blue");
    this.quizId = this._Activatedroute.snapshot.paramMap.get("quiz_id");
    this.calculateSum();
  }

addRow() {
  if (this.rows.length >= 3) {
    this.rows.push({ value: null });
  }
  this.calculateSum();
}

calculateSum() {
  this.sum = this.rows.reduce((total, row) => total + Number(row.value || 0), 0);
}

onSubmit(){

}

showEndDateTimePickerFn(){
  this.showEndDateTimePicker = true;
}

onClickSave() {
  var challengeData = {
    title: this.hostQuizForm.value.title,
    description: this.hostQuizForm.value.description,
    startDatetime: this.hostQuizForm.value.startDatetime,
    endDatetime: this.hostQuizForm.value.endDatetime,
    image: this.hostQuizForm.value.image,
    rowsData: this.rows.map(row => row.value),
    sum: this.sum
  }
  
  this.challengeservice.createChallenge(challengeData, this.quizId).subscribe(
    (response) => {
      console.log(response);
      if (response['success']) {
        this.isSuccess = true;
        // this will redirect to summary page after 3 seconds
        setTimeout(() => {
          this._router.navigate(['/teacherdashboard/challengetable']);
        },
          3000);
      }
    },
    (error) => {
      console.log(error);
      this.isError = true;
      this.errorMessage = error.error?.error?.message;
      if (error.error instanceof ErrorEvent) {
        // client-side error
        this.errorMessage = `${error.error.message}`;
      }
      if (!this.errorMessage) {
        //console.log(err.status);
        if (error.status == 0 || error.status == 500) {
          this.errorMessage = "Something wrong at server side. Sorry for inconvenience!"
        }
        if (!this.errorMessage) {
          this.errorMessage = error.message;
        }
      }
    }
  );
}
logout() {
  console.log("in logout")
  this._authService.logOut();
  this._router.navigate(['/'])
}

dismissErrorAlert(){
  this.isError = false;
}

  get title(){
  return this.hostQuizForm.get('title');
}

  get startDatetime(){
  return this.hostQuizForm.get('startDatetime');
}

  get endDatetime(){
  return this.hostQuizForm.get('endDatetime');
}

  get description(){
  return this.hostQuizForm.get('description');
}

  get isTimeOn(){
  return this.hostQuizForm.get('isTimeOn');
}
}
