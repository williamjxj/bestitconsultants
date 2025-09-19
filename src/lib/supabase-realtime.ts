/**
 * Supabase real-time subscriptions for BestIT Consulting website
 * Handles real-time updates for AI news articles and testimonials
 */

import { supabase, TABLES } from './supabase';
import type { AINewsArticle } from '@/types/ai-news';
import type { Testimonial } from '@/types/testimonial';

export interface RealtimeSubscription {
  id: string;
  unsubscribe: () => void;
}

export class SupabaseRealtimeService {
  private static instance: SupabaseRealtimeService;
  private subscriptions: Map<string, RealtimeSubscription> = new Map();

  private constructor() {}

  public static getInstance(): SupabaseRealtimeService {
    if (!SupabaseRealtimeService.instance) {
      SupabaseRealtimeService.instance = new SupabaseRealtimeService();
    }
    return SupabaseRealtimeService.instance;
  }

  /**
   * Subscribe to AI news articles changes
   */
  public subscribeToAINewsArticles(
    onInsert: (article: AINewsArticle) => void,
    onUpdate: (article: AINewsArticle) => void,
    onDelete: (articleId: string) => void
  ): RealtimeSubscription {
    const subscriptionId = `ai_news_${Date.now()}`;

    const subscription = supabase
      .channel(`${TABLES.AI_NEWS_ARTICLES}_changes`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: TABLES.AI_NEWS_ARTICLES,
          filter: 'is_published=eq.true'
        },
        (payload) => {
          console.log('New AI news article inserted:', payload.new);
          onInsert(payload.new as AINewsArticle);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: TABLES.AI_NEWS_ARTICLES,
          filter: 'is_published=eq.true'
        },
        (payload) => {
          console.log('AI news article updated:', payload.new);
          onUpdate(payload.new as AINewsArticle);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: TABLES.AI_NEWS_ARTICLES
        },
        (payload) => {
          console.log('AI news article deleted:', payload.old);
          onDelete(payload.old.id);
        }
      )
      .subscribe();

    const realtimeSubscription: RealtimeSubscription = {
      id: subscriptionId,
      unsubscribe: () => {
        subscription.unsubscribe();
        this.subscriptions.delete(subscriptionId);
      }
    };

    this.subscriptions.set(subscriptionId, realtimeSubscription);
    return realtimeSubscription;
  }

  /**
   * Subscribe to testimonials changes
   */
  public subscribeToTestimonials(
    onInsert: (testimonial: Testimonial) => void,
    onUpdate: (testimonial: Testimonial) => void,
    onDelete: (testimonialId: string) => void
  ): RealtimeSubscription {
    const subscriptionId = `testimonials_${Date.now()}`;

    const subscription = supabase
      .channel(`${TABLES.TESTIMONIALS}_changes`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: TABLES.TESTIMONIALS,
          filter: 'is_visible=eq.true'
        },
        (payload) => {
          console.log('New testimonial inserted:', payload.new);
          onInsert(payload.new as Testimonial);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: TABLES.TESTIMONIALS,
          filter: 'is_visible=eq.true'
        },
        (payload) => {
          console.log('Testimonial updated:', payload.new);
          onUpdate(payload.new as Testimonial);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: TABLES.TESTIMONIALS
        },
        (payload) => {
          console.log('Testimonial deleted:', payload.old);
          onDelete(payload.old.id);
        }
      )
      .subscribe();

    const realtimeSubscription: RealtimeSubscription = {
      id: subscriptionId,
      unsubscribe: () => {
        subscription.unsubscribe();
        this.subscriptions.delete(subscriptionId);
      }
    };

    this.subscriptions.set(subscriptionId, realtimeSubscription);
    return realtimeSubscription;
  }

  /**
   * Subscribe to trending articles changes
   */
  public subscribeToTrendingArticles(
    onTrendingChange: (article: AINewsArticle) => void
  ): RealtimeSubscription {
    const subscriptionId = `trending_${Date.now()}`;

    const subscription = supabase
      .channel(`${TABLES.AI_NEWS_ARTICLES}_trending`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: TABLES.AI_NEWS_ARTICLES,
          filter: 'trending=eq.true'
        },
        (payload) => {
          console.log('Article trending status changed:', payload.new);
          onTrendingChange(payload.new as AINewsArticle);
        }
      )
      .subscribe();

    const realtimeSubscription: RealtimeSubscription = {
      id: subscriptionId,
      unsubscribe: () => {
        subscription.unsubscribe();
        this.subscriptions.delete(subscriptionId);
      }
    };

    this.subscriptions.set(subscriptionId, realtimeSubscription);
    return realtimeSubscription;
  }

  /**
   * Subscribe to category-specific article changes
   */
  public subscribeToCategoryArticles(
    category: string,
    onInsert: (article: AINewsArticle) => void,
    onUpdate: (article: AINewsArticle) => void
  ): RealtimeSubscription {
    const subscriptionId = `category_${category}_${Date.now()}`;

    const subscription = supabase
      .channel(`${TABLES.AI_NEWS_ARTICLES}_category_${category}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: TABLES.AI_NEWS_ARTICLES,
          filter: `category=eq.${category}`
        },
        (payload) => {
          console.log(`New ${category} article inserted:`, payload.new);
          onInsert(payload.new as AINewsArticle);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: TABLES.AI_NEWS_ARTICLES,
          filter: `category=eq.${category}`
        },
        (payload) => {
          console.log(`${category} article updated:`, payload.new);
          onUpdate(payload.new as AINewsArticle);
        }
      )
      .subscribe();

    const realtimeSubscription: RealtimeSubscription = {
      id: subscriptionId,
      unsubscribe: () => {
        subscription.unsubscribe();
        this.subscriptions.delete(subscriptionId);
      }
    };

    this.subscriptions.set(subscriptionId, realtimeSubscription);
    return realtimeSubscription;
  }

  /**
   * Unsubscribe from a specific subscription
   */
  public unsubscribe(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(subscriptionId);
    }
  }

  /**
   * Unsubscribe from all subscriptions
   */
  public unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions.clear();
  }

  /**
   * Get active subscriptions count
   */
  public getActiveSubscriptionsCount(): number {
    return this.subscriptions.size;
  }

  /**
   * Get subscription status
   */
  public getSubscriptionStatus(): {
    active: number;
    subscriptions: string[];
  } {
    return {
      active: this.subscriptions.size,
      subscriptions: Array.from(this.subscriptions.keys())
    };
  }

  /**
   * Test real-time connection
   */
  public async testConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from(TABLES.AI_NEWS_ARTICLES)
        .select('id')
        .limit(1);

      if (error) {
        console.error('Real-time connection test failed:', error);
        return false;
      }

      console.log('Real-time connection test successful');
      return true;
    } catch (error) {
      console.error('Real-time connection test error:', error);
      return false;
    }
  }

  /**
   * Setup real-time monitoring
   */
  public setupMonitoring(): void {
    // Monitor connection status
    setInterval(() => {
      const status = this.getSubscriptionStatus();
      console.log('Real-time subscriptions status:', status);
    }, 30000); // Check every 30 seconds

    // Test connection periodically
    setInterval(async () => {
      const isConnected = await this.testConnection();
      if (!isConnected) {
        console.warn('Real-time connection lost, attempting to reconnect...');
        // In a real implementation, you would implement reconnection logic
      }
    }, 60000); // Test every minute
  }
}

// Export singleton instance
export const supabaseRealtimeService = SupabaseRealtimeService.getInstance();
