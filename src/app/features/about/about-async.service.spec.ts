import { TestBed } from '@angular/core/testing';

import { AboutAsyncService } from './about-async.service';

describe('AboutAsyncService', () => {
  let service: AboutAsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutAsyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
