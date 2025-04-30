import { Component } from '@angular/core';
import { NavComponent } from './shared/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, DashboardComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
