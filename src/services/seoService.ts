import { SEOMetadata, SEOMetadataResponse } from '@/types/seo'

export class SEOService {
  private static seoMetadata: SEOMetadata[] = []

  static async getAllSEOMetadata(): Promise<SEOMetadataResponse> {
    try {
      return {
        success: true,
        data: this.seoMetadata,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch SEO metadata',
        code: 'SEO_METADATA_FETCH_ERROR',
      }
    }
  }

  static setSEOMetadata(metadata: SEOMetadata[]): void {
    this.seoMetadata = metadata
  }
}
