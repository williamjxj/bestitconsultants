/**
 * Navigation service for managing website navigation
 * Handles navigation items, active states, and real-time updates
 */

import type { NavigationItem } from '@/types/navigation'

export interface NavigationResult {
  items: NavigationItem[]
  activeItem: string | null
}

export class NavigationService {
  private static instance: NavigationService
  private activeItem: string | null = null
  private navigationItems: NavigationItem[] = []

  private constructor() {
    this.initializeNavigationItems()
  }

  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService()
    }
    return NavigationService.instance
  }

  /**
   * Initialize navigation items
   */
  private initializeNavigationItems(): void {
    this.navigationItems = [
      {
        id: 'home',
        label: 'Home',
        href: '/',
        category: 'main',
        order: 1,
        isActive: false,
        isVisible: true
      },
      {
        id: 'about',
        label: 'About',
        href: '/about',
        category: 'company',
        order: 2,
        isActive: false,
        isVisible: true
      },
      {
        id: 'services',
        label: 'Services',
        href: '/services',
        category: 'services',
        order: 3,
        isActive: false,
        isVisible: true
      },
      {
        id: 'portfolio',
        label: 'Portfolio',
        href: '/portfolio',
        category: 'work',
        order: 4,
        isActive: false,
        isVisible: true
      },
      {
        id: 'team',
        label: 'Team',
        href: '/team',
        category: 'company',
        order: 5,
        isActive: false,
        isVisible: true
      },
      {
        id: 'ai-news',
        label: 'AI News',
        href: '/ai-news',
        category: 'resources',
        order: 6,
        isActive: false,
        isVisible: true
      },
      {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
        category: 'main',
        order: 7,
        isActive: false,
        isVisible: true
      }
    ]
  }

  /**
   * Get all navigation items
   */
  public getNavigationItems(): NavigationItem[] {
    return this.navigationItems.filter(item => item.isVisible)
  }

  /**
   * Get navigation items by category
   */
  public getNavigationItemsByCategory(category: string): NavigationItem[] {
    return this.navigationItems.filter(item =>
      item.category === category && item.isVisible
    )
  }

  /**
   * Get a specific navigation item by ID
   */
  public getNavigationItemById(id: string): NavigationItem | null {
    return this.navigationItems.find(item => item.id === id) || null
  }

  /**
   * Update active navigation item
   */
  public updateActiveItem(pathname: string): void {
    // Reset all items to inactive
    this.navigationItems.forEach(item => {
      item.isActive = false
    })

    // Find matching item
    const activeItem = this.navigationItems.find(item => {
      if (item.href === '/') {
        return pathname === '/'
      }
      return pathname.startsWith(item.href)
    })

    if (activeItem) {
      activeItem.isActive = true
      this.activeItem = activeItem.id
    } else {
      this.activeItem = null
    }
  }

  /**
   * Get current active item
   */
  public getActiveItem(): string | null {
    return this.activeItem
  }

  /**
   * Add a new navigation item
   */
  public addNavigationItem(item: Omit<NavigationItem, 'id' | 'isActive'>): boolean {
    try {
      const newItem: NavigationItem = {
        ...item,
        id: `nav-${Date.now()}`,
        isActive: false
      }

      this.navigationItems.push(newItem)
      this.sortNavigationItems()
      return true
    } catch (error) {
      console.error('Error adding navigation item:', error)
      return false
    }
  }

  /**
   * Update a navigation item
   */
  public updateNavigationItem(
    id: string,
    updates: Partial<NavigationItem>
  ): boolean {
    try {
      const index = this.navigationItems.findIndex(item => item.id === id)
      if (index === -1) {
        return false
      }

      this.navigationItems[index] = {
        ...this.navigationItems[index],
        ...updates
      }

      this.sortNavigationItems()
      return true
    } catch (error) {
      console.error(`Error updating navigation item ${id}:`, error)
      return false
    }
  }

  /**
   * Delete a navigation item
   */
  public deleteNavigationItem(id: string): boolean {
    try {
      const index = this.navigationItems.findIndex(item => item.id === id)
      if (index === -1) {
        return false
      }

      this.navigationItems.splice(index, 1)
      return true
    } catch (error) {
      console.error(`Error deleting navigation item ${id}:`, error)
      return false
    }
  }

  /**
   * Update navigation item visibility
   */
  public updateVisibility(id: string, isVisible: boolean): boolean {
    return this.updateNavigationItem(id, { isVisible })
  }

  /**
   * Update navigation item order
   */
  public updateOrder(id: string, order: number): boolean {
    return this.updateNavigationItem(id, { order })
  }

  /**
   * Reorder navigation items
   */
  public reorderNavigationItems(ids: string[]): boolean {
    try {
      const reorderedItems: NavigationItem[] = []

      ids.forEach((id, index) => {
        const item = this.navigationItems.find(item => item.id === id)
        if (item) {
          reorderedItems.push({
            ...item,
            order: index + 1
          })
        }
      })

      // Add remaining items
      this.navigationItems.forEach(item => {
        if (!ids.includes(item.id)) {
          reorderedItems.push(item)
        }
      })

      this.navigationItems = reorderedItems
      this.sortNavigationItems()
      return true
    } catch (error) {
      console.error('Error reordering navigation items:', error)
      return false
    }
  }

  /**
   * Sort navigation items by order
   */
  private sortNavigationItems(): void {
    this.navigationItems.sort((a, b) => a.order - b.order)
  }

  /**
   * Get navigation statistics
   */
  public getNavigationStats(): {
    total: number
    visible: number
    hidden: number
    byCategory: Record<string, number>
  } {
    const total = this.navigationItems.length
    const visible = this.navigationItems.filter(item => item.isVisible).length
    const hidden = total - visible

    const byCategory: Record<string, number> = {}
    this.navigationItems.forEach(item => {
      byCategory[item.category] = (byCategory[item.category] || 0) + 1
    })

    return {
      total,
      visible,
      hidden,
      byCategory
    }
  }

  /**
   * Get breadcrumb navigation
   */
  public getBreadcrumbs(pathname: string): NavigationItem[] {
    const breadcrumbs: NavigationItem[] = []
    const pathSegments = pathname.split('/').filter(Boolean)

    // Always include home
    const homeItem = this.navigationItems.find(item => item.href === '/')
    if (homeItem) {
      breadcrumbs.push(homeItem)
    }

    // Build breadcrumbs based on path
    let currentPath = ''
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`
      const item = this.navigationItems.find(navItem =>
        navItem.href === currentPath
      )
      if (item) {
        breadcrumbs.push(item)
      }
    })

    return breadcrumbs
  }

  /**
   * Get navigation items for mobile menu
   */
  public getMobileNavigationItems(): NavigationItem[] {
    return this.navigationItems
      .filter(item => item.isVisible)
      .sort((a, b) => a.order - b.order)
  }

  /**
   * Get navigation items for desktop menu
   */
  public getDesktopNavigationItems(): NavigationItem[] {
    return this.navigationItems
      .filter(item => item.isVisible && item.category !== 'mobile-only')
      .sort((a, b) => a.order - b.order)
  }

  /**
   * Reset navigation to default state
   */
  public resetToDefault(): void {
    this.initializeNavigationItems()
    this.activeItem = null
  }
}

// Export singleton instance
export const navigationService = NavigationService.getInstance()
