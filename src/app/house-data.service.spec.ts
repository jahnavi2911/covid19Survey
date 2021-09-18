import { TestBed } from '@angular/core/testing';

import { HouseDataService } from './house-data.service';

describe('HouseDataService', () => {
  let service: HouseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
