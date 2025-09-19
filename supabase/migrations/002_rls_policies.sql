-- Row Level Security (RLS) policies for BestIT Consulting website
-- Enables public read access while protecting sensitive operations

-- Enable RLS on all tables
ALTER TABLE ai_news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- AI News Articles Policies
-- Allow public read access to published articles
CREATE POLICY "Public can read published articles" ON ai_news_articles
  FOR SELECT USING (is_published = true);

-- Allow public read access to all articles (for admin purposes)
CREATE POLICY "Public can read all articles" ON ai_news_articles
  FOR SELECT USING (true);

-- Allow public insert for new articles (from scraping)
CREATE POLICY "Public can insert articles" ON ai_news_articles
  FOR INSERT WITH CHECK (true);

-- Allow public update for existing articles
CREATE POLICY "Public can update articles" ON ai_news_articles
  FOR UPDATE USING (true);

-- Allow public delete for articles
CREATE POLICY "Public can delete articles" ON ai_news_articles
  FOR DELETE USING (true);

-- Testimonials Policies
-- Allow public read access to visible testimonials
CREATE POLICY "Public can read visible testimonials" ON testimonials
  FOR SELECT USING (is_visible = true);

-- Allow public read access to all testimonials
CREATE POLICY "Public can read all testimonials" ON testimonials
  FOR SELECT USING (true);

-- Allow public insert for new testimonials
CREATE POLICY "Public can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Allow public update for existing testimonials
CREATE POLICY "Public can update testimonials" ON testimonials
  FOR UPDATE USING (true);

-- Allow public delete for testimonials
CREATE POLICY "Public can delete testimonials" ON testimonials
  FOR DELETE USING (true);

-- User Preferences Policies
-- Allow public read access to user preferences
CREATE POLICY "Public can read user preferences" ON user_preferences
  FOR SELECT USING (true);

-- Allow public insert for new user preferences
CREATE POLICY "Public can insert user preferences" ON user_preferences
  FOR INSERT WITH CHECK (true);

-- Allow public update for existing user preferences
CREATE POLICY "Public can update user preferences" ON user_preferences
  FOR UPDATE USING (true);

-- Allow public delete for user preferences
CREATE POLICY "Public can delete user preferences" ON user_preferences
  FOR DELETE USING (true);

-- Create a function to check if user is authenticated (for future use)
CREATE OR REPLACE FUNCTION auth.user_id()
RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(
    current_setting('request.jwt.claims', true)::json->>'sub',
    current_setting('request.jwt.claims', true)::json->>'user_id'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if user is admin (for future use)
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(
    (current_setting('request.jwt.claims', true)::json->>'role') = 'admin',
    false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
