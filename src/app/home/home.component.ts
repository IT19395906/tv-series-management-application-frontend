import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TvSeriesService } from '../tv-series.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tvseries: any[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tvSeriesService: TvSeriesService,

  ) { }

  ngOnInit(): void {
    this.tvSeriesService.getAllTvSeries().subscribe({
      next: (response) => {
        if (response.content) {
          this.tvseries = response.content;
        }
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error.message;
        this.toastr.error(errorMessage, 'Error');
      },
      complete: () => { }
    })
  }

  navigate(data: any) {
    this.router.navigate(['/view-detail', data.id], { state: { data } });
  }

}