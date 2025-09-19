/**
 * Database types for Supabase integration
 * Generated from the schema defined in specs/001-ui-ux-enhancement/data-model.md
 */

export interface Database {
  public: {
    Tables: {
      ai_news_articles: {
        Row: {
          id: string;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          category: string;
          tags: string[];
          trending: boolean;
          read_time: string;
          image_url: string | null;
          source_url: string;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          scraped_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          category: string;
          tags?: string[];
          trending?: boolean;
          read_time: string;
          image_url?: string | null;
          source_url: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          scraped_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          date?: string;
          category?: string;
          tags?: string[];
          trending?: boolean;
          read_time?: string;
          image_url?: string | null;
          source_url?: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          scraped_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          author: string;
          title: string;
          company: string;
          is_visible: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          author: string;
          title: string;
          company: string;
          is_visible?: boolean;
          display_order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          author?: string;
          title?: string;
          company?: string;
          is_visible?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string | null;
          motion_preference: string;
          animation_enabled: boolean;
          performance_mode: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          motion_preference?: string;
          animation_enabled?: boolean;
          performance_mode?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          motion_preference?: string;
          animation_enabled?: boolean;
          performance_mode?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
