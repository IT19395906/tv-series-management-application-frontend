import { AfterViewInit, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-full-detail',
  standalone: false,
  templateUrl: './view-full-detail.component.html',
  styleUrl: './view-full-detail.component.scss'
})
export class ViewFullDetailComponent implements AfterViewInit {

  tvSeriesId!: string | null;
  data: any;
  imageArray: string[] = ["https://static01.nyt.com/images/2025/08/14/12visualUploader-8432-cover/12visualUploader-8432-cover-mobileMasterAt3x-v2.jpg?width=600&quality=75&auto=webp&disable=upscale",
    "https://static01.nyt.com/images/2025/08/14/12visualUploader-8432-cover/12visualUploader-8432-cover-mobileMasterAt3x-v2.jpg?width=600&quality=75&auto=webp&disable=upscale",
    "https://static01.nyt.com/images/2025/08/14/12visualUploader-8432-cover/12visualUploader-8432-cover-mobileMasterAt3x-v2.jpg?width=600&quality=75&auto=webp&disable=upscale",
    "https://static01.nyt.com/images/2025/08/14/12visualUploader-8432-cover/12visualUploader-8432-cover-mobileMasterAt3x-v2.jpg?width=600&quality=75&auto=webp&disable=upscale",
    "https://static01.nyt.com/images/2025/08/14/12visualUploader-8432-cover/12visualUploader-8432-cover-mobileMasterAt3x-v2.jpg?width=600&quality=75&auto=webp&disable=upscale"
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.data = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }

  ngOnInit(): void {
    this.tvSeriesId = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const left = document.querySelector('#left') as HTMLButtonElement;
    const right = document.querySelector('#right') as HTMLButtonElement;

    const checkEdge = () => {
      const scrollLeft = carousel?.scrollLeft;
      const maxScrollLeft = carousel?.scrollWidth - carousel?.clientWidth;
      left.disabled = scrollLeft <= 0;
      right.disabled = scrollLeft >= maxScrollLeft - 1;
    }

    checkEdge();

    left?.addEventListener('click', () => {
      carousel?.scrollBy({ left: -500, behavior: 'smooth' });
    });

    right?.addEventListener('click', () => {
      carousel?.scrollBy({ left: 500, behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', checkEdge);
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
