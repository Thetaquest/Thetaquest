import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeReportSummaryComponent } from './challenge-report-summary.component';

describe('ChallengeReportSummaryComponent', () => {
  let component: ChallengeReportSummaryComponent;
  let fixture: ComponentFixture<ChallengeReportSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeReportSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeReportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
