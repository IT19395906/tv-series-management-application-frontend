import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TvSeriesService } from '../service/tv-series.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactUsForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private tvSeriesService: TvSeriesService,

  ) { }

  ngOnInit(): void {
    this.initContactUsForm();
  }

  initContactUsForm(): void {
    this.contactUsForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      contact: [''],
      content: ['', Validators.required],
      file: [null]
    })
  }

  onSubmit(): void {

    if (this.contactUsForm.invalid) {
      this.toastr.error('Invalid Form', 'Error');
      return;
    }
    
    const submitDto = new FormData();
    submitDto.append("fname", this.contactUsForm.get('fname')?.value.trim());
    submitDto.append("lname", this.contactUsForm.get('lname')?.value.trim());
    submitDto.append("email", this.contactUsForm.get('email')?.value.trim());
    submitDto.append("contact", this.contactUsForm.get('contact')?.value);
    submitDto.append("content", this.contactUsForm.get('content')?.value.trim());
    submitDto.append("file", this.contactUsForm.get('file')?.value);

    this.tvSeriesService.addRequests(submitDto).subscribe({
      next: (response) => {
        if (response.message == "Request Sent Successfully") {
          this.toastr.success('Request Sent Successfully', 'Success');
          this.initContactUsForm();
        }
      },
      error: (error) => {
        this.toastr.error('Request Send Failed', 'Error');
      },
      complete: () => { }
    })
  }
}
