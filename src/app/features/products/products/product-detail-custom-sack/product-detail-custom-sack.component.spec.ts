import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailCustomSackComponent } from './product-detail-custom-sack.component';

describe('ProductDetailCustomSackComponent', () => {
  let component: ProductDetailCustomSackComponent;
  let fixture: ComponentFixture<ProductDetailCustomSackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailCustomSackComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailCustomSackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
