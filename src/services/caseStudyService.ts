import {
  CaseStudy,
  CaseStudyResponse,
  CaseStudyMetricsResponse,
} from '@/types/case-study'

export class CaseStudyService {
  private static caseStudies: CaseStudy[] = []

  static async getAllCaseStudies(): Promise<CaseStudyResponse> {
    try {
      return {
        success: true,
        data: this.caseStudies,
        meta: {
          total: this.caseStudies.length,
          page: 1,
          limit: 10,
        },
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch case studies',
        code: 'CASE_STUDIES_FETCH_ERROR',
      }
    }
  }

  static async getCaseStudyById(id: string): Promise<CaseStudyResponse> {
    try {
      const caseStudy = this.caseStudies.find(c => c.id === id)

      if (!caseStudy) {
        return {
          success: false,
          message: 'Case study not found',
          code: 'CASE_STUDY_NOT_FOUND',
        }
      }

      return {
        success: true,
        data: caseStudy,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch case study',
        code: 'CASE_STUDY_FETCH_ERROR',
      }
    }
  }

  static async getCaseStudyMetrics(
    caseStudyId: string
  ): Promise<CaseStudyMetricsResponse> {
    try {
      const caseStudy = this.caseStudies.find(c => c.id === caseStudyId)

      if (!caseStudy) {
        return {
          success: false,
          message: 'Case study not found',
          code: 'CASE_STUDY_NOT_FOUND',
        }
      }

      return {
        success: true,
        data: caseStudy.metrics,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch case study metrics',
        code: 'CASE_STUDY_METRICS_FETCH_ERROR',
      }
    }
  }

  static setCaseStudies(caseStudies: CaseStudy[]): void {
    this.caseStudies = caseStudies
  }
}
