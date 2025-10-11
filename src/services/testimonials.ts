/**
 * Testimonials service for managing client testimonials
 * Static implementation without database dependency
 */

import type { Testimonial } from '@/types/testimonial'

export interface TestimonialsResult {
  testimonials: Testimonial[]
  total: number
}

export class TestimonialsService {
  private static instance: TestimonialsService

  private constructor() {}

  public static getInstance(): TestimonialsService {
    if (!TestimonialsService.instance) {
      TestimonialsService.instance = new TestimonialsService()
    }
    return TestimonialsService.instance
  }

  /**
   * Get all visible testimonials
   */
  public async getTestimonials(): Promise<Testimonial[]> {
    try {
      // Return static testimonials
      return this.getStaticTestimonials()
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      return this.getFallbackTestimonials()
    }
  }

  /**
   * Get all testimonials (including hidden ones)
   */
  public async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      return this.getStaticTestimonials()
    } catch (error) {
      console.error('Error fetching all testimonials:', error)
      return []
    }
  }

  /**
   * Get a specific testimonial by ID
   */
  public async getTestimonialById(id: string): Promise<Testimonial | null> {
    try {
      const testimonials = this.getStaticTestimonials()
      return testimonials.find(t => t.id === id) || null
    } catch (error) {
      console.error(`Error fetching testimonial ${id}:`, error)
      return null
    }
  }

  /**
   * Create a new testimonial (not supported in static mode)
   */
  public async createTestimonial(
    testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Testimonial | null> {
    console.warn('Creating testimonials not supported in static mode')
    return null
  }

  /**
   * Update a testimonial (not supported in static mode)
   */
  public async updateTestimonial(
    id: string,
    updates: Partial<Testimonial>
  ): Promise<boolean> {
    console.warn('Updating testimonials not supported in static mode')
    return false
  }

  /**
   * Delete a testimonial (not supported in static mode)
   */
  public async deleteTestimonial(id: string): Promise<boolean> {
    console.warn('Deleting testimonials not supported in static mode')
    return false
  }

  /**
   * Update testimonial visibility (not supported in static mode)
   */
  public async updateVisibility(
    id: string,
    isVisible: boolean
  ): Promise<boolean> {
    console.warn('Updating testimonial visibility not supported in static mode')
    return false
  }

  /**
   * Update testimonial display order (not supported in static mode)
   */
  public async updateDisplayOrder(id: string, order: number): Promise<boolean> {
    console.warn(
      'Updating testimonial display order not supported in static mode'
    )
    return false
  }

  /**
   * Get testimonial statistics
   */
  public async getTestimonialStats(): Promise<{
    total: number
    visible: number
    hidden: number
  }> {
    try {
      const testimonials = this.getStaticTestimonials()
      const visible = testimonials.filter(t => t.is_visible).length

      return {
        total: testimonials.length,
        visible,
        hidden: testimonials.length - visible,
      }
    } catch (error) {
      console.error('Error getting testimonial stats:', error)
      return {
        total: 0,
        visible: 0,
        hidden: 0,
      }
    }
  }

  /**
   * Reorder testimonials (not supported in static mode)
   */
  public async reorderTestimonials(ids: string[]): Promise<boolean> {
    console.warn('Reordering testimonials not supported in static mode')
    return false
  }

  /**
   * Get static testimonials
   */
  private getStaticTestimonials(): Testimonial[] {
    return [
      {
        id: 'static-1',
        quote:
          'AI-assisted design completely changed our process. We now explore more ideas in less time.',
        author: 'Ms. Zhang',
        title: 'Textile Director',
        company: 'Shanghai Textile Co.',
        is_visible: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'static-2',
        quote:
          "The team's responsiveness is impressive. They adapted designs to our needs instantly.",
        author: 'Ms. Wang',
        title: 'Hotel Procurement',
        company: 'Luxury Hotels Group',
        is_visible: true,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'static-3',
        quote: 'AI brings fresh ideas every season, revitalizing our industry.',
        author: 'Mr. Chen',
        title: 'Fashion Magazine Editor',
        company: 'Style Weekly',
        is_visible: true,
        display_order: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'static-4',
        quote:
          'The AI integration helped us reduce development time by 40% while improving quality.',
        author: 'Mr. Balaji',
        title: 'CTO',
        company: 'Tech Innovations Ltd.',
        is_visible: true,
        display_order: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'static-5',
        quote:
          "BestIT's AI solutions transformed our business operations. Highly recommended!",
        author: 'Dr. Brennan',
        title: 'CEO',
        company: 'AI Solutions Inc.',
        is_visible: true,
        display_order: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
  }

  /**
   * Get fallback testimonials when static data is unavailable
   */
  private getFallbackTestimonials(): Testimonial[] {
    return [
      {
        id: 'fallback-1',
        quote:
          'AI-assisted design completely changed our process. We now explore more ideas in less time.',
        author: 'Ms. Zhang',
        title: 'Textile Director',
        company: 'Shanghai Textile Co.',
        is_visible: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'fallback-2',
        quote:
          "The team's responsiveness is impressive. They adapted designs to our needs instantly.",
        author: 'Ms. Wang',
        title: 'Hotel Procurement',
        company: 'Luxury Hotels Group',
        is_visible: true,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'fallback-3',
        quote: 'AI brings fresh ideas every season, revitalizing our industry.',
        author: 'Mr. Chen',
        title: 'Fashion Magazine Editor',
        company: 'Style Weekly',
        is_visible: true,
        display_order: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
  }
}

// Export singleton instance
export const testimonialsService = TestimonialsService.getInstance()
