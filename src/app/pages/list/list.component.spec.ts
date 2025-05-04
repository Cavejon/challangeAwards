import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, FormsModule], // Inclui FormsModule para suporte ao [(ngModel)]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter movies by title', () => {
    component.filteredMovies = [
      { id: 1, title: 'Movie A', year: 2020, winner: true },
      { id: 2, title: 'Movie B', year: 2021, winner: false },
    ];
    component.searchTitle = 'Movie A';
    component.applyFilters();

    expect(component.paginatedMovies.length).toBe(1);
    expect(component.paginatedMovies[0].title).toBe('Movie A');
  });

  it('should filter movies by year', () => {
    component.filteredMovies = [
      { id: 1, title: 'Movie A', year: 2020, winner: true },
      { id: 2, title: 'Movie B', year: 2021, winner: false },
    ];
    component.searchYear = 2020;
    component.applyFilters();

    expect(component.paginatedMovies.length).toBe(1);
    expect(component.paginatedMovies[0].year).toBe(2020);
  });

  it('should filter movies by winner status', () => {
    component.filteredMovies = [
      { id: 1, title: 'Movie A', year: 2020, winner: true },
      { id: 2, title: 'Movie B', year: 2021, winner: false },
    ];
    component.winnerFilter = 'yes';
    component.applyFilters();

    expect(component.paginatedMovies.length).toBe(1);
    expect(component.paginatedMovies[0].winner).toBeTrue();
  });

  it('should paginate movies', () => {
    component.filteredMovies = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Movie ${i + 1}`,
      year: 2020,
      winner: i % 2 === 0,
    }));
    component.currentPage = 2;
    component.applyFilters();

    expect(component.paginatedMovies.length).toBe(10);
    expect(component.paginatedMovies[0].title).toBe('Movie 11');
  });
});
