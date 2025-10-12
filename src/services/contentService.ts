import { ContentSection, ContentSectionResponse } from '@/types/content'

export class ContentService {
  private static contentSections: ContentSection[] = []

  static async getAllContentSections(): Promise<ContentSectionResponse> {
    try {
      return {
        success: true,
        data: this.contentSections,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch content sections',
        code: 'CONTENT_SECTIONS_FETCH_ERROR',
      }
    }
  }

  static setContentSections(sections: ContentSection[]): void {
    this.contentSections = sections
  }
}
