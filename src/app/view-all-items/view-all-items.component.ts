import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.initSearchForm();
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