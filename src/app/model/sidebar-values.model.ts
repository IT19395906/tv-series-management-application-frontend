export interface SidebarValues {
  path: string;
  title: string;
  iconType: string;
  icon: string;
  class: string;
  groupTitle: boolean;
  badge: string;
  badgeClass: string;
  submenu: SidebarValues[];
  disabled: boolean;
  permission:string;
}