import { Component } from '@angular/core';
import { TvSeriesService } from '../service/tv-series.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  tvseries: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 8;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tvSeriesService: TvSeriesService,

  ) { }


  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.tvSeriesService.getAllTvSeries(this.currentPage - 1, this.pageSize).subscribe({
      next: (response) => {
        if (response.content) {
          this.tvseries = response.content;
          this.totalPages = response.totalPages;
        }
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error.message;
        this.toastr.error(errorMessage, 'Error');
      },
      complete: () => { }
    })
  }
}
