/**
 * Supabase client configuration for BestIT Consulting website
 * Handles database connections and real-time subscriptions
 */

// Temporary mock implementation until dependencies are installed
let createClient: any;
let Database: any;

try {
  const supabaseModule = require('@supabase/supabase-js');
  createClient = supabaseModule.createClient;
  Database = require('./database.types').Database;
} catch (error) {
  console.warn('Supabase not available, using mock implementation');
  // Mock implementation
  createClient = () => ({
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: [], error: null }),
      update: () => ({ data: [], error: null }),
      delete: () => ({ data: [], error: null }),
      eq: function() { return this; },
      single: function() { return this; }
    }),
    channel: () => ({
      on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) })
    })
  });
  Database = {};
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'mock://url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

// Create Supabase client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We don't need auth for this project
  },
});

// Create Supabase client for server-side operations (with service role key)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-service-key',
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
