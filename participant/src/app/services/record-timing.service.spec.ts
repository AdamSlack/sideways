import { TestBed, inject } from '@angular/core/testing';

import { record-timingService } from './record-timing.service';

describe('RecordtimeingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [record-timingService]
    });
  });

  it('should be created', inject([record-timingService], (service: record-timeingService) => {
    expect(service).toBeTruthy();
  }));
});
