import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProducerWinIntervalService } from './producer-win-interval.service';

describe('ProducerWinIntervalService', () => {
  let service: ProducerWinIntervalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProducerWinIntervalService],
    });
    service = TestBed.inject(ProducerWinIntervalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch producer win intervals', () => {
    const mockResponse = {
      max: [
        { producer: 'Producer A', interval: 10, previousWin: 1980, followingWin: 1990 },
      ],
      min: [
        { producer: 'Producer B', interval: 1, previousWin: 2000, followingWin: 2001 },
      ],
    };

    service.getProducerInterval().subscribe((response) => {
      expect(response.max.length).toBe(1);
      expect(response.max[0].producer).toBe('Producer A');
      expect(response.max[0].interval).toBe(10);
      expect(response.min.length).toBe(1);
      expect(response.min[0].producer).toBe('Producer B');
      expect(response.min[0].interval).toBe(1);
    });

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?projection=max-min-win-interval-for-producers');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simula a resposta da API
  });

  it('should handle errors when fetching producer win intervals', () => {
    const errorMessage = 'Erro ao buscar intervalos de vitórias dos produtores';

    service.getProducerInterval().subscribe(
      () => fail('Deveria ter falhado com um erro'),
      (error) => {
        expect(error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?projection=max-min-win-interval-for-producers');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
