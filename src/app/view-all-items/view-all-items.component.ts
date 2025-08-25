import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

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
  tvSeriesDataSource = [
    {
      id: "1", category: "jhsdochdsu", title: "khsdbckjd", addedDate: '25-08-2025', addedBy: 'hfdhfgh',
      releasedDate: 'stdchf', status: 'yfcyghc', seasons: 4, episodes: 7, language: 'gvsvjvh'
    },
    {
      id: "2", category: "jhsdochdsu", title: "khsdbckjd", addedDate: '23-08-2025', addedBy: 'hfdhfgh',
      releasedDate: 'stdchf', status: 'yfcyghc', seasons: 4, episodes: 7, language: 'gvsvjvh'
    }
  ];
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.initSearchForm();
  }

  ngAfterViewInit() {
    // this.tvSeriesDataSource.sort = this.sort;
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

    const hasAnyFilter = !!category || !!title || !!fromDate || !!toDate || !!addedDateFrom || !!addedDateTo;

    if (!hasAnyFilter) {
      this.toastr.warning('Please fill at least one filter', 'Warning');
      return;
    }

  }

  get addedDateForm(): FormGroup {
    return this.searchForm.get('addedDate') as FormGroup;
  }

  clear(){
    this.searchForm.reset();
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