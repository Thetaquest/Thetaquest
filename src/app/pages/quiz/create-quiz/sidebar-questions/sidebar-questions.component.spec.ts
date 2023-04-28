import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarQuestionsComponent } from './sidebar-questions.component';

describe('SidebarQuestionsComponent', () => {
  let component: SidebarQuestionsComponent;
  let fixture: ComponentFixture<SidebarQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
