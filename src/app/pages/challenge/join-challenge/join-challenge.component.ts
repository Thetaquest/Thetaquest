import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
import { BgColorService } from 'src/app/services/bg-color.service';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-join-challenge',
  templateUrl: './join-challenge.component.html',
  styleUrls: ['./join-challenge.component.scss']
})
export class JoinChallengeComponent implements OnInit {
  public error_message;
  constructor(private formBuilder: FormBuilder,private challengeService: ChallengeService, private _router: Router, private _bgColorService:BgColorService) { }
  joinChallengeForm = this.formBuilder.group({
    gamePin: ['', [Validators.required] ]
  });
  ngOnInit(): void {
    this._bgColorService.updateBodyClass('qz-bg-blue')
  }


get gamePin(){
    return this.joinChallengeForm.get('gamePin');
}

  onSubmit(){
    console.log(this.joinChallengeForm.value);
    this._router.navigate(['/challenge/play/'+this.joinChallengeForm.value.gamePin]);
  }



}
