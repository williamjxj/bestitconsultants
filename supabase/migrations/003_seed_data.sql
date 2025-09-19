-- Seed data for BestIT Consulting website
-- Inserts initial testimonials and sample AI news articles

-- Insert initial testimonials
INSERT INTO testimonials (quote, author, title, company, is_visible, display_order) VALUES
(
  'AI-assisted design completely changed our process. We now explore more ideas in less time.',
  'Ms. Zhang',
  'Textile Director',
  'Shanghai Textile Co.',
  true,
  1
),
(
  'The AI integration helped us reduce development time by 40% while improving quality.',
  'Mr. Chen',
  'CTO',
  'Tech Innovations Ltd.',
  true,
  2
),
(
  'BestIT''s AI solutions transformed our business operations. Highly recommended!',
  'Dr. Wang',
  'CEO',
  'AI Solutions Inc.',
  true,
  3
),
(
  'The AI-powered analytics gave us insights we never had before.',
  'Ms. Liu',
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

-- Insert sample AI news articles
INSERT INTO ai_news_articles (
  title,
  excerpt,
  content,
  date,
  category,
  tags,
  trending,
  read_time,
  image_url,
  source_url,
  is_published
) VALUES
(
  'Latest AI Model Breakthrough Achieves State-of-the-Art Performance',
  'New AI model achieves state-of-the-art performance in natural language processing tasks, surpassing previous benchmarks by 15%.',
  'A groundbreaking new AI model has been developed that achieves state-of-the-art performance across multiple natural language processing benchmarks. The model, developed by a team of researchers, demonstrates significant improvements in understanding context, generating coherent responses, and handling complex reasoning tasks. This breakthrough represents a major step forward in AI capabilities and has implications for various industries including healthcare, education, and customer service. The research team spent over two years developing the model, which uses a novel architecture that combines transformer-based attention mechanisms with advanced training techniques. Early testing shows the model can handle tasks ranging from simple question-answering to complex multi-step reasoning problems. The model is expected to be open-sourced in the coming months, allowing researchers and developers worldwide to build upon this work.',
  '2024-01-15 10:00:00+00',
  'AI Models',
  ARRAY['AI', 'Machine Learning', 'Research', 'NLP', 'Breakthrough'],
  true,
  '5 min read',
  'https://example.com/images/ai-model-breakthrough.jpg',
  'https://example.com/ai-news/latest-ai-model-breakthrough',
  true
),
(
  'AI Safety Research Reveals New Alignment Techniques',
  'Researchers publish new findings on AI safety and alignment techniques that could prevent harmful AI behavior.',
  'A comprehensive study on AI safety has revealed new techniques for ensuring artificial intelligence systems remain aligned with human values. The research, conducted over 18 months, identifies key strategies for preventing AI systems from developing harmful behaviors or pursuing unintended goals. The study examines various alignment approaches including constitutional AI, reinforcement learning from human feedback, and value learning techniques. Researchers found that combining multiple alignment methods provides better safety guarantees than relying on any single approach. The findings have important implications for the development of advanced AI systems and could help prevent potential risks associated with increasingly capable AI. The research team plans to release detailed implementation guidelines and open-source tools to help other researchers apply these techniques.',
  '2024-01-14 14:30:00+00',
  'AI Safety',
  ARRAY['AI Safety', 'Research', 'Alignment', 'Ethics', 'Prevention'],
  true,
  '7 min read',
  'https://example.com/images/ai-safety-research.jpg',
  'https://example.com/ai-news/ai-safety-alignment-techniques',
  true
),
(
  'Enterprise AI Adoption Reaches New Heights in 2024',
  'Companies are increasingly adopting AI solutions for business optimization, with 78% of enterprises reporting positive ROI.',
  'Enterprise AI adoption has reached unprecedented levels in 2024, with companies across industries reporting significant benefits from AI implementation. A recent survey of 500 enterprise companies shows that 78% have achieved positive return on investment from their AI initiatives, with average productivity gains of 23%. The most successful implementations focus on automating routine tasks, improving customer service, and enhancing decision-making processes. Key areas of adoption include customer service chatbots, predictive analytics, supply chain optimization, and fraud detection. Companies report that AI has helped them reduce costs, improve efficiency, and gain competitive advantages. However, challenges remain including data quality issues, talent shortages, and integration complexity. The survey also reveals that companies with dedicated AI teams and clear strategies are more likely to succeed with their AI initiatives.',
  '2024-01-13 09:15:00+00',
  'Enterprise AI',
  ARRAY['Enterprise', 'AI', 'Business', 'ROI', 'Productivity'],
  false,
  '6 min read',
  'https://example.com/images/enterprise-ai-adoption.jpg',
  'https://example.com/ai-news/enterprise-ai-adoption-2024',
  true
),
(
  'Biotech AI Accelerates Drug Discovery Process',
  'AI-powered drug discovery platforms are reducing development time from years to months, with several promising candidates in clinical trials.',
  'Artificial intelligence is revolutionizing the drug discovery process, with new AI-powered platforms significantly accelerating the identification and development of potential treatments. Recent advances in machine learning algorithms have enabled researchers to analyze vast amounts of biological data and predict drug-target interactions with unprecedented accuracy. Several AI-discovered drug candidates are now entering clinical trials, representing a major milestone in computational drug discovery. The technology has shown particular promise in identifying treatments for rare diseases and complex conditions that were previously difficult to target. Pharmaceutical companies are investing heavily in AI capabilities, with some reporting 50% reductions in discovery timelines. However, challenges remain including regulatory approval processes and the need for extensive validation of AI predictions. The field is expected to continue growing rapidly as more data becomes available and algorithms improve.',
  '2024-01-12 16:45:00+00',
  'Biotech AI',
  ARRAY['Biotech', 'AI', 'Drug Discovery', 'Healthcare', 'Research'],
  false,
  '8 min read',
  'https://example.com/images/biotech-ai-drug-discovery.jpg',
  'https://example.com/ai-news/biotech-ai-drug-discovery',
  true
),
(
  'Autonomous Vehicle AI Reaches New Milestone in Safety Testing',
  'Self-driving cars achieve 99.9% safety record in controlled testing environments, bringing commercial deployment closer to reality.',
  'Autonomous vehicle technology has reached a new milestone in safety testing, with self-driving cars achieving a 99.9% safety record in controlled environments. The latest testing results show significant improvements in obstacle detection, path planning, and emergency response capabilities. Advanced AI systems can now handle complex traffic scenarios including construction zones, weather conditions, and unexpected pedestrian behavior. Major automakers and tech companies are preparing for commercial deployment, with some planning to launch autonomous taxi services in select cities. The technology has also shown promise in reducing traffic congestion and improving fuel efficiency. However, regulatory approval and public acceptance remain key challenges. The industry is working closely with government agencies to establish safety standards and testing protocols. Experts predict that fully autonomous vehicles could be available to consumers within the next 5-10 years.',
  '2024-01-11 11:20:00+00',
  'Autonomous Vehicles',
  ARRAY['Autonomous Vehicles', 'AI', 'Safety', 'Transportation', 'Technology'],
  false,
  '9 min read',
  'https://example.com/images/autonomous-vehicles-safety.jpg',
  'https://example.com/ai-news/autonomous-vehicles-safety-milestone',
  true
);

-- Insert default user preferences
INSERT INTO user_preferences (user_id, motion_preference, animation_enabled, performance_mode) VALUES
('default', 'normal', true, 'medium'),
('mobile', 'reduced', false, 'high'),
('desktop', 'enhanced', true, 'low');
