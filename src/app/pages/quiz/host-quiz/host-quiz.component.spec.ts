import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostQuizComponent } from './host-quiz.component';

describe('HostQuizComponent', () => {
  let component: HostQuizComponent;
  let fixture: ComponentFixture<HostQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
