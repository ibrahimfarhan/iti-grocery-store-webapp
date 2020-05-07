import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryInHomeComponent } from './category-in-home.component';

describe('CategoryInHomeComponent', () => {
  let component: CategoryInHomeComponent;
  let fixture: ComponentFixture<CategoryInHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryInHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
