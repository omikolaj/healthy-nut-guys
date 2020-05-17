import { TestBed } from '@angular/core/testing';

import { RedirectLoginPasswordResetService } from './redirect-login-password-reset.service';

describe('RedirectLoginPasswordResetService', () => {
  let service: RedirectLoginPasswordResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectLoginPasswordResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
