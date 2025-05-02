import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getProducerWinIntervals(): Observable<{ min: ProducerWinInterval[], max: ProducerWinInterval[] }> {
    return this.http.get<{ min: ProducerWinInterval[], max: ProducerWinInterval[] }>(this.apiUrl);
  }
}