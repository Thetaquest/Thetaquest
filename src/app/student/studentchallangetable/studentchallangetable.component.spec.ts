import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentchallangetableComponent } from './studentchallangetable.component';

describe('StudentchallangetableComponent', () => {
  let component: StudentchallangetableComponent;
  let fixture: ComponentFixture<StudentchallangetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentchallangetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentchallangetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
