import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSubscriptionComponent } from './join-subscription.component';

describe('JoinSubscriptionComponent', () => {
  let component: JoinSubscriptionComponent;
  let fixture: ComponentFixture<JoinSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinSubscriptionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
