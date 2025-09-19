/**
 * Testimonials service for managing client testimonials
 * Handles CRUD operations and real-time updates
 */

import { supabase } from '@/lib/supabase'
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
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true })

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      // Return fallback testimonials
      return this.getFallbackTestimonials()
    }
  }

  /**
   * Get all testimonials (including hidden ones)
   */
  public async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return data || []
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
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // Testimonial not found
        }
        throw new Error(`Database error: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error fetching testimonial ${id}:`, error)
      return null
    }
  }

  /**
   * Create a new testimonial
   */
  public async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<Testimonial | null> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert({
          ...testimonial,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error creating testimonial:', error)
      return null
    }
  }

  /**
   * Update a testimonial
   */
  public async updateTestimonial(
    id: string,
    updates: Partial<Testimonial>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error updating testimonial ${id}:`, error)
      return false
    }
  }

  /**
   * Delete a testimonial
   */
  public async deleteTestimonial(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error deleting testimonial ${id}:`, error)
      return false
    }
  }

  /**
   * Update testimonial visibility
   */
  public async updateVisibility(
    id: string,
    isVisible: boolean
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          is_visible: isVisible,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error updating visibility for testimonial ${id}:`, error)
      return false
    }
  }

  /**
   * Update testimonial display order
   */
  public async updateDisplayOrder(
    id: string,
    order: number
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          display_order: order,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error updating display order for testimonial ${id}:`, error)
      return false
    }
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
      // Get total count
      const { count: total } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })

      // Get visible count
      const { count: visible } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })
        .eq('is_visible', true)

      return {
        total: total || 0,
        visible: visible || 0,
        hidden: (total || 0) - (visible || 0)
      }
    } catch (error) {
      console.error('Error getting testimonial stats:', error)
      return {
        total: 0,
        visible: 0,
        hidden: 0
      }
    }
  }

  /**
   * Reorder testimonials
   */
  public async reorderTestimonials(ids: string[]): Promise<boolean> {
    try {
      const updates = ids.map((id, index) => ({
        id,
        display_order: index + 1
      }))

      for (const update of updates) {
        const { error } = await supabase
          .from('testimonials')
          .update({
            display_order: update.display_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', update.id)

        if (error) {
          throw new Error(`Database error: ${error.message}`)
        }
      }

      return true
    } catch (error) {
      console.error('Error reordering testimonials:', error)
      return false
    }
  }

  /**
   * Get fallback testimonials when database is unavailable
   */
  private getFallbackTestimonials(): Testimonial[] {
    return [
      {
        id: 'fallback-1',
        quote: 'AI-assisted design completely changed our process. We now explore more ideas in less time.',
        author: 'Ms. Zhang',
        title: 'Textile Director',
        company: 'Shanghai Textile Co.',
        is_visible: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'fallback-2',
        quote: 'The team\'s responsiveness is impressive. They adapted designs to our needs instantly.',
        author: 'Ms. Wang',
        title: 'Hotel Procurement',
        company: 'Luxury Hotels Group',
        is_visible: true,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date()
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
        updated_at: new Date()
      }
    ]
  }
}

// Export singleton instance
export const testimonialsService = TestimonialsService.getInstance()
