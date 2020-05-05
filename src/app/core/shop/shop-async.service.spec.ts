import { TestBed } from '@angular/core/testing';

import { ShopAsyncService } from './shop-async.service';

describe('ShopAsyncService', () => {
  let service: ShopAsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopAsyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
