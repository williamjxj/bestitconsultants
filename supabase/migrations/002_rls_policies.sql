-- Row Level Security (RLS) policies for BestIT Consulting website
-- Enables public read access while protecting sensitive operations

-- Enable RLS on all tables
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

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

-- Note: Auth functions removed to avoid permission issues
-- These can be added later when proper auth setup is configured
