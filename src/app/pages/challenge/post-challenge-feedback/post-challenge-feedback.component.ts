import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from 'src/app/services/challenge.service';
import { LocationStrategy } from '@angular/common';
import { BgColorService } from 'src/app/services/bg-color.service';

@Component({
  selector: 'app-post-challenge-feedback',
  templateUrl: './post-challenge-feedback.component.html',
  styleUrls: ['./post-challenge-feedback.component.scss']
})
export class PostChallengeFeedbackComponent implements OnInit {

  public challengeId: string;
  error_message;
  isError;

  rating: number;
  item;
  constructor(private _Activatedroute: ActivatedRoute, private _challengeServe: ChallengeService, private _router: Router, private location: LocationStrategy,private _bgColorService:BgColorService) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
        history.pushState(null, null, window.location.href);
    });
   }

  ngOnInit(): void {
    this._bgColorService.updateBodyClass('qz-bg-blue');
    this.challengeId=this._Activatedroute.snapshot.paramMap.get("id");
    console.log("challengeId:"+this.challengeId);
  }

  ratingClicked: number;
  itemIdRatingClicked: string;

  items = [
    { 'id': 0, 'rating': 0, 'parameter': 'Question Quality' },
    { 'id': 1, 'rating': 0, 'parameter': 'Overall Experience' },
    { 'id': 2, 'rating': 0, 'parameter': 'Difficulty Level' }
  ];

  dismissErrorAlert(){
    this.isError = false;
  }

  ratingComponentClick(clickObj: any): void {
     this.item = this.items.find(((i: any) => i.id === clickObj.itemId));
    if (!!this.item) {
      this.item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = this.item.parameter;
    }
    console.log("RATING FOR PARAM :", this.items);
  }

  submitFeedback() {
    // console.log("Subm")
    this._challengeServe.submitFeedback(this.items)
      .subscribe((res) => {
        console.log("Submit : success");
        console.log(res);
        this._router.navigate(['/studentdashboard/studentchallengetable']);

      },
        (err) => {
          this.isError = true;
          console.log("Submit : Failed");
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

  skipFeedback() {
    this._router.navigate(['/studentdashboard/studentchallengetable']);
  }

}
