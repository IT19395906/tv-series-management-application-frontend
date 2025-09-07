import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { TvSeriesService } from '../tv-series.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ViewSingleItemComponent } from '../view-single-item/view-single-item.component';
import { SearchDto } from '../model/dto.model';

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
      id: "1", category: "Mystery", title: "Breaking Bad", description: "A high school chemistry teacher turned methamphetamine producer", quality: "1080p", addedDate: '25-08-2025', addedBy: 'hfdhfgh',
      releasedDate: '2008-01-20', status: 'completed', trailer: "https://youtube.com/trailer-link", img: "https://media.istockphoto.com/id/1255163297/vector/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-sign-logo-black-silhouette.jpg?s=1024x1024&w=is&k=20&c=e7QMdfY28VXYe5RbvkARtPlmk6zKQAaFrcgtIkXarfg=", seasons: 5, episodes: 62, language: 'English'
    },
    {
      id: "2", category: "Action", title: "Breaking Bad", description: "A high school chemistry teacher turned methamphetamine producer", quality: "1080p", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: '2008-01-20', status: 'completed', trailer: "https://youtube.com/trailer-link", img: "", seasons: 5, episodes: 62, language: 'English'
    },
    {
      id: "3", category: "Comedy", title: "Breaking Bad", description: "A high school chemistry teacher turned methamphetamine producer", quality: "1080p", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: '2008-01-20', status: 'completed', trailer: "https://youtube.com/trailer-link", img: "byte string", seasons: 5, episodes: 62, language: 'English'
    },
    {
      id: "4", category: "Horror", title: "Breaking Bad", description: "A high school chemistry teacher turned methamphetamine producer", quality: "1080p", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: '2008-01-20', status: 'completed', trailer: "https://youtube.com/trailer-link", img: "byte string", seasons: 5, episodes: 62, language: 'English'
    },
    {
      id: "5", category: "Adventure", title: "Breaking Bad", description: "A high school chemistry teacher turned methamphetamine producer", quality: "1080p", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: '2008-01-20', status: 'completed', trailer: "https://youtube.com/trailer-link", img: "byte string", seasons: 5, episodes: 62, language: 'English'
    },
    {
      id: "6", category: "Romance", title: "Breaking Bad", description: "A high school chemistry teacher turned methamphetamine producer", quality: "1080p", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: '2008-01-20', status: 'completed', trailer: "https://youtube.com/trailer-link", img: "byte string", seasons: 5, episodes: 62, language: 'English'
    }
  ];
  tvSeriesDataSource = new MatTableDataSource<any>(this.tvseriesdata)

  displayedColumnsTable: string[] = [
    'id',
    'tvSeriesId',
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
    private dialog: MatDialog,

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
      quality: [''],
      addedDate: this.fb.group({
        addedDateFrom: [''],
        addedDateTo: [''],
      })
    });
    this.searchForm.valueChanges.subscribe(() => {
      this.searchForm.get("fromDate")?.setErrors(null);
      this.searchForm.get("toDate")?.setErrors(null);
      if (this.searchForm.get("fromDate")?.value && !this.searchForm.get("toDate")?.value) {
        this.searchForm.get("toDate")?.setErrors({ incompleteRange: true }); return;
      }

      if (!this.searchForm.get("fromDate")?.value && this.searchForm.get("toDate")?.value) {
        this.searchForm.get("fromDate")?.setErrors({ incompleteRange: true }); return;
      }
    });
    this.addedDateForm.valueChanges.subscribe(() => {
      this.addedDateForm.setErrors(null);
      if (!this.addedDateForm.get('addedDateFrom')?.value || !this.addedDateForm.get('addedDateTo')?.value) {
        this.addedDateForm.setErrors({ incompleteRange: true }); return;
      }
    });
  }

  search() {
    const category = this.searchForm.controls["category"].value;
    const title = this.searchForm.controls["title"].value?.trim();
    const fromDate = this.searchForm.controls["fromDate"].value instanceof Date
      ? this.searchForm.controls["fromDate"].value.toLocaleDateString("en-CA")
      : null;
    const toDate = this.searchForm.controls["toDate"].value instanceof Date
      ? this.searchForm.controls["toDate"].value.toLocaleDateString("en-CA")
      : null;
    const addedDate = this.searchForm.controls["addedDate"] as FormGroup;
    const addedDateFrom = addedDate.controls['addedDateFrom'].value;
    const addedDateTo = addedDate.controls['addedDateTo'].value;
    const quality = this.searchForm.controls['quality'].value;

    // const searchDto = { category, title, fromDate, toDate, addedDateFrom, addedDateTo }
    const searchDto: SearchDto = {
      category: category,
      title: title,
      releasedDateFrom: fromDate,
      releasedDateTo: toDate,
      addedDateFrom: addedDateFrom,
      addedDateTo: addedDateTo,
      quality: quality
    };

    const hasAnyFilter = !!category || !!title || !!fromDate || !!toDate || !!addedDateFrom || !!addedDateTo || !!quality;

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
        const errorMessage = error?.error?.message || error.message || 'Search Failed';
        this.toastr.error(errorMessage, 'Error');
        this.tvSeriesDataSource.data = [];
      },
      complete: () => { }
    })

  }

  get addedDateForm(): FormGroup {
    return this.searchForm.get('addedDate') as FormGroup;
  }

  clear() {
    this.searchForm.reset();
    this.searchForm.markAsPristine();
    this.searchForm.markAsUntouched();
    this.searchForm.updateValueAndValidity();
    this.tvSeriesDataSource.data = [];
  }

  editRecord(element: any) {
    this.dialog.open(ViewSingleItemComponent,
      {
        width: '80vw',
        data: element
      }
    );
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
        this.tvSeriesService.deleteTvSeries(element.id).subscribe({
          next: (response) => {
            if (response.message == "Successfully Deleted Tv series") {
              if (index >= 0) {
                // don't need to update table again with datasource because you change datasource.data
                const deletedObj = this.tvSeriesDataSource.data.splice(index, 1);
                this.tvSeriesDataSource._updateChangeSubscription();
                this.toastr.success(`Tv Series successfully deleted Id ${deletedObj[0].id}`, 'Success')
              }
              // or this.tvSeriesDataSource.data = this.tvSeriesDataSource.data.filter(item => item !== element);
            }
          },
          error: (error) => {
            this.toastr.error('Delete tv series failed', 'Error');
          },
          complete: () => { }
        });
      }
    })
  }
}