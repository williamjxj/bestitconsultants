-- Initial database schema for BestIT Consulting website
-- Creates tables for testimonials and user preferences

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
