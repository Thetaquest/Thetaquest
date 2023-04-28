import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinChallengeComponent } from './join-challenge.component';

describe('JoinChallengeComponent', () => {
  let component: JoinChallengeComponent;
  let fixture: ComponentFixture<JoinChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
