import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-upcoming-item',
  standalone: false,
  templateUrl: './add-upcoming-item.component.html',
  styleUrl: './add-upcoming-item.component.scss'
})
export class AddUpcomingItemComponent {

  upcomingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initUpcomingForm();
  }

  initUpcomingForm() {
    this.upcomingForm = this.fb.group({
      title: ['', Validators.required],
      rDate: ['', Validators.required]
    })
  }

  onSubmit(): void {
    if (this.upcomingForm.invalid) {
      this.toastr.error("Invalid Form", "Error");
      return;
    }
  }

}
