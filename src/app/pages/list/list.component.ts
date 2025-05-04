import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movies/movies.service';
import { SearchYear } from '../../services/searchYear/search-year.service';
import Swal from 'sweetalert2';

interface Movie {
  id: number;
  title: string;
  year: number;
  winner: boolean;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  paginatedMovies: Movie[] = [];
  filteredMovies: Movie[] = [];  
  totalPages = 0;
  currentPage = 1;
  searchTitle = '';
  winnerFilter = 'all';
  searchWinner: any;
  searchYear?: number;
  studiosByYear: SearchYear[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (response: { content: Movie[] }) => {
        this.filteredMovies = response.content;
        this.paginatedMovies = this.filteredMovies.slice(0, 15);
      },
      error: (err) => {
        console.error('Erro ao carregar os filmes:', err);
      }
    });
  }

  applyFilters(): void {
    this.filteredMovies = this.filteredMovies.filter((movie) => {
      const matchesYear = this.searchYear
        ? movie.year.toString().includes(this.searchYear.toString())
        : true;
      const matchesTitle = this.searchTitle
        ? movie.title.toLowerCase().includes(this.searchTitle.toLowerCase())
        : true;
      const matchesWinner =
        this.winnerFilter === 'all' ||
        (this.winnerFilter === 'yes' && movie.winner) ||
        (this.winnerFilter === 'no' && !movie.winner);

      return matchesYear && matchesTitle && matchesWinner;
    });

    // Atualiza a paginação
    this.paginatedMovies = this.filteredMovies.slice(
      (this.currentPage - 1) * 10,
      this.currentPage * 10
    );
  }

  changePage(page: number): void {
    // Implementação da troca de página
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