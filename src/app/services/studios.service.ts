import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Studio {
  name: string;
  winCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudioService {

  private apiUrl = 'https://challenge.outsera.tech/api/movies?projection=studios-with-win-count';

  constructor(private http: HttpClient) { }

  getStudioWinners(): Observable<{ studios: Studio[] }> {
    return this.http.get<{ studios: Studio[] }>(this.apiUrl);
  }
}