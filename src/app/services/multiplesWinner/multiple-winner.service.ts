import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Atributos do objeto
 */
interface YearWinner {
  year: number;
  winnerCount: number;
}

/**
 * Serviço responsável por buscar anos com múltiplos vencedores.
 */
@Injectable({
  providedIn: 'root'
})
export class MultipleWinnerService {
  private apiUrl = 'https://challenge.outsera.tech/api/movies?projection=years-with-multiple-winners';

  constructor(private http: HttpClient) { }

  /**
   * Busca anos com múltiplos vencedores.
   * @returns Observable contendo os anos com múltiplos vencedores.
   */
  getYearsWithMultipleWinners(): Observable<{ years: YearWinner[] }> {
    return this.http.get<{ years: YearWinner[] }>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('Erro ao buscar anos com múltiplos vencedores:', error);
        return throwError(() => new Error('Erro ao buscar anos. Tente novamente mais tarde.'));
      })
    );
  }
}