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
  camelCaseRole: string = '';
  userRole: string = '';
  isNavbarCollapsed = true;
  flagvalue = '';
  countryName = '';
  langStoreValue = '';
  defaultFlag = '';
  isOpenSidebar = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    // private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    const userDetailsString = sessionStorage.getItem('userDetails');

    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);

      this.loggedInUserName = userDetails?.username;
      this.userRole = userDetails?.roleName;

      if (this.userRole) {
        this.camelCaseRole = this.userRole
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }
  }

  ngAfterViewInit() {
    if (localStorage.getItem('theme')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('theme') as string
      );
    } else {
    }

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

  confirmLogout() {
    Swal.fire({
      title: 'Do you want to Logout?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log out',
    }).then((result) => {
      if (result.value) {
        // this.authService.authLogout();
      }
    });
  }

}
