import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

/**
 * Atributos do objeto
 */
interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProducerWinIntervalService {

  private apiUrl = 'https://challenge.outsera.tech/api/movies?projection=max-min-win-interval-for-producers';

  constructor(private http: HttpClient) { }

  getProducerInterval(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro ao buscar intervalos de vitórias dos produtores:', error);
        return throwError(() => new Error('Erro ao buscar intervalos. Tente novamente mais tarde.'));
      })
    );
  }
}