import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogIntComponent } from './blog-int.component';

describe('BlogIntComponent', () => {
  let component: BlogIntComponent;
  let fixture: ComponentFixture<BlogIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogIntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
