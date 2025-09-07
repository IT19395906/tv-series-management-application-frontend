import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-full-detail',
  standalone: false,
  templateUrl: './view-full-detail.component.html',
  styleUrl: './view-full-detail.component.scss'
})
export class ViewFullDetailComponent {

  tvSeriesId!: string | null;
  data: any;
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

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
