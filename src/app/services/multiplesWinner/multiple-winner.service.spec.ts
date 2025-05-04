import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MultipleWinnerService } from './multiple-winner.service';

describe('MultipleWinnerService', () => {
  let service: MultipleWinnerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MultipleWinnerService],
    });
    service = TestBed.inject(MultipleWinnerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch years with multiple winners', () => {
    const mockResponse = {
      years: [
        { year: 1980, winnerCount: 2 },
        { year: 1990, winnerCount: 3 },
      ],
    };

    service.getYearsWithMultipleWinners().subscribe((response) => {
      expect(response.years.length).toBe(2);
      expect(response.years[0].year).toBe(1980);
      expect(response.years[0].winnerCount).toBe(2);
      expect(response.years[1].year).toBe(1990);
      expect(response.years[1].winnerCount).toBe(3);
    });

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?projection=years-with-multiple-winners');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simula a resposta da API
  });

  it('should handle errors when fetching years with multiple winners', () => {
    const errorMessage = 'Erro ao buscar anos com múltiplos vencedores';

    service.getYearsWithMultipleWinners().subscribe(
      () => fail('Deveria ter falhado com um erro'),
      (error) => {
        expect(error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?projection=years-with-multiple-winners');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
