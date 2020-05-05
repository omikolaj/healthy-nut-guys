import { TestBed } from '@angular/core/testing';

import { AboutFacadeService } from './about-facade.service';

describe('AboutFacadeService', () => {
  let service: AboutFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
