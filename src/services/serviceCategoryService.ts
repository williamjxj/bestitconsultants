import { ServiceCategory, ServiceCategoryResponse } from '@/types/service'

export class ServiceCategoryService {
  private static serviceCategories: ServiceCategory[] = []

  static async getAllServiceCategories(): Promise<ServiceCategoryResponse> {
    try {
      return {
        success: true,
        data: this.serviceCategories,
        meta: {
          total: this.serviceCategories.length,
        },
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch service categories',
        code: 'SERVICE_CATEGORIES_FETCH_ERROR',
      }
    }
  }

  static async getServiceCategoryById(
    id: string
  ): Promise<ServiceCategoryResponse> {
    try {
      const service = this.serviceCategories.find(s => s.id === id)

      if (!service) {
        return {
          success: false,
          message: 'Service category not found',
          code: 'SERVICE_CATEGORY_NOT_FOUND',
        }
      }

      return {
        success: true,
        data: service,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch service category',
        code: 'SERVICE_CATEGORY_FETCH_ERROR',
      }
    }
  }

  static setServiceCategories(services: ServiceCategory[]): void {
    this.serviceCategories = services
  }
}
