import { TestBed, inject } from '@angular/core/testing';

import { FabricService } from './fabric.service';

describe('FabricService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FabricService]
    });
  });

  it('should be created', inject([FabricService], (service: FabricService) => {
    expect(service).toBeTruthy();
  }));
});
