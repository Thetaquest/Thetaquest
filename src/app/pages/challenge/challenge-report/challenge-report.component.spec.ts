import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeReportComponent } from './challenge-report.component';

describe('ChallengeReportComponent', () => {
  let component: ChallengeReportComponent;
  let fixture: ComponentFixture<ChallengeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
