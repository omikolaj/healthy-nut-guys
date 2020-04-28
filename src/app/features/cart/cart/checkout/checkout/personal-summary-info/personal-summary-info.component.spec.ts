import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSummaryInfoComponent } from './personal-summary-info.component';

describe('PersonalSummaryInfoComponent', () => {
  let component: PersonalSummaryInfoComponent;
  let fixture: ComponentFixture<PersonalSummaryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalSummaryInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSummaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
