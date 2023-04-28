import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuytokenComponent } from './buytoken.component';

describe('BuytokenComponent', () => {
  let component: BuytokenComponent;
  let fixture: ComponentFixture<BuytokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuytokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuytokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
