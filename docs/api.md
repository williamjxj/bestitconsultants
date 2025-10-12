# API Documentation

## Overview

This document provides comprehensive documentation for all API endpoints in the BestIT Consulting
website.

## Base URL

All API endpoints are prefixed with `/api/`

## Team API

### GET /api/team

Retrieves all team members with their enhanced profiles.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "william-jiang",
      "name": "William Jiang",
      "title": "Founder & CEO",
      "location": "Vancouver, Canada",
      "experience": 20,
      "avatar": "/images/william-jiang.jpg",
      "bio": "Senior Full-Stack Engineer with 20+ years...",
      "expertise": ["AI & Machine Learning", "React.js", "Node.js"],
      "achievements": ["APEC 2002 accolade", "20+ years Fortune 500 experience"],
      "specializations": ["AI & Machine Learning", "React.js", "Node.js"],
      "prestigeProjects": [
        {
          "id": "fedex-project",
          "name": "FedEx Award-Winning Project",
          "type": "project",
          "description": "Led development of award-winning logistics optimization system",
          "outcome": "APEC 2002 accolade - FedEx Global Project",
          "technologies": ["Python", "Kafka", "Microservices", "Cloud"],
          "year": 2002
        }
      ]
    }
  ],
  "meta": {
    "total": 6,
    "page": 1,
    "limit": 10
  }
}
```

### GET /api/team/{id}

Retrieves a specific team member by ID.

**Parameters**:

- `id` (string): Team member ID

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "william-jiang",
    "name": "William Jiang",
    "title": "Founder & CEO"
    // ... other team member fields
  }
}
```

**Error Response**:

```json
{
  "success": false,
  "message": "Team member not found",
  "code": "TEAM_MEMBER_NOT_FOUND"
}
```

## Case Studies API

### GET /api/case-studies

Retrieves all case studies with their metrics and outcomes.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "ai-textile-design",
      "title": "AI-Powered Transformation in Textile Design",
      "challenge": "Traditional design process took 12 weeks...",
      "solution": "Implemented AI-assisted design system...",
      "result": "Reduced design cycle from 12 weeks to 4-6 days...",
      "metrics": [
        {
          "id": "design-cycle-reduction",
          "name": "Design Cycle Time",
          "value": "4-6 days",
          "unit": "days",
          "improvement": "Reduced from 12 weeks to 4-6 days",
          "type": "efficiency"
        }
      ],
      "technologies": ["AI/ML", "Python", "TensorFlow"],
      "client": "Textile Manufacturing Company",
      "category": "AI & Machine Learning Solutions"
    }
  ],
  "meta": {
    "total": 3,
    "page": 1,
    "limit": 10
  }
}
```

## Services API

### GET /api/services

Retrieves all service categories with their details.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "ai-ml-solutions",
      "name": "AI & Machine Learning Solutions",
      "seoTagline": "Harness AI to automate workflows, unlock insights, and innovate faster.",
      "description": "Custom AI/LLM applications, MLOps, ChatBI, and enterprise AI solutions",
      "benefits": ["Automated workflows", "Data-driven insights", "Faster innovation"],
      "technologies": ["LangChain", "Hugging Face", "RAG", "TensorFlow"],
      "useCases": ["ChatBI", "Document processing", "Predictive analytics"],
      "order": 1,
      "isActive": true
    }
  ],
  "meta": {
    "total": 5
  }
}
```

## Media API

### GET /api/media/assets

Retrieves all media assets with optimization and metadata.

**Query Parameters**:

