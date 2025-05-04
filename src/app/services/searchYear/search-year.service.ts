import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
export type { SearchYear };

/**
 * Atributos do objeto
 */
interface SearchYear {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

/**
 * Serviço responsável por buscar filmes vencedores em um ano específico.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchYearService {
  private apiUrl = 'https://challenge.outsera.tech/api/search-year';

  constructor(private http: HttpClient) {}

  /**
   * Busca filmes vencedores por ano.
   * @param year Ano para buscar os filmes.
   * @returns Observable contendo os filmes vencedores.
   */
  getMoviesByYear(year: number): Observable<SearchYear[]> {
    const params = new HttpParams().set('year', year.toString());

    return this.http.get<SearchYear[]>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Erro ao buscar filmes por ano:', error);
        return throwError(() => new Error('Erro ao buscar filmes. Tente novamente mais tarde.'));
      })
    );
  }
}


