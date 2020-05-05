import { TestBed } from '@angular/core/testing';

import { ShopServiceFacadeService } from './shop-service-facade.service';

describe('ShopServiceService', () => {
  let service: ShopServiceFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopServiceFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
