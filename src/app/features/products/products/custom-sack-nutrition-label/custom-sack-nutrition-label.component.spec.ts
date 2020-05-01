import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSackNutritionLabelComponent } from './custom-sack-nutrition-label.component';

describe('CustomSackNutritionLabelComponent', () => {
  let component: CustomSackNutritionLabelComponent;
  let fixture: ComponentFixture<CustomSackNutritionLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSackNutritionLabelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSackNutritionLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
