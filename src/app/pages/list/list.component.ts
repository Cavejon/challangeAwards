import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  paginatedMovies = [];
  filteredMovies = [];
  totalPages = 0;
  currentPage = 1;
  searchYear = '';
  searchTitle = '';
  winnerFilter = 'all';

  applyFilters() {
    // Implementação do filtro
  }

  changePage(page: number) {
    // Implementação da troca de página
  }
}