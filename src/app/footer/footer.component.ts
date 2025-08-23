import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  year: number | undefined; 
  
  ngOnInit(): void {
    const date = new Date();
    this.year = date.getFullYear();
  }
}
