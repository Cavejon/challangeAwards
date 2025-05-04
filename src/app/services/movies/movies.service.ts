import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


/**
 * Atributos do objeto
 */
interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

/**
 * Serviço responsável por buscar informações relacionadas a filmes.
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://challenge.outsera.tech/api/movies';
  

  constructor(private http: HttpClient) { }
  
  /**
   * Busca os filmes com paginação.
   * @param page Número da página (padrão: 0).
   * @param size Tamanho da página (padrão: 99).
   * @returns Observable contendo os filmes paginados.
   */
  getMovies(page: number = 0, size: number = 99): Observable<{ content: Movie[] }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<{ content: Movie[] }>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Erro ao buscar filmes:', error);
        return throwError(() => new Error('Erro ao buscar filmes. Tente novamente mais tarde.'));
      })
    );
  }
}