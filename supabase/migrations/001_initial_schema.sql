-- Initial database schema for BestIT Consulting website
-- Creates tables for AI news articles, testimonials, and user preferences

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ai_news_articles table
CREATE TABLE ai_news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  excerpt VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'AI Models',
    'Biotech AI',
    'AI Safety',
    'Enterprise AI',
    'Research',
    'Autonomous Vehicles'
  )),
  tags TEXT[] DEFAULT '{}',
  trending BOOLEAN DEFAULT FALSE,
  read_time VARCHAR(20) NOT NULL,
  image_url TEXT,
  source_url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL CHECK (LENGTH(quote) <= 200),
  author VARCHAR(50) NOT NULL CHECK (LENGTH(author) <= 50),
  title VARCHAR(50) NOT NULL CHECK (LENGTH(title) <= 50),
  company VARCHAR(50) NOT NULL CHECK (LENGTH(company) <= 50),
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL CHECK (display_order > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  motion_preference VARCHAR(20) DEFAULT 'normal' CHECK (motion_preference IN (
    'reduced',
    'normal',
    'enhanced'
  )),
  animation_enabled BOOLEAN DEFAULT TRUE,
  performance_mode VARCHAR(10) DEFAULT 'medium' CHECK (performance_mode IN (
    'low',
    'medium',
    'high'
  )),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_ai_news_category ON ai_news_articles(category);
CREATE INDEX idx_ai_news_trending ON ai_news_articles(trending);
CREATE INDEX idx_ai_news_published ON ai_news_articles(is_published);
CREATE INDEX idx_ai_news_date ON ai_news_articles(date DESC);
CREATE INDEX idx_ai_news_created_at ON ai_news_articles(created_at DESC);

CREATE INDEX idx_testimonials_visible ON testimonials(is_visible);
CREATE INDEX idx_testimonials_order ON testimonials(display_order);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_ai_news_articles_updated_at
  BEFORE UPDATE ON ai_news_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
