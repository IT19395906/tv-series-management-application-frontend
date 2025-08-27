import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { TvSeriesService } from '../tv-series.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-items',
  standalone: false,
  templateUrl: './view-all-items.component.html',
  styleUrl: './view-all-items.component.scss'
})
export class ViewAllItemsComponent {
  searchForm!: FormGroup;
  today: Date = new Date();
  lastDate: Date = new Date(this.today.getFullYear() - 50, this.today.getMonth(), this.today.getDate());
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Adventure', 'Crime',
    'Romance', 'Documentary', 'Sport', 'Mystery', 'Musical', 'History', 'Fantasy', 'Biography', 'Animation'];
  tvseriesdata = [
    {
      id: "1", category: "Mystery", title: "khsdbckjd", addedDate: '25-08-2025', addedBy: 'hfdhfgh',
      releasedDate: 'stdchf', status: 'yfcyghc', seasons: 4, episodes: 7, language: 'gvsvjvh'
    },
    {
      id: "2", category: "Action", title: "khsdbckjd", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: 'stdchf', status: 'yfcyghc', seasons: 4, episodes: 7, language: 'gvsvjvh'
    },
    {
      id: "3", category: "Comedy", title: "khsdbckjd", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: 'stdchf', status: 'yfcyghc', seasons: 4, episodes: 7, language: 'gvsvjvh'
    },
    {
      id: "4", category: "Horror", title: "khsdbckjd", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: 'stdchf', status: 'yfcyghc', seasons: 4, episodes: 7, language: 'gvsvjvh'
    },
    {
      id: "5", category: "Adventure", title: "khsdbckjd", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: 'stdchf', status: 'yfcyghc', seasons: 4, episodes: 7, language: 'gvsvjvh'
    },
    {
      id: "6", category: "Romance", title: "khsdbckjd", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: 'stdchf', status: 'yfcyghc', seasons: 4, episodes: 7, language: 'gvsvjvh'
    }
  ];
  tvSeriesDataSource = new MatTableDataSource<any>(this.tvseriesdata)

  displayedColumnsTable: string[] = [
    'id',
    'category',
    'title',
    'addedDate',
    'addedBy',
    'releasedDate',
    'status',
    'seasons',
    'episodes',
    'language',
    'action'
  ];
  pageSizeOptions: number[] = [5, 10, 25];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private tvSeriesService: TvSeriesService,

  ) { }

  ngOnInit(): void {
    this.initSearchForm();
  }

  ngAfterViewInit() {
    this.tvSeriesDataSource.sort = this.sort;
    this.tvSeriesDataSource.paginator = this.paginator;
  }

  initSearchForm(): void {
    this.searchForm = this.fb.group({
      category: [''],
      title: [''],
      fromDate: [''],
      toDate: [''],
      addedDate: this.fb.group({
        addedDateFrom: [''],
        addedDateTo: [''],
      })
    });
    this.disableFieldsOnChange();
  }

  search() {
    const category = this.searchForm.controls["category"].value;
    const title = this.searchForm.controls["title"].value?.trim();
    const fromDate = this.searchForm.controls["fromDate"].value;
    const toDate = this.searchForm.controls["toDate"].value;
    const addedDate = this.searchForm.controls["addedDate"] as FormGroup;
    const addedDateFrom = addedDate.controls['addedDateFrom'].value;
    const addedDateTo = addedDate.controls['addedDateTo'].value;

    const searchDto = { category, title, fromDate, toDate, addedDateFrom, addedDateTo }
    const hasAnyFilter = !!category || !!title || !!fromDate || !!toDate || !!addedDateFrom || !!addedDateTo;

    if (!hasAnyFilter) {
      this.toastr.warning('Please fill at least one filter', 'Warning');
      return;
    }

    if (this.searchForm.invalid) {
      this.toastr.error('Search form is invalid');
      return;
    }

    this.tvSeriesService.getTvSeriesBySearch(searchDto).subscribe({
      next: (response) => {
        if (response.data) {
          this.tvSeriesDataSource.data = response.data;
        }
      },
      error: (error) => {
        this.toastr.error(error.message, 'Error');
      },
      complete: () => { }
    })

  }

  get addedDateForm(): FormGroup {
    return this.searchForm.get('addedDate') as FormGroup;
  }

  clear() {
    this.searchForm.reset();
  }



  deleteRecord(element: any) {

    Swal.fire({
      title: "Are you sure want to delete ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        const index = this.tvSeriesDataSource.data.indexOf(element);
        if (index >= 0) {
          // don't need to update table again with datasource because you change datasource.data
          const o = this.tvSeriesDataSource.data.splice(index, 1);
          this.tvSeriesDataSource._updateChangeSubscription();
        }

        // or this.tvSeriesDataSource.data = this.tvSeriesDataSource.data.filter(item => item !== element);
      }
    })
  }

  disableFieldsOnChange(): void {
    const controls = this.searchForm.controls;

    Object.keys(controls).forEach((key) => {
      controls[key].valueChanges.subscribe((value) => {
        if (value) {
          Object.keys(controls).forEach((otherKey) => {
            if (otherKey !== key) {
              controls[otherKey].disable({ emitEvent: false });
            }
          });
        } else {
          const anyOtherFilled = Object.keys(controls).some((k) => k !== key && !!controls[k].value);
          if (!anyOtherFilled) {
            Object.keys(controls).forEach((k) => {
              controls[k].enable({ emitEvent: false });
            });
          }
        }
      });
    });
  }
}