import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://challenge.outsera.tech/api/movies';

  constructor(private http: HttpClient) { }

  getMovies(page: number = 0, size: number = 99): Observable<{ content: Movie[] }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<{ content: Movie[] }>(this.apiUrl, { params });
  }
}