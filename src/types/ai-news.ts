/**
 * AI News types for the BestIT Consulting website
 * Based on the data model from specs/001-ui-ux-enhancement/data-model.md
 */

export enum NewsCategory {
  AI_MODELS = 'AI Models',
  BIOTECH_AI = 'Biotech AI',
  AI_SAFETY = 'AI Safety',
  ENTERPRISE_AI = 'Enterprise AI',
  RESEARCH = 'Research',
  AUTONOMOUS_VEHICLES = 'Autonomous Vehicles'
}

export interface AINewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  category: NewsCategory;
  tags: string[];
  trending: boolean;
  readTime: string;
  imageUrl?: string;
  sourceUrl: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  scrapedAt: Date;
}

export interface AINewsState {
  articles: AINewsArticle[];
  filteredArticles: AINewsArticle[];
  selectedCategory: NewsCategory | 'All';
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
}

export interface ScrapedArticle {
  title: string;
  excerpt: string;
  content: string;
  sourceUrl: string;
  date: Date;
  category: NewsCategory;
  tags: string[];
  imageUrl?: string;
  readTime: string;
}
