import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchYearService } from './search-year.service';

describe('SearchYearService', () => {
  let service: SearchYearService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchYearService],
    });
    service = TestBed.inject(SearchYearService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies by year', () => {
    const mockResponse = [
      { id: 1, title: 'Movie 1', year: 2020, winner: true },
      { id: 2, title: 'Movie 2', year: 2020, winner: false },
    ];

    service.getMoviesByYear(2020).subscribe((response) => {
      expect(response.length).toBe(2);
      expect(response[0].title).toBe('Movie 1');
      expect(response[1].title).toBe('Movie 2');
    });

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?year=2020');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simula a resposta da API
  });

  it('should handle errors when fetching movies by year', () => {
    const errorMessage = 'Erro ao buscar filmes por ano';

    service.getMoviesByYear(2020).subscribe(
      () => fail('Deveria ter falhado com um erro'),
      (error) => {
        expect(error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?year=2020');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
