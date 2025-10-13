# Data Model: Cloudflare R2 Image Migration

**Feature**: Use Cloudflare R2 Static Buckets to Replace @R2 bucket static-assets Folder **Date**:
2025-01-27 **Status**: Design Complete

## Entity Definitions

### ImageAsset

Represents a media file stored in cloud storage with metadata and access information.

**Fields**:

- `id: string` - Unique identifier for the image asset
- `filename: string` - Original filename (e.g., "istockphoto-1212876953-612x612.jpg")
- `path: string` - URL path used by application (e.g.,
  "https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg")
- `format: ImageFormat` - Image format (JPG, PNG, WEBP)
- `size: number` - File size in bytes
- `width: number` - Image width in pixels
- `height: number` - Image height in pixels
- `altText: string` - Accessibility alt text
- `r2Key: string` - R2 bucket object key
- `r2Url: string` - Full R2 CDN URL
- `localPath: string` - Local file system path (for fallback)
- `isMigrated: boolean` - Migration status flag
- `lastAccessed: Date` - Last access timestamp
- `createdAt: Date` - Asset creation timestamp
- `updatedAt: Date` - Last modification timestamp

**Validation Rules**:

- `filename` must match pattern: `^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp)$`
- `path` must start with "R2 bucket "
- `size` must be > 0 and < 10MB
- `width` and `height` must be > 0
- `r2Key` must be unique within bucket

**State Transitions**:

```
local → migrating → r2 → fallback → local
```

### R2Configuration

Configuration settings for Cloudflare R2 integration.

**Fields**:

- `accountId: string` - Cloudflare account ID
- `accessKeyId: string` - R2 access key ID
- `secretAccessKey: string` - R2 secret access key
- `bucketName: string` - R2 bucket name
- `publicUrl: string` - Public CDN URL for bucket
- `region: string` - R2 region (default: "auto")
- `endpoint: string` - R2 API endpoint
- `isEnabled: boolean` - Whether R2 is currently enabled
- `fallbackEnabled: boolean` - Whether local fallback is enabled

**Validation Rules**:

- All fields except `isEnabled` and `fallbackEnabled` are required
- `publicUrl` must be a valid HTTPS URL
- `bucketName` must be unique and follow R2 naming conventions

### ImageCache

In-memory cache for frequently accessed images to improve performance.

**Fields**:

- `key: string` - Cache key (image path)
- `data: Buffer` - Image binary data
- `contentType: string` - MIME type (image/jpeg, image/png, image/webp)
- `lastModified: Date` - Last modification time
- `expiresAt: Date` - Cache expiration time
- `hitCount: number` - Number of cache hits
- `size: number` - Cached data size in bytes

**Validation Rules**:

- `key` must be unique
- `expiresAt` must be in the future
- `hitCount` must be >= 0
- `size` must match actual buffer size

## Relationships

### ImageAsset ↔ R2Configuration

- **One-to-Many**: One R2 configuration serves multiple image assets
- **Relationship**: `ImageAsset.r2Url` references `R2Configuration.publicUrl`

### ImageAsset ↔ ImageCache

- **One-to-One**: Each image asset can have one cache entry
- **Relationship**: `ImageCache.key` matches `ImageAsset.path`

## Data Flow

### Image Request Flow

```
1. Request: GET https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/filename.jpg
2. Check: ImageAsset.isMigrated
3. If migrated: Serve from R2Configuration.publicUrl
4. If not migrated: Serve from local fallback
5. Update: ImageAsset.lastAccessed
```

### Migration Flow

```
1. Read: ImageAsset from local filesystem
2. Upload: ImageAsset to R2Configuration.bucketName
3. Update: ImageAsset.r2Url, ImageAsset.isMigrated = true
4. Cache: Store in ImageCache for performance
5. Verify: Test image accessibility from R2
```

### Fallback Flow

```
1. Error: R2 request fails
2. Check: ImageCache for cached version
3. If cached: Serve from ImageCache.data
4. If not cached: Serve from ImageAsset.localPath
5. Log: Fallback usage for monitoring
```

## State Management

### ImageAsset States

- **local**: Image exists only in local filesystem
- **migrating**: Image is being uploaded to R2
- **r2**: Image is successfully stored in R2
- **fallback**: R2 unavailable, serving from local/cache
- **error**: Migration failed, requires manual intervention

### R2Configuration States

- **disabled**: R2 integration is turned off
- **enabled**: R2 integration is active
- **maintenance**: R2 is temporarily unavailable
- **error**: Configuration or connectivity issues

## Validation Rules

### Image Format Validation

```typescript
const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'webp'] as const
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MIN_DIMENSIONS = 1
const MAX_DIMENSIONS = 8192
```

### URL Path Validation

```typescript
const IMAGE_PATH_PATTERN = /^R2 bucket [a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp)$/
const R2_KEY_PATTERN = /^imgs\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp)$/
```

### Cache Validation

```typescript
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours
const MAX_CACHE_SIZE = 100 * 1024 * 1024 // 100MB
const MAX_CACHE_ENTRIES = 1000
```

## Error Handling

### Image Not Found

- **Local**: Return 404 with fallback message
- **R2**: Attempt local fallback, then return 404
- **Cache**: Attempt R2, then local, then return 404

### R2 Service Unavailable

- **Immediate**: Switch to local fallback
- **Logging**: Record service outage for monitoring
- **Recovery**: Automatic retry with exponential backoff

### Configuration Errors

- **Invalid Credentials**: Disable R2, use local only
- **Bucket Access**: Log error, continue with local
- **Network Issues**: Implement retry logic with fallback

## Performance Considerations

### Caching Strategy

- **L1 Cache**: In-memory ImageCache for hot images
- **L2 Cache**: R2 CDN for global distribution
- **L3 Cache**: Local filesystem for cold storage

### Optimization Rules

- **Image Compression**: Use Next.js Image component optimization
- **Format Selection**: Serve WebP when supported, fallback to original
- **Lazy Loading**: Implement progressive image loading
- **Preloading**: Preload critical images (hero, above-fold)

### Monitoring Metrics

- **Cache Hit Rate**: Target >90% for frequently accessed images
- **Response Time**: Target <200ms for cached images
- **Error Rate**: Target <0.1% for image loading failures
- **Bandwidth Usage**: Monitor R2 vs local bandwidth consumption
