import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  }
}
