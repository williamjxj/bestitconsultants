/**
 * Supabase client configuration for BestIT Consulting website
 * Handles database connections and real-time subscriptions
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client for client-side operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We don't need auth for this project
  },
});

// Create Supabase client for server-side operations (with service role key)
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
);

// Database table names
export const TABLES = {
  AI_NEWS_ARTICLES: 'ai_news_articles',
  TESTIMONIALS: 'testimonials',
  USER_PREFERENCES: 'user_preferences',
} as const;

// Real-time subscription helpers
export const subscribeToTable = <T>(
  table: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(`${table}_changes`)
    .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
    .subscribe();
};

// Query helpers
export const getTable = async <T>(table: string) => {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data as T[];
};

export const getTableById = async <T>(table: string, id: string) => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as T;
};
