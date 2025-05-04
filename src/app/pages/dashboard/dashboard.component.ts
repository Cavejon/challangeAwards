import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
// Services
import { MovieService } from '../../services/movies/movies.service';
import { MultipleWinnerService } from '../../services/multiplesWinner/multiple-winner.service';
import { StudioService } from '../../services/studios/studios.service';
import { ProducerWinIntervalService } from '../../services/producer/producer-win-interval.service';
import { SearchYear, SearchYearService } from '../../services/searchYear/search-year.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  movies: { year: number; winnerCount: number }[] = [];
  studios: { name: string; winCount: number }[] = [];
  producerIntervalsMin: { producer: string; interval: number; previousWin: number; followingWin: number }[] = [];
  producerIntervalsMax: { producer: string; interval: number; previousWin: number; followingWin: number }[] = [];
  searchYear?: number;
  studiosByYear: SearchYear[] = [];

  constructor(
    private multipleWinnerService: MultipleWinnerService,
    private studioService: StudioService,
    private producerIntervalService: ProducerWinIntervalService,
    private searchYearService: SearchYearService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loadYearsWithMultipleWinners();
    this.loadStudioWinners();
    this.loadProducerInterval();
  }

  loadYearsWithMultipleWinners(): void {
    this.multipleWinnerService.getYearsWithMultipleWinners().subscribe({
      next: (response: { years: { year: number; winnerCount: number }[] }) => {
        console.log('API Response (Years with Multiple Winners):', response);
        this.movies = response.years.map((yearWinner) => ({
          year: yearWinner.year,
          winnerCount: yearWinner.winnerCount
        }));
        console.log('Movies:', this.movies);
      },
      error: (err) => {
        console.error('Erro ao carregar os anos com múltiplos vencedores:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Ocorreu um erro ao carregar os anos com múltiplos vencedores. Tente novamente mais tarde.',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  loadStudioWinners(): void {
    this.studioService.getStudioWinners().subscribe({
      next: (response) => {
        this.studios = response.studios
          .sort((a: { winCount: number }, b: { winCount: number }) => b.winCount - a.winCount)
          .slice(0, 3);
      },
      error: (err) => {
        console.error('Erro ao carregar os estúdios vencedores:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Ocorreu um erro ao carregar os estúdios vencedores. Tente novamente mais tarde.',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  loadProducerInterval(): void {
    this.producerIntervalService.getProducerInterval().subscribe({
      next: (response) => {
        this.producerIntervalsMax = response.max || [];
        this.producerIntervalsMin = response.min || [];
      },
      error: (err) => {
        console.error('Erro ao carregar intervalo dos produtores:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Ocorreu um erro ao carregar os intervalos dos produtores. Tente novamente mais tarde.',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  loadStudioWinnersByYear(year: number): void {
    const pageSize = 100;
    let allMovies: any[] = [];

    const fetchPage = (page: number) => {
      this.movieService.getMovies(page, pageSize).subscribe({
        next: (response) => {
          if (response.content.length > 0) {
            allMovies = allMovies.concat(response.content);
            fetchPage(page + 1);
          } else {
            this.studiosByYear = allMovies.filter(
              movie => movie.winner && movie.year === year
            );

            if (this.studiosByYear.length === 0) {
              Swal.fire({
                icon: 'info',
                title: 'Nenhum filme encontrado',
                text: `Não foram encontrados filmes vencedores para o ano ${year}.`,
                confirmButtonText: 'Ok'
              });
            }
          }
        },
        error: (err) => {
          console.error('Erro ao buscar filmes:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao buscar os filmes. Tente novamente mais tarde.',
            confirmButtonText: 'Ok'
          });
        }
      });
    };

    fetchPage(0);
  }
}



