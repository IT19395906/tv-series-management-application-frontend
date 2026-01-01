import { Component, OnDestroy } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-upcoming',
  standalone: false,
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent implements OnDestroy {

  upcoming: any[] = [];
  stop$ = new Subject<void>();

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.upcomingSeries$.pipe(takeUntil(this.stop$)).subscribe(
      data => this.upcoming = data.sort((a, b) => a.releaseDate - b.releaseDate));
  }

  select(item: any): void {

  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
