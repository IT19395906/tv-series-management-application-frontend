import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TvSeriesService } from '../tv-series.service';
import { SubmitDto } from '../model/dto.model';

@Component({
  selector: 'app-add-item',
  standalone: false,
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  detailsForm!: FormGroup;
  today: Date = new Date();
  lastDate: Date = new Date(this.today.getFullYear() - 50, this.today.getMonth(), this.today.getDate());
  imgName: string = "No File Selected";
  image!: File;
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Adventure', 'Crime',
    'Romance', 'Documentary', 'Sport', 'Mystery', 'Musical', 'History', 'Fantasy', 'Biography', 'Animation'];
  languages: string[] = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Korean', 'Arabic', 'Portuguese', 'Russian', 'Italian', 'Turkish', 'Dutch'
  ];
  filteredLanguages: string[] = [...this.languages];

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private tvSeriesService: TvSeriesService,

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
      img: [null, Validators.required],
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
    this.image = event.target.files[0];
    // File extends Blob /Blob has size, type /File has name, lastModified

    if (!this.image.type.startsWith('image/')) {
      this.detailsForm.get('img')?.setValue(null);
      this.imgName = '';
      this.toastr.error('Invalid image format', 'Error');
      return;
    }

    if (this.image.size > 30 * 1024 * 1024) {
      this.detailsForm.get('img')?.setValue(null);
      this.imgName = '';
      this.toastr.error('Image size is too large', 'Error');
      return;
    }

    this.imgName = this.image.name;
    this.detailsForm.get('img')?.setValue(this.image);
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

        const submitDto: SubmitDto = {
          category: this.detailsForm.get('category')?.value,
          status: this.detailsForm.get('status')?.value,
          title: this.detailsForm.get('title')?.value,
          language: this.detailsForm.get('language')?.value,
          description: this.detailsForm.get('description')?.value,
          releasedDate: this.detailsForm.get('releasedDate')?.value,
          seasons: this.detailsForm.get('seasons')?.value,
          episodes: this.detailsForm.get('episodes')?.value,
          img: this.image, // this.detailsForm.get('img')?.value, also ok
          trailer: this.detailsForm.get('trailer')?.value,
        };
        this.tvSeriesService.addTvSeriesData(submitDto).subscribe({
          next: (response) => { },
          error: (error) => { },
          complete: () => { }
        })
        this.toastr.success('Tv Series Uploaded Successfully', 'Success');
        this.initDetailsForm();
      }

    })

  }
}
