import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TvSeriesService } from '../tv-series.service';
import { SubmitDto } from '../model/dto.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-single-item',
  standalone: false,
  templateUrl: './view-single-item.component.html',
  styleUrl: './view-single-item.component.scss'
})
export class ViewSingleItemComponent implements OnInit {

  detailsForm!: FormGroup;
  today: Date = new Date();
  lastDate: Date = new Date(this.today.getFullYear() - 50, this.today.getMonth(), this.today.getDate());
  imgName: string = "No File Selected";
  image!: File;
  updatedImagePreview: string | null = null;
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Adventure', 'Crime',
    'Romance', 'Documentary', 'Sport', 'Mystery', 'Musical', 'History', 'Fantasy', 'Biography', 'Animation'];
  languages: string[] = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Korean', 'Arabic', 'Portuguese', 'Russian', 'Italian', 'Turkish', 'Dutch'
  ];
  filteredLanguages: string[] = [...this.languages];

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private tvSeriesService: TvSeriesService,
    private dialogRef: MatDialogRef<ViewSingleItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.initDetailsForm();
  }

  initDetailsForm(): void {
    this.detailsForm = this.fb.group({
      category: [this.data?.category, Validators.required],
      status: [this.data?.status, Validators.required],
      title: [this.data?.title, Validators.required],
      quality: [this.data?.quality],
      format: [this.data?.format],
      imdb: [this.data?.imdb],
      ro: [this.data?.ro],
      language: [this.data?.language, Validators.required],
      description: [this.data?.description, Validators.required],
      releasedDate: [new Date(this.data?.releasedDate), Validators.required],
      seasons: [this.data?.seasons],
      episodes: [this.data?.episodes],
      img: [this.data?.img, Validators.required],
      trailer: [this.data?.trailer],
    });

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
      this.updatedImagePreview = null;
      this.toastr.error('Invalid image format', 'Error');
      return;
    }

    if (this.image.size > 30 * 1024 * 1024) {
      this.detailsForm.get('img')?.setValue(null);
      this.imgName = '';
      this.updatedImagePreview = null;
      this.toastr.error('Image size is too large', 'Error');
      return;
    }

    this.imgName = this.image.name;
    this.detailsForm.get('img')?.setValue(this.image);
    this.detailsForm.get('img')?.markAsTouched();
    this.updatedImagePreview = URL.createObjectURL(this.image)
  }

  onUpdate(): void {
    if (this.detailsForm.invalid) {
      this.toastr.error('Invalid Form', 'Error');
      return;
    }

    Swal.fire({
      title: "Are you sure to update the tv series ?",
      text: `Update   ${this.detailsForm.controls['title'].value}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',

    }).then(result => {
      if (result.isConfirmed) {

        const updateDto: SubmitDto = {
          category: this.detailsForm.get('category')?.value,
          status: this.detailsForm.get('status')?.value,
          title: this.detailsForm.get('title')?.value,
          quality: this.detailsForm.get('quality')?.value,
          format: this.detailsForm.get('format')?.value,
          language: this.detailsForm.get('language')?.value,
          description: this.detailsForm.get('description')?.value,
          releasedDate: this.detailsForm.get('releasedDate')?.value,
          tags: [],
          imdb: this.detailsForm.get('imdb')?.value,
          ro: this.detailsForm.get('ro')?.value,
          seasons: this.detailsForm.get('seasons')?.value,
          episodes: this.detailsForm.get('episodes')?.value,
          img: this.detailsForm.get('img')?.value,
          trailer: this.detailsForm.get('trailer')?.value,
        };
        this.tvSeriesService.addTvSeriesData(updateDto).subscribe({
          next: (response) => {
            this.toastr.success('TV Series updated successfully', 'Success');
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.toastr.error('Failed to update TV Series', 'Error');
          },
          complete: () => { }
        })
      }

    })

  }
}

