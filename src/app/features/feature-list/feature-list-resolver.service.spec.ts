import { TestBed } from '@angular/core/testing';
import { FeatureListResolverService } from './feature-list-resolver.service';

describe('FeatureResolverService', () => {
  let service: FeatureListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
