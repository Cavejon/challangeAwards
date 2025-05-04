import { TestBed } from '@angular/core/testing';

import { MultipleWinnerService } from './multiple-winner.service';

describe('MultipleWinnerService', () => {
  let service: MultipleWinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleWinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
