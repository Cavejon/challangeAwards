import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { MultipleWinnerService } from '../../services/multiplesWinner/multiple-winner.service';
import { StudioService } from '../../services/studios/studios.service';
import { ProducerWinIntervalService } from '../../services/producer/producer-win-interval.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let multipleWinnerServiceSpy: jasmine.SpyObj<MultipleWinnerService>;
  let studioServiceSpy: jasmine.SpyObj<StudioService>;
  let producerWinIntervalServiceSpy: jasmine.SpyObj<ProducerWinIntervalService>;

  beforeEach(async () => {
    const multipleWinnerSpy = jasmine.createSpyObj('MultipleWinnerService', ['getYearsWithMultipleWinners']);
    const studioSpy = jasmine.createSpyObj('StudioService', ['getStudioWinners']);
    const producerSpy = jasmine.createSpyObj('ProducerWinIntervalService', ['getProducerInterval']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: MultipleWinnerService, useValue: multipleWinnerSpy },
        { provide: StudioService, useValue: studioSpy },
        { provide: ProducerWinIntervalService, useValue: producerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    multipleWinnerServiceSpy = TestBed.inject(MultipleWinnerService) as jasmine.SpyObj<MultipleWinnerService>;
    studioServiceSpy = TestBed.inject(StudioService) as jasmine.SpyObj<StudioService>;
    producerWinIntervalServiceSpy = TestBed.inject(ProducerWinIntervalService) as jasmine.SpyObj<ProducerWinIntervalService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load years with multiple winners on init', () => {
    const mockResponse = { years: [{ year: 1980, winnerCount: 2 }] };
    multipleWinnerServiceSpy.getYearsWithMultipleWinners.and.returnValue(of(mockResponse));

    component.loadYearsWithMultipleWinners();

    expect(multipleWinnerServiceSpy.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(component.movies.length).toBe(1);
    expect(component.movies[0].year).toBe(1980);
  });

  it('should handle error when loading years with multiple winners', () => {
    multipleWinnerServiceSpy.getYearsWithMultipleWinners.and.returnValue(throwError(() => new Error('Erro ao carregar')));

    component.loadYearsWithMultipleWinners();

    expect(multipleWinnerServiceSpy.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(component.movies.length).toBe(0);
  });

  it('should load studio winners', () => {
    const mockResponse = { studios: [{ name: 'Studio A', winCount: 10 }] };
    studioServiceSpy.getStudioWinners.and.returnValue(of(mockResponse));

    component.loadStudioWinners();

    expect(studioServiceSpy.getStudioWinners).toHaveBeenCalled();
    expect(component.studios.length).toBe(1);
    expect(component.studios[0].name).toBe('Studio A');
  });

  it('should handle error when loading studio winners', () => {
    studioServiceSpy.getStudioWinners.and.returnValue(throwError(() => new Error('Erro ao carregar')));

    component.loadStudioWinners();

    expect(studioServiceSpy.getStudioWinners).toHaveBeenCalled();
    expect(component.studios.length).toBe(0);
  });

  it('should load producer intervals', () => {
    const mockResponse = {
      max: [{ producer: 'Producer A', interval: 10, previousWin: 1980, followingWin: 1990 }],
      min: [{ producer: 'Producer B', interval: 1, previousWin: 2000, followingWin: 2001 }],
    };
    producerWinIntervalServiceSpy.getProducerInterval.and.returnValue(of(mockResponse));

    component.loadProducerInterval();

    expect(producerWinIntervalServiceSpy.getProducerInterval).toHaveBeenCalled();
    expect(component.producerIntervalsMax.length).toBe(1);
    expect(component.producerIntervalsMin.length).toBe(1);
    expect(component.producerIntervalsMax[0].producer).toBe('Producer A');
    expect(component.producerIntervalsMin[0].producer).toBe('Producer B');
  });

  it('should handle error when loading producer intervals', () => {
    producerWinIntervalServiceSpy.getProducerInterval.and.returnValue(throwError(() => new Error('Erro ao carregar')));

    component.loadProducerInterval();

    expect(producerWinIntervalServiceSpy.getProducerInterval).toHaveBeenCalled();
    expect(component.producerIntervalsMax.length).toBe(0);
    expect(component.producerIntervalsMin.length).toBe(0);
  });
});
