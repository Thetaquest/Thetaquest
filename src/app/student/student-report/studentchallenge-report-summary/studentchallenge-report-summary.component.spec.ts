import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentchallengeReportSummaryComponent } from './studentchallenge-report-summary.component';

describe('StudentchallengeReportSummaryComponent', () => {
  let component: StudentchallengeReportSummaryComponent;
  let fixture: ComponentFixture<StudentchallengeReportSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentchallengeReportSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentchallengeReportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