- `category?: string` - Filter by media category
- `format?: string` - Filter by image format (webp, avif, jpeg, png)
- `priority?: boolean` - Filter by priority level
- `page?: number` - Page number for pagination (default: 1)
- `limit?: number` - Items per page (default: 20)

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "hero-image-1",
      "src": "/imgs/istockphoto-1212876953-612x612.jpg",
      "alt": "Modern technology and innovation workspace with multiple monitors and collaborative environment",
      "width": 1920,
      "height": 1080,
      "format": "webp",
      "category": "hero",
      "priority": true,
      "loading": "eager",
      "seoMetadata": {
        "title": "Hero Image - Modern Technology Workspace",
        "description": "Modern technology and innovation workspace with multiple monitors and collaborative environment",
        "keywords": ["technology", "workspace", "innovation", "collaboration"],
        "structuredData": {
          "@type": "ImageObject",
          "url": "/imgs/istockphoto-1212876953-612x612.jpg",
          "caption": "Modern technology and innovation workspace with multiple monitors and collaborative environment",
          "description": "Modern technology and innovation workspace with multiple monitors and collaborative environment"
        }
      },
      "accessibility": {
        "altText": "Modern technology and innovation workspace with multiple monitors and collaborative environment",
        "ariaLabel": "Hero image showing modern technology workspace",
        "role": "img"
      },
      "animation": {
        "type": "fade",
        "duration": 0.6,
        "delay": 0
      }
    }
  ],
  "meta": {
    "total": 15,
    "page": 1,
    "limit": 20
  }
}
```

### POST /api/media/assets

Creates a new media asset with optimization and metadata.

**Request Body**:

```json
{
  "src": "/imgs/new-image.jpg",
  "alt": "Description of the new image",
  "width": 800,
  "height": 600,
  "category": "gallery",
  "priority": false,
  "seoMetadata": {
    "title": "New Image",
    "description": "Description of the new image",
    "keywords": ["new", "image", "gallery"]
  },
  "accessibility": {
    "altText": "Description of the new image",
    "ariaLabel": "New image in gallery"
  },
  "animation": {
    "type": "slide",
    "duration": 0.6
  }
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "new-image-1",
    "src": "/imgs/new-image.jpg",
    "alt": "Description of the new image",
    "width": 800,
    "height": 600,
    "format": "webp",
    "category": "gallery",
    "priority": false,
    "loading": "lazy",
    "seoMetadata": {
      "title": "New Image",
      "description": "Description of the new image",
      "keywords": ["new", "image", "gallery"],
      "structuredData": {
        "@type": "ImageObject",
        "url": "/imgs/new-image.jpg",
        "caption": "Description of the new image",
        "description": "Description of the new image"
      }
    },
    "accessibility": {
      "altText": "Description of the new image",
      "ariaLabel": "New image in gallery",
      "role": "img"
    },
    "animation": {
      "type": "slide",
      "duration": 0.6,
      "delay": 0
    }
  }
}
```

### GET /api/media/galleries

Retrieves all image galleries with their configurations.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "portfolio-gallery",
      "name": "Portfolio Gallery",
      "description": "Collection of our latest projects and case studies",
      "images": [
        {
          "id": "project-1",
          "src": "/imgs/istockphoto-1350198816-612x612.jpg",
          "alt": "AI-powered project showcase",
          "width": 612,
          "height": 612,
          "format": "webp",
          "category": "portfolio"
        }
      ],
      "layout": "grid",
      "columns": 3,
      "gap": 16,
      "animation": {
        "type": "stagger",
        "duration": 0.6,
        "delay": 0.1
      },
      "pagination": {
        "enabled": true,
        "itemsPerPage": 12
      },
      "filter": {
        "enabled": true,
        "categories": ["portfolio", "case-studies", "team"]
      }
    }
  ],
  "meta": {
    "total": 3
  }
}
```

### POST /api/media/optimize

Optimizes images for different formats and sizes.

**Request Body**:

```json
{
  "src": "/imgs/original-image.jpg",
  "formats": ["webp", "avif"],
  "sizes": [640, 800, 1200],
  "quality": 80,
  "progressive": true
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "original": {
      "src": "/imgs/original-image.jpg",
      "size": 2048576,
      "format": "jpeg"
    },
    "optimized": [
      {
        "src": "/imgs/original-image-640w.webp",
        "size": 245760,
        "format": "webp",
        "width": 640,
        "height": 480,
        "quality": 80
      },
      {
        "src": "/imgs/original-image-800w.webp",
        "size": 384000,
        "format": "webp",
        "width": 800,
        "height": 600,
        "quality": 80
      },
      {
        "src": "/imgs/original-image-1200w.webp",
        "size": 691200,
        "format": "webp",
        "width": 1200,
        "height": 900,
        "quality": 80
      }
    ],
    "savings": {
      "percentage": 62.5,
      "bytes": 1280000
    }
  }
}
```

## Content API

### GET /api/content

Retrieves all content sections for the website.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "hero-homepage",
      "type": "hero",
      "title": "Elite Enterprise Architects. Startup Speed.",
      "subtitle": "Get Fortune 500 Software Expertise Without the Overhead",
      "content": "Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent",
      "ctaText": "Get a Free Consultation",
      "ctaLink": "/contact",
      "background": "gradient-blue-indigo",
      "order": 1,
      "isActive": true
    }
  ]
}
```

## SEO API

### GET /api/seo

Retrieves SEO metadata for all pages.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "homepage-seo",
      "page": "home",
      "title": "BestIT Consulting - Elite IT Outsourcing & AI Consulting",
      "description": "Empowering businesses with elite IT consulting, outsourcing solutions, and AI innovation.",
      "keywords": [
        "IT Outsourcing Canada",
        "AI Consulting Services",
        "Global Software Development"
      ],
      "ogTitle": "BestIT Consulting - Elite IT Outsourcing & AI Consulting",
      "ogDescription": "Empowering businesses with elite IT consulting, outsourcing solutions, and AI innovation.",
      "ogImage": "/images/og-homepage.jpg",
      "canonicalUrl": "https://bestitconsulting.com"
    }
  ]
}
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE",
  "details": {
    "timestamp": "2024-12-19T10:30:00.000Z",
    "statusCode": 500
  }
}
```

## Common Error Codes

- `TEAM_MEMBER_NOT_FOUND`: Team member with specified ID not found
- `CASE_STUDY_NOT_FOUND`: Case study with specified ID not found
- `SERVICE_CATEGORY_NOT_FOUND`: Service category with specified ID not found
- `INTERNAL_SERVER_ERROR`: Generic server error
- `VALIDATION_ERROR`: Request validation failed

## Rate Limiting

Currently, no rate limiting is implemented. This may be added in future versions.

## Authentication

Currently, no authentication is required for API endpoints. This may be added in future versions for
administrative functions.

## CORS

All API endpoints support CORS for cross-origin requests.

## Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "data": <response_data>,
  "meta": {
    "total": <total_count>,
    "page": <current_page>,
    "limit": <items_per_page>
  }
}
```

## Data Validation

All API endpoints validate input data using the validation utilities in `src/lib/validation.ts`.

## Performance

- All endpoints are optimized for performance
- Response times are monitored and logged
- Caching strategies may be implemented in future versions
