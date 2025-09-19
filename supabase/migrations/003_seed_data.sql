-- Seed data for BestIT Consulting website
-- Inserts initial testimonials and sample AI news articles

-- Insert initial testimonials
INSERT INTO testimonials (quote, author, title, company, is_visible, display_order) VALUES
(
  'AI-assisted design completely changed our process. We now explore more ideas in less time.',
  'Ms. Carolyn',
  'Textile Director',
  'Shanghai Textile Co.',
  true,
  1
),
(
  'The AI integration helped us reduce development time by 40% while improving quality.',
  'Mr. Balaji',
  'CTO',
  'Tech Innovations Ltd.',
  true,
  2
),
(
  'BestIT''s AI solutions transformed our business operations. Highly recommended!',
  'Dr. Brennan',
  'CEO',
  'AI Solutions Inc.',
  true,
  3
),
(
  'The AI-powered analytics gave us insights we never had before.',
  'Ms. Elena',
  'Data Analyst',
  'Financial Services Corp.',
  true,
  4
),
(
  'BestIT helped us implement AI that actually works in production.',
  'Mr. Kim',
  'Engineering Manager',
  'Tech Startup Co.',
  true,
  5
);

-- Insert default user preferences
INSERT INTO user_preferences (user_id, motion_preference, animation_enabled, performance_mode) VALUES
('default', 'normal', true, 'medium'),
('mobile', 'reduced', false, 'high'),
('desktop', 'enhanced', true, 'low');
