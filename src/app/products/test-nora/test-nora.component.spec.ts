import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNoraComponent } from './test-nora.component';

describe('TestNoraComponent', () => {
  let component: TestNoraComponent;
  let fixture: ComponentFixture<TestNoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
