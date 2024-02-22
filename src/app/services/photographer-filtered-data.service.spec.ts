import { TestBed } from '@angular/core/testing';

import { PhotographerFilteredDataService } from './photographer-filtered-data.service';

describe('PhotographerFilteredDataService', () => {
  let service: PhotographerFilteredDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotographerFilteredDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
