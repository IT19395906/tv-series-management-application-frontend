import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-item',
  standalone: false,
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  detailsForm!: FormGroup;
  imgName: string = "No File Selected";
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Adventure', 'Crime',
    'Romance', 'Documentary', 'Sport', 'Mystery', 'Musical', 'History', 'Fantasy', 'Biography', 'Animation'];
  languages: string[] = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Korean', 'Arabic', 'Portuguese', 'Russian', 'Italian', 'Turkish', 'Dutch'
  ];
  filteredLanguages: string[] = [...this.languages];

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.initDetailsForm();
  }

  initDetailsForm(): void {
    this.detailsForm = this.fb.group({
      category: ['', Validators.required],
      status: ['ongoing', Validators.required],
      title: ['', Validators.required],
      language: ['', Validators.required],
      description: ['', Validators.required],
      releasedDate: ['', Validators.required],
      seasons: [],
      episodes: [],
      img: ['', Validators.required],
      trailer: [],
    })
  }

  onLanguageSearch(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredLanguages = this.languages.filter(lang =>
      lang.toLowerCase().includes(searchText)
    );
  }

  display(language: any): string {
    return language ? language : '';
  }

  onImageSelected(event: any) {
    const image = event.target.files[0];
    this.imgName = image.name;
    this.detailsForm.get('img')?.setValue(image);
    this.detailsForm.get('img')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.detailsForm.invalid) {
      this.toastr.error('Invalid Form', 'Error');
      return;
    }

    Swal.fire({
      title: "Are you sure to add tv series ?",
      text: `You are adding ${this.detailsForm.controls['title'].value}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'No',

    }).then(result => {
      if (result.isConfirmed) {
        this.toastr.success('Tv Series Uploaded Successfully', 'Success');
        this.initDetailsForm();
      }

    })

  }
}
