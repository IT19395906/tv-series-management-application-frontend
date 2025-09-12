import { Component } from '@angular/core';
import { TvSeriesService } from '../service/tv-series.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  searchForm!: FormGroup;
  showGenre: boolean = false;
  categories: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private tvSeriesService: TvSeriesService,

  ) { }


  ngOnInit(): void {
    this.getAll();
    this.initSearchForm();
    this.loadCategories();
  }

  loadCategories() {
    this.tvSeriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        this.toastr.error('Retrieve categories failed', 'Error');
      }
    })
  }

  initSearchForm(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    });
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

  search(): void {
    if (this.searchForm.invalid || this.searchForm.get('search')?.value.trim() == '') {
      return;
    }

    this.tvSeriesService.search(this.searchForm.get('search')?.value.trim().toLowerCase()).subscribe(
      (response) => {
        this.tvseries = response;
      },
      (error) => {
        const errorMessage = error?.error?.message || 'Search Failed';
        this.toastr.error(errorMessage, 'Error');
      }
    )
  }

  latestReleased() {
    this.tvSeriesService.latestReleased().subscribe(
      (response) => {
        this.tvseries = response;
      },
      (error) => {
        this.toastr.error('Load Latest Released Tv Series Failed', 'Error');
      }
    )
  }

  navigate(data: any) {
    this.router.navigate(['/view-detail', data.id], { state: { data } });
  }
}
