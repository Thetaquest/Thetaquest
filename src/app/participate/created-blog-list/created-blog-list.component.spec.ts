import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedBlogListComponent } from './created-blog-list.component';

describe('CreatedBlogListComponent', () => {
  let component: CreatedBlogListComponent;
  let fixture: ComponentFixture<CreatedBlogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedBlogListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
