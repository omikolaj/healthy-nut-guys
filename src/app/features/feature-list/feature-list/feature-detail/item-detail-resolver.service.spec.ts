import { TestBed } from '@angular/core/testing';

import { ItemDetailResolverService } from './item-detail-resolver.service';

describe('ItemDetailResolverService', () => {
  let service: ItemDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
