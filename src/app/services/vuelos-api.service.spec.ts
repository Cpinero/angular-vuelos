import { TestBed } from '@angular/core/testing';

import { VuelosApiService } from './vuelos-api.service';

describe('VuelosApiService', () => {
  let service: VuelosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VuelosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
