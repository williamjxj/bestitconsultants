-- Remove AI News functionality from BestIT Consulting website
-- This migration removes all AI News related tables and data

-- Drop AI News related indexes first
DROP INDEX IF EXISTS idx_ai_news_category;
DROP INDEX IF EXISTS idx_ai_news_trending;
DROP INDEX IF EXISTS idx_ai_news_published;
DROP INDEX IF EXISTS idx_ai_news_date;
DROP INDEX IF EXISTS idx_ai_news_created_at;

-- Drop AI News related triggers
DROP TRIGGER IF EXISTS update_ai_news_articles_updated_at ON ai_news_articles;

-- Drop the ai_news_articles table
DROP TABLE IF EXISTS ai_news_articles;

-- Note: We keep testimonials and user_preferences tables as they are still needed
