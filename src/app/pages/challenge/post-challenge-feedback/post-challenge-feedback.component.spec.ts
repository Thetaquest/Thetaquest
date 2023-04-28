import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostChallengeFeedbackComponent } from './post-challenge-feedback.component';

describe('PostChallengeFeedbackComponent', () => {
  let component: PostChallengeFeedbackComponent;
  let fixture: ComponentFixture<PostChallengeFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostChallengeFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostChallengeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the feedback component', () => {
    expect(component).toBeTruthy();
  });
});
