import { TestBed, inject } from '@angular/core/testing';

import { LocalisationService } from './localisation.service';

describe('LocalisationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalisationService]
    });
  });

  it('should be created', inject([LocalisationService], (service: LocalisationService) => {
    expect(service).toBeTruthy();
  }));
});
