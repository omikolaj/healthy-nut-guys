import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActingSpinnerComponent } from './acting-spinner.component';

describe('ActingSpinnerComponent', () => {
  let component: ActingSpinnerComponent;
  let fixture: ComponentFixture<ActingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActingSpinnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
