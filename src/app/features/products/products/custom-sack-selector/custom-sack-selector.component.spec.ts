import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSackSelectorComponent } from './custom-sack-selector.component';

describe('CustomSackSelectorComponent', () => {
  let component: CustomSackSelectorComponent;
  let fixture: ComponentFixture<CustomSackSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSackSelectorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSackSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
