#!/usr/bin/env node

/**
 * Database setup script for BestIT Consulting website
 * Initializes Supabase database with schema, RLS policies, and seed data
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  console.error('');
  console.error('Please check your .env.local file and ensure all variables are set.');
  process.exit(1);
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSQLFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    const { data, error } = await supabase.rpc('exec_sql', { sql });

    if (error) {
      throw new Error(`SQL execution failed: ${error.message}`);
    }

    console.log(`✅ Executed ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to execute ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);

    if (error) {
      throw new Error(`Connection test failed: ${error.message}`);
    }

    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    return false;
  }
}

async function checkExistingTables() {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['ai_news_articles', 'testimonials', 'user_preferences']);

    if (error) {
      throw new Error(`Failed to check existing tables: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('❌ Failed to check existing tables:', error.message);
    return [];
  }
}

async function setupDatabase() {
  console.log('🚀 Starting database setup...');
  console.log('');

  // Test connection
  console.log('1. Testing Supabase connection...');
  const connectionTest = await testConnection();
  if (!connectionTest) {
    process.exit(1);
  }
  console.log('');

  // Check existing tables
  console.log('2. Checking existing tables...');
  const existingTables = await checkExistingTables();
  if (existingTables.length > 0) {
    console.log('⚠️  Tables already exist:');
    existingTables.forEach(table => console.log(`   - ${table.table_name}`));
    console.log('');
    console.log('Do you want to continue? This may overwrite existing data.');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');

    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  console.log('');

  // Run migrations
  console.log('3. Running database migrations...');

  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

  if (!fs.existsSync(migrationsDir)) {
    console.error('❌ Migrations directory not found:', migrationsDir);
    process.exit(1);
  }

  const migrationFiles = [
    '001_initial_schema.sql',
    '002_rls_policies.sql',
    '003_seed_data.sql'
  ];

  let allSuccessful = true;

  for (const migrationFile of migrationFiles) {
    const filePath = path.join(migrationsDir, migrationFile);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Migration file not found: ${migrationFile}`);
      allSuccessful = false;
      continue;
    }

    const success = await runSQLFile(filePath);
    if (!success) {
      allSuccessful = false;
    }
  }

  if (!allSuccessful) {
    console.error('❌ Some migrations failed. Please check the errors above.');
    process.exit(1);
  }

  console.log('');
  console.log('4. Verifying database setup...');

  // Verify tables exist
  const finalTables = await checkExistingTables();
  const expectedTables = ['ai_news_articles', 'testimonials', 'user_preferences'];
  const missingTables = expectedTables.filter(table =>
    !finalTables.some(t => t.table_name === table)
  );

  if (missingTables.length > 0) {
    console.error('❌ Missing tables after setup:', missingTables);
    process.exit(1);
  }

  console.log('✅ All required tables created successfully');

  // Check data counts
  try {
    const { count: articlesCount } = await supabase
      .from('ai_news_articles')
      .select('*', { count: 'exact', head: true });

    const { count: testimonialsCount } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true });

    const { count: preferencesCount } = await supabase
      .from('user_preferences')
      .select('*', { count: 'exact', head: true });

    console.log('📊 Database statistics:');
    console.log(`   - AI News Articles: ${articlesCount || 0}`);
    console.log(`   - Testimonials: ${testimonialsCount || 0}`);
    console.log(`   - User Preferences: ${preferencesCount || 0}`);
  } catch (error) {
    console.warn('⚠️  Could not retrieve data counts:', error.message);
  }

  console.log('');
  console.log('🎉 Database setup completed successfully!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Start your Next.js development server: npm run dev');
  console.log('2. Test the API endpoints:');
  console.log('   - GET /api/navigation');
  console.log('   - GET /api/testimonials');
  console.log('   - GET /api/ai-news');
  console.log('3. Visit /ai-news to see the AI news page');
  console.log('');
}

// Run the setup
setupDatabase().catch(error => {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
});
