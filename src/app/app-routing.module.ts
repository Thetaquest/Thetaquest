import { PlayerlistComponent } from './pages/challenge/challenge-report/playerlist/playerlist.component';
import { TeacherprofileComponent } from './teacher/teacherprofile/teacherprofile.component';
import { ChallengetableComponent } from './teacher/challengetable/challengetable.component';
import { QuiztableComponent } from './teacher/quiztable/quiztable.component';
import { TeacherDashboardComponent } from './teacher/teacherdashboard/teacherdashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AuthGuard } from './helpers/auth.guard';
import { CreateQuizComponent } from './pages/quiz/create-quiz/create-quiz.component';
import { HomeComponent } from './pages/home/home.component';
import { ChallengeReportComponent } from './pages/challenge/challenge-report/challenge-report.component';
import { ChallengeReportSummaryComponent } from './pages/challenge/challenge-report/challenge-report-summary/challenge-report-summary.component';
import { PlayQuizComponent } from './pages/quiz/play-quiz/play-quiz.component';
import { HostQuizComponent } from './pages/quiz/host-quiz/host-quiz.component';
import { CommonModule } from '@angular/common';
import { DisplayQuizComponent } from './pages/quiz/display-quiz/display-quiz.component';
import { StudentdashboardComponent } from './student/studentdashboard/studentdashboard.component';
import { StudentComponent } from './student/student.component';
import { JoinChallengeComponent } from './pages/challenge/join-challenge/join-challenge.component';
import { PostChallengeFeedbackComponent } from './pages/challenge/post-challenge-feedback/post-challenge-feedback.component';
import { StudentchallangetableComponent } from './student/studentchallangetable/studentchallangetable.component';
import { StudentReportComponent } from './student/student-report/student-report.component';

import { StudentchallengeReportSummaryComponent } from './student/student-report/studentchallenge-report-summary/studentchallenge-report-summary.component';
import { BuytokenComponent } from './buytoken/buytoken.component';
import { CashoutComponent } from './cashout/cashout.component'; 
import { ParticipateComponent } from './participate/participate.component'; 

const routes: Routes = [
  { path: 'buytoken', component: BuytokenComponent },
  { path: 'cashout', component: CashoutComponent },
  { path: 'participate', component: ParticipateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'quiz/create', component: CreateQuizComponent, canActivate: [AuthGuard] },
  {
    path: 'teacherdashboard', component: TeacherDashboardComponent,
    children: [
      { path: 'quiztable', component: QuiztableComponent },
      { path: 'challengetable', component: ChallengetableComponent },
      { path: 'teacherprofile', component: TeacherprofileComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'studentdashboard', component: StudentdashboardComponent,
    children: [
      { path: 'studentchallengetable', component: StudentchallangetableComponent }
      // { path: 'studentprofile', component: StudentdashboardComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'quiz/host/:quiz_id', component: HostQuizComponent, canActivate: [AuthGuard] },
  { path: 'quiz/displayQuiz', component: DisplayQuizComponent, canActivate: [AuthGuard] },
  {
    path: 'challenge/:id/reports', component: ChallengeReportComponent,
    children: [
      { path: 'summary', component: ChallengeReportSummaryComponent },
      { path: 'playerlist', component: PlayerlistComponent },

    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'challenge/:id/reports/student', component: StudentReportComponent,
    children: [
      { path: 'summary', component: StudentchallengeReportSummaryComponent },
     

    ],
    canActivate: [AuthGuard]
  },
  { path: 'challenge/join-challenge', component: JoinChallengeComponent, canActivate: [AuthGuard] },
  { path: 'challenge/:id/feedback', component: PostChallengeFeedbackComponent, canActivate: [AuthGuard] },
  { path: 'challenge/play/:gamePIN', component: PlayQuizComponent, canActivate: [AuthGuard]},
  {path:'', component: HomeComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
