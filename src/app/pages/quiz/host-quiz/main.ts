import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
      image: ['', []],
      participationRange: [0, []],
      rowsData: this.formBuilder.array([]),
      sum: [0, []], // Add the 'sum' field with an initial value of 0
      settings: this.formBuilder.group({
        isTimeOn: [true],
        isRandomQuestionsOn: [false],
        isRandomOptionsOn: [false]
      })
    });
  }

  ngOnInit(): void {
    this._bgColorService.updateBodyClass('qz-bg-blue');
    this.quizId = this._Activatedroute.snapshot.paramMap.get('quiz_id');
  }

  addRow() {
    const rowsData = this.hostQuizForm.get('rowsData') as FormArray;
    rowsData.push(new FormControl(null));
  }

  onSubmit() {
    if (this.hostQuizForm.invalid) {
      return;
    }
  
    const rowsData = this.hostQuizForm.value.rowsData;
    const sum = rowsData.reduce((acc, curr) => acc + curr, 0);
    this.hostQuizForm.patchValue({ sum });
    alert(sum);
  
    const challengeData = {
      title: this.hostQuizForm.value.title,
      description: this.hostQuizForm.value.description,
      startDatetime: this.hostQuizForm.value.startDatetime,
      endDatetime: this.hostQuizForm.value.endDatetime,
      image: this.hostQuizForm.value.image,
      participationRange: this.hostQuizForm.value.participationRange,
      rowsData: this.hostQuizForm.value.rowsData,
      sum: this.hostQuizForm.value.sum
    };
  
    this.challengeservice.createChallenge(challengeData, this.quizId).subscribe(
      (response) => {
        console.log(response);
        if (response['success']) {
          this.isSuccess = true;
          setTimeout(() => {
            this._router.navigate(['/teacherdashboard/challengetable']);
          }, 3000);
        }
      },
      (error) => {
        console.log(error);
        this.isError = true;
        this.errorMessage = error.error?.error?.message || error.message || 'Something went wrong.';
      }
    );
  
  }
  

  showEndDateTimePickerFn() {
    this.showEndDateTimePicker = true;
  }

//   onClickSave() {
//     const challengeData = {
//       title: this.hostQuizForm.value.title,
//       description: this.hostQuizForm.value.description,
//       startDatetime: this.hostQuizForm.value.startDatetime,
//       endDatetime: this.hostQuizForm.value.endDatetime,
//       image: this.hostQuizForm.value.image,
//       participationRange: this.hostQuizForm.value.participationRange,
//       rowsData: this.hostQuizForm.value.rowsData,
//       sum: this.hostQuizForm.value.sum
//     };

//     this.challengeservice.createChallenge(challengeData, this.quizId).subscribe(
//       (response) => {
//         console.log(response);
//         if (response['success']) {
//           this.isSuccess = true;
//           setTimeout(() => {
//             this._router.navigate(['/teacherdashboard/challengetable']);
//           }, 3000);
//         }
//       },
//       (error) => {
//         console.log(error);
//         this.isError = true;
//         this.errorMessage = error.error?.error?.message;
//         if (error.error instanceof ErrorEvent) {
//           this.errorMessage = `${error.error.message}`;
//         }
//         if (!this.errorMessage) {
//           if (error.status == 0 || error.status == 500) {
//             this.errorMessage = 'Something wrong at server side. Sorry for inconvenience!';
//           }
//           if (!this.errorMessage) {
//             this.errorMessage = error.message;
//           }
//         }
//       }
//     );
//   }

  logout() {
    console.log('in logout');
    this._router.navigate(['/']);
  }

  dismissErrorAlert() {
    this.isError = false;
  }

  get title() {
    return this.hostQuizForm.get('title');
  }

  get startDatetime() {
    return this.hostQuizForm.get('startDatetime');
  }

  get endDatetime() {
    return this.hostQuizForm.get('endDatetime');
  }

  get description() {
    return this.hostQuizForm.get('description');
  }

  get participationRange() {
    return this.hostQuizForm.get('participationRange');
  }

  get image() {
    return this.hostQuizForm.get('image');
  }

  get rowsData() {
    return this.hostQuizForm.get('rowsData');
  }

  get isTimeOn() {
    return this.hostQuizForm.get('isTimeOn');
  }
}
