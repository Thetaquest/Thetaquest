import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIntComponent } from './create-int.component';

describe('CreateIntComponent', () => {
  let component: CreateIntComponent;
  let fixture: ComponentFixture<CreateIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
