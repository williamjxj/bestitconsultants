#!/usr/bin/env node

/**
 * Simple database setup script for BestIT Consulting website
 * Initializes Supabase database with schema, RLS policies, and seed data
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Supabase configuration
const supabaseUrl = 'https://rcrhosxqbhlserqaafsw.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjcmhvc3hxYmhsc2VycWFhZnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MzM3MTMsImV4cCI6MjA3MzEwOTcxM30.EhP40bCXiaw1AfoEFkzfjosBbtO-X77yH1zd2V3ZQl4'

// Note: You need to get the service role key from your Supabase dashboard
// Go to: https://supabase.com/dashboard/project/rcrhosxqbhlserqaafsw/settings/api
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_service_role_key_here'

if (supabaseServiceKey === 'your_service_role_key_here') {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  console.error('')
  console.error('Please get your service role key from:')
  console.error(
    'https://supabase.com/dashboard/project/rcrhosxqbhlserqaafsw/settings/api'
  )
  console.error('')
  console.error('Then set it as an environment variable:')
  console.error('export SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key')
  console.error('')
  process.exit(1)
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function executeSQL(sql) {
  try {
    // Split SQL into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim())

    for (const statement of statements) {
      if (statement.trim()) {
        const { data, error } = await supabase.rpc('exec_sql', {
          sql: statement.trim(),
        })
        if (error) {
          console.warn(`⚠️  SQL warning: ${error.message}`)
        }
      }
    }
    return true
  } catch (error) {
    console.error(`❌ SQL execution failed: ${error.message}`)
    return false
  }
}

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1)

    if (error) {
      throw new Error(`Connection test failed: ${error.message}`)
    }

    console.log('✅ Supabase connection successful')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message)
    return false
  }
}

async function checkExistingTables() {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', [
        'ai_news_articles',
        'testimonials',
        'user_preferences',
      ])

    if (error) {
      throw new Error(`Failed to check existing tables: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error('❌ Failed to check existing tables:', error.message)
    return []
  }
}

async function setupDatabase() {
  console.log('🚀 Starting database setup...')
  console.log('')

  // Test connection
  console.log('1. Testing Supabase connection...')
  const connectionTest = await testConnection()
  if (!connectionTest) {
    process.exit(1)
  }
  console.log('')

  // Check existing tables
  console.log('2. Checking existing tables...')
  const existingTables = await checkExistingTables()
  if (existingTables.length > 0) {
    console.log('⚠️  Tables already exist:')
    existingTables.forEach(table => console.log(`   - ${table.table_name}`))
    console.log('')
    console.log('Continuing with setup...')
  }
  console.log('')

  // Create tables using direct SQL execution
  console.log('3. Creating database tables...')

  // Initial schema
  const initialSchemaSQL = `
    -- Enable necessary extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Create ai_news_articles table
    CREATE TABLE IF NOT EXISTS ai_news_articles (
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
    CREATE TABLE IF NOT EXISTS testimonials (
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
    CREATE TABLE IF NOT EXISTS user_preferences (
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
  `

  const schemaSuccess = await executeSQL(initialSchemaSQL)
  if (!schemaSuccess) {
    console.error('❌ Failed to create schema')
    process.exit(1)
  }

  console.log('✅ Database tables created successfully')
  console.log('')

  // Create indexes
  console.log('4. Creating indexes...')
  const indexesSQL = `
    CREATE INDEX IF NOT EXISTS idx_ai_news_category ON ai_news_articles(category);
    CREATE INDEX IF NOT EXISTS idx_ai_news_trending ON ai_news_articles(trending);
    CREATE INDEX IF NOT EXISTS idx_ai_news_published ON ai_news_articles(is_published);
    CREATE INDEX IF NOT EXISTS idx_ai_news_date ON ai_news_articles(date DESC);
    CREATE INDEX IF NOT EXISTS idx_ai_news_created_at ON ai_news_articles(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_testimonials_visible ON testimonials(is_visible);
    CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(display_order);
    CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
  `

  await executeSQL(indexesSQL)
  console.log('✅ Indexes created successfully')
  console.log('')

  // Create triggers
  console.log('5. Creating triggers...')
  const triggersSQL = `
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    DROP TRIGGER IF EXISTS update_ai_news_articles_updated_at ON ai_news_articles;
    CREATE TRIGGER update_ai_news_articles_updated_at
      BEFORE UPDATE ON ai_news_articles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
    CREATE TRIGGER update_testimonials_updated_at
      BEFORE UPDATE ON testimonials
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
    CREATE TRIGGER update_user_preferences_updated_at
      BEFORE UPDATE ON user_preferences
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  `

  await executeSQL(triggersSQL)
  console.log('✅ Triggers created successfully')
  console.log('')

  // Enable RLS and create policies
  console.log('6. Setting up Row Level Security...')
  const rlsSQL = `
    ALTER TABLE ai_news_articles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
    ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

    -- AI News Articles Policies
    DROP POLICY IF EXISTS "Public can read published articles" ON ai_news_articles;
    CREATE POLICY "Public can read published articles" ON ai_news_articles
      FOR SELECT USING (is_published = true);

    DROP POLICY IF EXISTS "Public can read all articles" ON ai_news_articles;
    CREATE POLICY "Public can read all articles" ON ai_news_articles
      FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public can insert articles" ON ai_news_articles;
    CREATE POLICY "Public can insert articles" ON ai_news_articles
      FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS "Public can update articles" ON ai_news_articles;
    CREATE POLICY "Public can update articles" ON ai_news_articles
      FOR UPDATE USING (true);

    DROP POLICY IF EXISTS "Public can delete articles" ON ai_news_articles;
    CREATE POLICY "Public can delete articles" ON ai_news_articles
      FOR DELETE USING (true);

    -- Testimonials Policies
    DROP POLICY IF EXISTS "Public can read visible testimonials" ON testimonials;
    CREATE POLICY "Public can read visible testimonials" ON testimonials
      FOR SELECT USING (is_visible = true);

    DROP POLICY IF EXISTS "Public can read all testimonials" ON testimonials;
    CREATE POLICY "Public can read all testimonials" ON testimonials
      FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public can insert testimonials" ON testimonials;
    CREATE POLICY "Public can insert testimonials" ON testimonials
      FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS "Public can update testimonials" ON testimonials;
    CREATE POLICY "Public can update testimonials" ON testimonials
      FOR UPDATE USING (true);

    DROP POLICY IF EXISTS "Public can delete testimonials" ON testimonials;
    CREATE POLICY "Public can delete testimonials" ON testimonials
      FOR DELETE USING (true);

    -- User Preferences Policies
    DROP POLICY IF EXISTS "Public can read user preferences" ON user_preferences;
    CREATE POLICY "Public can read user preferences" ON user_preferences
      FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public can insert user preferences" ON user_preferences;
    CREATE POLICY "Public can insert user preferences" ON user_preferences
      FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS "Public can update user preferences" ON user_preferences;
    CREATE POLICY "Public can update user preferences" ON user_preferences
      FOR UPDATE USING (true);

    DROP POLICY IF EXISTS "Public can delete user preferences" ON user_preferences;
    CREATE POLICY "Public can delete user preferences" ON user_preferences
      FOR DELETE USING (true);
  `

  await executeSQL(rlsSQL)
  console.log('✅ Row Level Security policies created successfully')
  console.log('')

  // Insert seed data
  console.log('7. Inserting seed data...')
  const seedDataSQL = `
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
    )
    ON CONFLICT DO NOTHING;

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
    )
    ON CONFLICT DO NOTHING;

    -- Insert default user preferences
    INSERT INTO user_preferences (user_id, motion_preference, animation_enabled, performance_mode) VALUES
    ('default', 'normal', true, 'medium'),
    ('mobile', 'reduced', false, 'high'),
    ('desktop', 'enhanced', true, 'low')
    ON CONFLICT DO NOTHING;
  `

  await executeSQL(seedDataSQL)
  console.log('✅ Seed data inserted successfully')
  console.log('')

  // Verify setup
  console.log('8. Verifying database setup...')
  const finalTables = await checkExistingTables()
  const expectedTables = [
    'ai_news_articles',
    'testimonials',
    'user_preferences',
  ]
  const missingTables = expectedTables.filter(
    table => !finalTables.some(t => t.table_name === table)
  )

  if (missingTables.length > 0) {
    console.error('❌ Missing tables after setup:', missingTables)
    process.exit(1)
  }

  console.log('✅ All required tables created successfully')

  // Check data counts
  try {
    const { count: articlesCount } = await supabase
      .from('ai_news_articles')
      .select('*', { count: 'exact', head: true })

    const { count: testimonialsCount } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true })

    const { count: preferencesCount } = await supabase
      .from('user_preferences')
      .select('*', { count: 'exact', head: true })

    console.log('📊 Database statistics:')
    console.log(`   - Testimonials: ${testimonialsCount || 0}`)
    console.log(`   - User Preferences: ${preferencesCount || 0}`)
  } catch (error) {
    console.warn('⚠️  Could not retrieve data counts:', error.message)
  }

  console.log('')
  console.log('🎉 Database setup completed successfully!')
  console.log('')
  console.log('Next steps:')
  console.log('1. Start your Next.js development server: npm run dev')
  console.log('2. Test the API endpoints:')
  console.log('   - GET /api/navigation')
  console.log('   - GET /api/testimonials')
  console.log('')
}

// Run the setup
setupDatabase().catch(error => {
  console.error('❌ Setup failed:', error.message)
  process.exit(1)
})
