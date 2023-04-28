/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuiztableComponent } from './quiztable.component';

describe('QuiztableComponent', () => {
  let component: QuiztableComponent;
  let fixture: ComponentFixture<QuiztableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiztableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiztableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
