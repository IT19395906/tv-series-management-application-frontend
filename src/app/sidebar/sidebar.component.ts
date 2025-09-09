import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarValues } from '../model/sidebar-values.model';


export const ROUTES: SidebarValues[] = [
  {
    path: 'home',
    title: 'Home',
    iconType: 'feather',
    icon: 'settings',
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
    iconType: 'feather',
    icon: 'settings',
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
    iconType: 'feather',
    icon: 'settings',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    disabled: false,
    permission: ''
  }
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
  public bodyTag: any;
  listMaxHeight: string | undefined;
  listMaxWidth: string | undefined;
  userFullName: string | undefined;
  userImg: string | undefined;
  userType: string | undefined;
  headerHeight = 60;
  routerObj: any;
  currentRoute: string | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private router: Router
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
    this.bodyTag = this.document.body;
  }

  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    _this.setMenuHeight();

  }

  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';

  }
}
