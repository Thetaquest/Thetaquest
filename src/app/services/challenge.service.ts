import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { Challenge } from '../models/Challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private API_URL = "http://localhost:3000"
  private createChallengeURL = this.API_URL + "/api/v1/challenge/createChallenge/"
  private DisplayChallengeURL = this.API_URL + "/api/v1/reports/viewReport"; 
  private JoinChallengeURL = this.API_URL+"/api/v1/challenge/joinChallenge";
  private playChallengeURL = this.API_URL + "/api/v1/challenge/playChallenge";
  private submitChallengeURL = this.API_URL + "/api/v1/challenge/submitChallenge/";
  private submitFeedbackURL = this.API_URL+"/api/v1/challenge/insertFeedback/";
  private DisplayStudentChallengeURL = this.API_URL + "/api/v1/reports/viewReport/student";
  private EndChallengeURL = this.API_URL +"/api/v1/challenge/endChallenge/"
  public quiz_id: any;
  public game_pin: any;
  private challenge_id;
  constructor(private _http: HttpClient) { }

  createChallenge(challenge:Challenge,quiz_id){
     console.log(challenge)
    return this._http.post(this.createChallengeURL+quiz_id,challenge);
  }

  displayChallenges(){
    return this._http.get(this.DisplayChallengeURL);
  }
  displayChallengesStudent(){
    return this._http.get(this.DisplayStudentChallengeURL);
  }

  joinChallenge(game_pin) {
    // console.log("DATA JOIN CHALLENGE", data);
    //this.game_pin = data;
    return this._http.post(this.JoinChallengeURL, {'gamePin': game_pin});
  }

  playChallenge(game_pin) {
    // console.log("DATA JOIN CHALLENGE", data);
    console.log("GAME PIN", game_pin);
    return this._http.post(this.playChallengeURL,{ 'gamePin': game_pin});
  }

  submitChallenge(data, challenge_ID) {
    console.log("DATA Submit", data);
    this.challenge_id = challenge_ID
    console.log("CHALLENGE ID IN SERVCE", challenge_ID);
    return this._http.post(this.submitChallengeURL+challenge_ID,data);
  }

  submitFeedback(data) {
    console.log("DATA Submit", data);
    console.log("CHALLENGE ID IN SUBMIT FEEDBACK SERVCE", this.challenge_id);
    return this._http.post(this.submitFeedbackURL+this.challenge_id,data);
  }

  endNowChallenge(challengeId)
  {
    this.challenge_id=challengeId
    console.log(this.EndChallengeURL+this.challenge_id)
    return this._http.post(this.EndChallengeURL+this.challenge_id,'');
  }
}
