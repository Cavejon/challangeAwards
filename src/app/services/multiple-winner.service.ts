import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface YearWinner {
  year: number;
  winnerCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class MultipleWinnerService {

  private apiUrl = 'https://challenge.outsera.tech/api/movies?projection=years-with-multiple-winners';

  constructor(private http: HttpClient) { }

  getYearsWithMultipleWinners(): Observable<{ years: YearWinner[] }> {
    return this.http.get<{ years: YearWinner[] }>(this.apiUrl);
  }
}