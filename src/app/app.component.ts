import { Component, OnInit } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AsideBarComponent } from "./components/aside-bar/aside-bar.component";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movies/movies.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    RouterModule,
    RouterOutlet,
    AsideBarComponent,
    HttpClientModule,
    CommonModule, 
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
      },
      (error) => {
        console.error('Erro ao carregar filmes:', error);
      }
    );
  }
}