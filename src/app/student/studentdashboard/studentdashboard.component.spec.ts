import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdashboardComponent } from './studentdashboard.component';

describe('StudentdashboardComponent', () => {
  let component: StudentdashboardComponent;
  let fixture: ComponentFixture<StudentdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
