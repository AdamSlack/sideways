import { TestBed, inject } from '@angular/core/testing';

import { TestDealerService } from './test-dealer.service';

describe('TestDealerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestDealerService]
    });
  });

  it('should be created', inject([TestDealerService], (service: TestDealerService) => {
    expect(service).toBeTruthy();
  }));
});
