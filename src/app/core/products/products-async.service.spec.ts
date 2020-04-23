import { TestBed } from '@angular/core/testing';

import { ProductsAsyncService } from './products-async.service';

describe('ProductsAsyncService', () => {
  let service: ProductsAsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsAsyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
