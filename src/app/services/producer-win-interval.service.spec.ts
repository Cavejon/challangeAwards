import { TestBed } from '@angular/core/testing';

import { ProducerWinIntervalService } from './producer-win-interval.service';

describe('ProducerWinIntervalService', () => {
  let service: ProducerWinIntervalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducerWinIntervalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
