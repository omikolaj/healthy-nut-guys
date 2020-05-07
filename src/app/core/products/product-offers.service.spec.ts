import { TestBed } from '@angular/core/testing';

import { ProductOffersService } from './product-offers.service';

describe('ProductOffersService', () => {
  let service: ProductOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
