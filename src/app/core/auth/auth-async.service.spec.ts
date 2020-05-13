import { TestBed } from '@angular/core/testing';
import { AuthAsyncService } from './auth-async.service';

describe('AuthAsyncService', () => {
  let service: AuthAsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAsyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
