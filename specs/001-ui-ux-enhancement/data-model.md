# Data Model: Enhanced UI/UX with Simplified Navigation and AI News Integration

## Entities

### NavigationItem
Represents a menu item in the navigation system with categorization and ordering.

**Fields**:
- `id: string` - Unique identifier for the navigation item
- `label: string` - Display text for the navigation item
- `href: string` - URL path for the navigation item
- `category: NavigationCategory` - Logical grouping category
- `order: number` - Display order within category
- `isActive: boolean` - Current page indicator
- `isVisible: boolean` - Show/hide in navigation

**Validation Rules**:
- `label` must be non-empty string
- `href` must be valid URL path
- `order` must be positive integer
- Maximum 7 items total in navigation

**State Transitions**:
- `isActive` changes based on current route
- `isVisible` can be toggled for responsive design

### Testimonial
Represents client feedback displayed in the footer section.

**Fields**:
- `id: string` - Unique identifier for the testimonial
- `quote: string` - Client testimonial text
- `author: string` - Client name
- `title: string` - Client job title
- `company: string` - Client company name
- `isVisible: boolean` - Show/hide in footer
- `order: number` - Display order in testimonials section

**Validation Rules**:
- `quote` must be non-empty string (max 200 characters)
- `author` must be non-empty string
- `title` must be non-empty string
- `company` must be non-empty string
- `order` must be positive integer

**State Transitions**:
- `isVisible` can be toggled for content management
- `order` can be updated for reordering

### AINewsArticle
Represents AI industry news content with categorization and trending status, stored in Supabase database.

**Fields**:
- `id: string` - Unique identifier for the article (UUID)
- `title: string` - Article headline
- `excerpt: string` - Article summary
- `content: string` - Full article content
- `date: Date` - Publication date
- `category: NewsCategory` - Article category
- `tags: string[]` - Article tags for filtering
- `trending: boolean` - Trending indicator
- `readTime: string` - Estimated reading time
- `imageUrl: string` - Article featured image
- `sourceUrl: string` - Original article URL
- `isPublished: boolean` - Publication status
- `createdAt: Date` - Database creation timestamp
- `updatedAt: Date` - Database update timestamp
- `scrapedAt: Date` - When content was scraped from source

**Validation Rules**:
- `title` must be non-empty string (max 100 characters)
- `excerpt` must be non-empty string (max 300 characters)
- `date` must be valid Date object
- `tags` must be array of non-empty strings (max 5 tags)
- `readTime` must be valid time format (e.g., "5 min read")
- `sourceUrl` must be valid URL
- `createdAt`, `updatedAt`, `scrapedAt` must be valid Date objects

**State Transitions**:
- `trending` can be updated based on engagement metrics
- `isPublished` controls article visibility
- `tags` can be updated for better categorization
- `updatedAt` automatically updated on any field change

### AnimationState
Represents user animation preferences and system animation settings.

**Fields**:
- `motionPreference: MotionPreference` - User's motion preference setting
- `animationEnabled: boolean` - System animation toggle
- `performanceMode: PerformanceMode` - Performance optimization level
- `reducedMotion: boolean` - Reduced motion flag
- `staggerDelay: number` - Animation stagger delay in milliseconds

**Validation Rules**:
- `motionPreference` must be valid enum value
- `animationEnabled` must be boolean
- `performanceMode` must be valid enum value
- `staggerDelay` must be positive number (max 200ms)

**State Transitions**:
- `motionPreference` changes based on user system settings
- `animationEnabled` can be toggled by user
- `performanceMode` adjusts based on device capabilities

## Enums

### NavigationCategory
```typescript
enum NavigationCategory {
  MAIN = 'main',
  COMPANY = 'company',
  SERVICES = 'services',
  WORK = 'work',
  RESOURCES = 'resources'
}
```

### NewsCategory
```typescript
enum NewsCategory {
  AI_MODELS = 'AI Models',
  BIOTECH_AI = 'Biotech AI',
  AI_SAFETY = 'AI Safety',
  ENTERPRISE_AI = 'Enterprise AI',
  RESEARCH = 'Research',
  AUTONOMOUS_VEHICLES = 'Autonomous Vehicles'
}
```

### MotionPreference
```typescript
enum MotionPreference {
  REDUCED = 'reduced',
  NORMAL = 'normal',
  ENHANCED = 'enhanced'
}
```

### PerformanceMode
```typescript
enum PerformanceMode {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}
```

## Relationships

### NavigationItem ↔ NavigationCategory
- **One-to-Many**: Each category can have multiple navigation items
- **Constraint**: Maximum 7 items total across all categories

### AINewsArticle ↔ NewsCategory
- **One-to-Many**: Each category can have multiple articles
- **Constraint**: Articles must belong to exactly one category

### AINewsArticle ↔ Tags
- **Many-to-Many**: Articles can have multiple tags, tags can belong to multiple articles
- **Constraint**: Maximum 5 tags per article

## Supabase Database Schema

### Database Tables

#### ai_news_articles
```sql
CREATE TABLE ai_news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  excerpt VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  category VARCHAR(50) NOT NULL,
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

-- Indexes for performance
CREATE INDEX idx_ai_news_category ON ai_news_articles(category);
CREATE INDEX idx_ai_news_trending ON ai_news_articles(trending);
CREATE INDEX idx_ai_news_published ON ai_news_articles(is_published);
CREATE INDEX idx_ai_news_date ON ai_news_articles(date DESC);
```

#### testimonials
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote VARCHAR(200) NOT NULL,
  author VARCHAR(50) NOT NULL,
  title VARCHAR(50) NOT NULL,
  company VARCHAR(50) NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_testimonials_visible ON testimonials(is_visible);
CREATE INDEX idx_testimonials_order ON testimonials(display_order);
```

#### user_preferences
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  motion_preference VARCHAR(20) DEFAULT 'normal',
  animation_enabled BOOLEAN DEFAULT TRUE,
  performance_mode VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_prefs_user_id ON user_preferences(user_id);
```

### Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE ai_news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public read access for published articles" ON ai_news_articles
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public read access for visible testimonials" ON testimonials
  FOR SELECT USING (is_visible = TRUE);

-- User-specific preferences
CREATE POLICY "Users can manage their own preferences" ON user_preferences
  FOR ALL USING (auth.uid() = user_id);
```

## Data Validation Rules

### Global Constraints
- All string fields must be non-empty
- All numeric fields must be positive
- All date fields must be valid Date objects
- All boolean fields must be explicit (no undefined)

### Business Rules
- Navigation must have exactly 7 items
- Testimonials must have at least 3 items for display
- AI News articles must have valid publication dates
- Animation preferences must respect user system settings
- Maximum 5-8 AI news articles displayed at once
- Content refresh every 6 hours maximum

### Performance Constraints
- Navigation items must load within 100ms
- Testimonials must render within 200ms
- AI News articles must load within 500ms
- Animations must maintain 60fps performance
- Database queries must complete within 200ms
- Real-time subscriptions must update within 1 second

