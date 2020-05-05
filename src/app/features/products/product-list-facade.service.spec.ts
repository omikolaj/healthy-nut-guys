import { TestBed } from '@angular/core/testing';

import { ProductListFacadeService } from './product-list-facade.service';

describe('ProductListFacadeService', () => {
  let service: ProductListFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductListFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
