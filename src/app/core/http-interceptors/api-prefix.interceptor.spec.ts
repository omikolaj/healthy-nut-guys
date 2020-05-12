import { ApiPrefixInterceptor } from './api-prefix.interceptor.service';
import { TestBed } from '@angular/core/testing';

describe('ApiPrefixService', () => {
  let service: ApiPrefixInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPrefixInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
