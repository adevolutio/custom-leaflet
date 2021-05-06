import { TestBed } from '@angular/core/testing';

import { EvoLeafletService } from './evo-leaflet.service';

describe('EvoLeafletService', () => {
  let service: EvoLeafletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvoLeafletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
