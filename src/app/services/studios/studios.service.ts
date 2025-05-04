import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Atributos do objeto
 */
interface Studio {
  name: string;
  winCount: number;
}

/**
 * Serviço responsável por buscar informações relacionadas aos estúdios.
 */
@Injectable({
  providedIn: 'root'
})
export class StudioService {
  private apiUrl = 'https://challenge.outsera.tech/api/movies?projection=studios-with-win-count';

  constructor(private http: HttpClient) {}

  /**
   * Busca os estúdios com contagem de vitórias.
   * @returns Observable contendo os estúdios e suas contagens de vitórias.
   */
  getStudioWinners(): Observable<{ studios: Studio[] }> {
    return this.http.get<{ studios: Studio[] }>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro ao buscar estúdios com contagem de vitórias:', error);
        return throwError(() => new Error('Erro ao buscar estúdios. Tente novamente mais tarde.'));
      })
    );
  }
}