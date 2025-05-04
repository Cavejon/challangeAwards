import { TestBed } from '@angular/core/testing';

import { SearchYearService } from './search-year.service';

describe('SearchYearService', () => {
  let service: SearchYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
