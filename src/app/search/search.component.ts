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
  activeDropdown: string | null = null;
  categories: string[] = [];
  languages: string[] = [];
  years: string[] = [];
  collections: string[] = ['sfgdfhd', 'hdciubhuc'];
  dropdownItems: any[] = [];

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
    this.loadLanguages();
    this.loadYears();
  }

  loadCategories() {
    this.tvSeriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.updateDropdownItems();
      },
      error: (error) => {
        this.toastr.error('Retrieve categories failed', 'Error');
      }
    })
  }

  loadLanguages() {
    this.tvSeriesService.getAllLanguages().subscribe({
      next: (response) => {
        this.languages = response;
        this.updateDropdownItems();
      },
      error: (error) => {
        this.toastr.error('Retrieve languages failed', 'Error');
      }
    })
  }

  loadYears() {
    this.tvSeriesService.getAllYears().subscribe({
      next: (response) => {
        this.years = response;
        this.updateDropdownItems();
      },
      error: (error) => {
        this.toastr.error('Retrieve years failed', 'Error');
      }
    })
  }


  toggleContent(key: string) {
    if (this.activeDropdown === key) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = key;
    }
  }

  keepContent(key: string) {
    this.activeDropdown = key;
  }

  closeContent() {
    this.activeDropdown = null;
  }


  updateDropdownItems() {
    this.dropdownItems = [
      { key: 'genre', label: 'Genre', values: this.categories },
      { key: 'years', label: 'Years', values: this.years },
      { key: 'languages', label: 'Languages', values: this.languages },
      { key: 'collections', label: 'Collections', values: this.collections },
    ];
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

  onBtn(value: string, item: any) {
    switch (item.key) {
      case 'genre':
        this.getTvSeriesByCategory(value);
        break;
      case 'languages':
        this.getTvSeriesByLanguage(value);
        break;
      case 'years':
        this.getTvSeriesByYear(value);
        break;
      case 'collections':
        this.getTvSeriesByCollection(value);
        break;
      default: throw new Error

    }
    this.activeDropdown = null;
  }

  getTvSeriesByCollection(value: string) {
    this.tvSeriesService.getTvSeriesByCollection(value).subscribe(
      (response) => {

      },
      (error) => {
        this.toastr.error('get data failed', 'Error');
      }
    )
  }

  getTvSeriesByYear(value: string) {
    this.tvSeriesService.getTvSeriesByYear(value).subscribe(
      (response) => {

      },
      (error) => {
        this.toastr.error('get data failed', 'Error');
      }
    )
  }

  getTvSeriesByLanguage(value: string) {
    this.tvSeriesService.getTvSeriesByLanguage(value).subscribe(
      (response) => {

      },
      (error) => {
        this.toastr.error('get data failed', 'Error');
      }
    )
  }

  getTvSeriesByCategory(value: string) {
    this.tvSeriesService.getTvSeriesByCategory(value).subscribe(
      (response) => {

      },
      (error) => {
        this.toastr.error('get data failed', 'Error');
      }
    )
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
