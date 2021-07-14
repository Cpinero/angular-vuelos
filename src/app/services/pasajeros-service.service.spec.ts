import { TestBed } from '@angular/core/testing';

import { PasajerosServiceService } from './pasajeros-service.service';

describe('PasajerosServiceService', () => {
  let service: PasajerosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasajerosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
