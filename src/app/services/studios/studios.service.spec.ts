import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudioService } from './studios.service';

describe('StudioService', () => {
  let service: StudioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudioService],
    });
    service = TestBed.inject(StudioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch studio winners', () => {
    const mockResponse = {
      studios: [
        { name: 'Studio A', winCount: 10 },
        { name: 'Studio B', winCount: 5 },
      ],
    };

    service.getStudioWinners().subscribe((response) => {
      expect(response.studios.length).toBe(2);
      expect(response.studios[0].name).toBe('Studio A');
      expect(response.studios[0].winCount).toBe(10);
      expect(response.studios[1].name).toBe('Studio B');
      expect(response.studios[1].winCount).toBe(5);
    });

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?projection=studios-with-win-count');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simula a resposta da API
  });

  it('should handle errors when fetching studio winners', () => {
    const errorMessage = 'Erro ao buscar estúdios vencedores';

    service.getStudioWinners().subscribe(
      () => fail('Deveria ter falhado com um erro'),
      (error) => {
        expect(error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?projection=studios-with-win-count');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
