/**
 * Navigation types for the BestIT Consulting website
 * Based on the data model from specs/001-ui-ux-enhancement/data-model.md
 */

export enum NavigationCategory {
  MAIN = 'main',
  COMPANY = 'company',
  SERVICES = 'services',
  WORK = 'work',
  RESOURCES = 'resources'
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  category: NavigationCategory;
  order: number;
  isActive: boolean;
  isVisible: boolean;
}

export interface NavigationState {
  items: NavigationItem[];
  currentPath: string;
  isMobileMenuOpen: boolean;
}
