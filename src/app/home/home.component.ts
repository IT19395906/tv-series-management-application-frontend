import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TvSeriesService } from '../service/tv-series.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tvseries: any[] = [];
  totalElements: number = 0;
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
          this.totalElements = response.totalElements;
        }
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error.message;
        this.toastr.error(errorMessage, 'Error');
      },
      complete: () => { }
    })
  }

  first(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.getAll();
    }
  }

  previous(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAll();
    }
  }

  next(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAll();
    }
  }

  last(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.getAll();
    }
  }

  navigate(data: any) {
    this.router.navigate(['/view-detail', data.id], { state: { data } });
  }

}