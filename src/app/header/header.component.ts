import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  loggedInUserName: string = '';
  userRole: string = '';
  isNavbarCollapsed = true;
  isLoggedIn: any = null;
  isOpenSidebar = true;
  theme = 'light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    // private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    document.body.classList.remove('light', 'dark');
    this.getUserDetails();
  }

  getUserDetails() {
    const userDetailsString = sessionStorage.getItem('userDetails');
    
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);

      this.loggedInUserName = userDetails?.username;
      this.userRole = userDetails?.roleName;

      if (this.userRole) {
        this.userRole = this.userRole
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        }
      }
    }
    
    ngAfterViewInit() {
    this.isLoggedIn = localStorage.getItem("jwtToken");
    if (localStorage.getItem('menuOption')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('menuOption') as string
      );
    } else {
    }

    if (localStorage.getItem('sidebar_status')) {
      if (localStorage.getItem('sidebar_status') === 'close') {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      } else {
        this.renderer.removeClass(this.document.body, 'side-closed');
        this.renderer.removeClass(this.document.body, 'submenu-closed');
      }
    } else {
    }
  }

  toggleTheme() {
    document.body.classList.remove(this.theme);
    this.theme = this.theme == 'light' ? 'dark' : 'light';
    document.body.classList.add(this.theme);

  }

  confirmLogout() {
    Swal.fire({
      title: 'Are you sure want to logout ?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('jwtToken');
        localStorage.setItem('isLoggedIn', 'false');
        this.router.navigate(['/login']);
        // this.authService.authLogout();
      }
    });
  }

}
