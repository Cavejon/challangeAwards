import { Component, OnInit } from '@angular/core';
import { NavComponent } from './shared/nav/nav.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AsideBarComponent } from "./shared/aside-bar/aside-bar.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MovieService } from './services/movies.service';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ListComponent } from "./pages/list/list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    RouterModule,
    RouterOutlet,
    AsideBarComponent,
    CommonModule,
    DashboardComponent,
    ListComponent,
    FormsModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies(0, 99).subscribe(
      (response) => {
        this.movies = response.content;
        console.log(this.movies);
      },
      (error) => {
        console.error('Erro ao carregar filmes:', error);
      }
    );
  }
}