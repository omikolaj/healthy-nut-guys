import { TestBed } from '@angular/core/testing';
import { SubscriptionAsyncService } from './subscription-async.service';

describe('SubscriptionAsyncService', () => {
  let service: SubscriptionAsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionAsyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
