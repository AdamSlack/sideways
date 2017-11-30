import { TestBed, inject } from '@angular/core/testing';

import { AssetRetrievalService } from './asset-retrieval.service';

describe('AssetRetrievalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetRetrievalService]
    });
  });

  it('should be created', inject([AssetRetrievalService], (service: AssetRetrievalService) => {
    expect(service).toBeTruthy();
  }));
});
