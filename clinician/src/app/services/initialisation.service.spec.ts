import { TestBed, inject } from '@angular/core/testing';

import { InitialisationService } from './initialisation.service';

describe('InitialisationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitialisationService]
    });
  });

  it('should be created', inject([InitialisationService], (service: InitialisationService) => {
    expect(service).toBeTruthy();
  }));
});
