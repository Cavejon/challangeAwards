import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movies.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies with pagination', () => {
    const mockResponse = {
      content: [
        { id: 1, title: 'Movie 1', year: 2020, winner: true },
        { id: 2, title: 'Movie 2', year: 2021, winner: false },
      ],
    };

    service.getMovies(0, 10).subscribe((response) => {
      expect(response.content.length).toBe(2);
      expect(response.content[0].title).toBe('Movie 1');
      expect(response.content[1].title).toBe('Movie 2');
    });

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?page=0&size=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simula a resposta da API
  });

  it('should handle errors when fetching movies', () => {
    const errorMessage = 'Erro ao buscar filmes';

    service.getMovies(0, 10).subscribe(
      () => fail('Deveria ter falhado com um erro'),
      (error) => {
        expect(error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?page=0&size=10');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});