import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  valueChangesSubscription!: Subscription;
  tvSeriesDataSource = [
    {
      id: "1", category: "jhsdochdsu", title: "khsdbckjd", addedDate: 'jkbewkjdbjwked', addedBy: 'hfdhfgh',
      releasedDate: 'stdchf', status: 'yfcyghc', seasons: 4, episodes: 7, language: 'gvsvjvh'
    },
    {
      id: "1", category: "jhsdochdsu", title: "khsdbckjd", addedDate: 'jkbewkjdbjwked', addedBy: 'hfdhfgh',
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
  // @ViewChild(MatSort) sort: MatSort;
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
      status: [''],
      title: [''],
      fromDate: [''],
      toDate: [''],
      seasons: [],
      episodes: []
    })
  }

  search() {
    const category = this.searchForm.controls["category"].value;
    const status = this.searchForm.controls["status"].value;
    const title = this.searchForm.controls["title"].value?.trim();
    const fromDate = this.searchForm.controls["fromDate"].value;
    const toDate = this.searchForm.controls["toDate"].value;
    const seasons = this.searchForm.controls["seasons"].value;
    const episodes = this.searchForm.controls["episodes"].value;

    const hasAnyFilter = !!category || !!status || !!title || !!fromDate || !!toDate || !!seasons || !!episodes;

    if (!hasAnyFilter) {
      this.toastr.warning('Please fill at least one filter', 'Warning');
      return;
    }

  }

}