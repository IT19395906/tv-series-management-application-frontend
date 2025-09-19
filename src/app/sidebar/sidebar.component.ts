import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarValues } from '../model/sidebar-values.model';


export const ROUTES: SidebarValues[] = [
  {
    path: 'home',
    title: 'Home',
    iconType: 'fa',
    icon: 'fa-home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    disabled: false,
    permission: ''
  },
  {
    path: 'search',
    title: 'Search',
    iconType: 'fa',
    icon: 'fa-search',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    disabled: false,
    permission: ''
  },
  {
    path: 'add-item',
    title: 'Add Tv Series',
    iconType: 'fa',
    icon: 'fa-circle-plus',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    disabled: false,
    permission: ''
  },
  {
    path: 'view',
    title: 'View All Tv Series',
    iconType: 'fa',
    icon: 'fa-tv',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    disabled: false,
    permission: ''
  },
  {
    path: 'upcoming',
    title: 'Upcoming',
    iconType: 'fa',
    icon: 'fa-calendar-alt',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    disabled: false,
    permission: ''
  },
  {
    path: 'contact',
    title: 'Contact Us',
    iconType: 'fa',
    icon: 'fa-envelope',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    disabled: false,
    permission: ''
  },
];

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  public sidebarItems: any[] | undefined;
  public innerHeight: any;
  listMaxHeight: string | undefined;
  listMaxWidth: string | undefined;
  isCollapsed: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
  ) {}

  @HostListener('window:resize', ['$event'])
  windowResizecall(event: any) {
    this.setMenuHeight();
  }

  callToggleMenu(event: any, length: any) {
    if (length > 0) {
      const parentElement = event.target.closest('li');
      const activeClass = parentElement.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }

  ngOnInit() {
    this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    this.initLeftSidebar();
  }

  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    _this.setMenuHeight();

  }

  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - 60;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';

  }
}
