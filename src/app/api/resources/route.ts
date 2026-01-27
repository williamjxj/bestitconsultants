import { NextResponse } from 'next/server'

import { R2ClientService } from '@/services/r2-client'
import { R2ConfigurationModel } from '@/types/r2-config'

/**
 * GET /api/resources
 * List all resources from R2 bucket 'resources' folder
 */
export async function GET() {
  try {
    // Initialize R2 client
    const config = R2ConfigurationModel.fromEnvironment()
    const r2Client = new R2ClientService(config)

    // List objects in the 'resources' folder
    const prefix = 'resources/'
    const result = await r2Client.listObjects(prefix, 1000)

    // Filter out folder entries (keys ending with /) and format the response
    const resources = result.objects
      .filter(obj => obj.key !== prefix && !obj.key.endsWith('/'))
      .map(obj => {
        const fileName = obj.key.replace(prefix, '')
        const extension = fileName.split('.').pop()?.toLowerCase() || ''

        // Determine file type and icon
        let fileType: 'video' | 'audio' | 'document' | 'image' | 'other' =
          'other'
        if (['mp4', 'webm', 'mov', 'avi'].includes(extension)) {
          fileType = 'video'
        } else if (['mp3', 'm4a', 'wav', 'ogg', 'aac'].includes(extension)) {
          fileType = 'audio'
        } else if (['pdf', 'doc', 'docx', 'txt'].includes(extension)) {
          fileType = 'document'
        } else if (
          ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension)
        ) {
          fileType = 'image'
        }

        return {
          key: obj.key,
          fileName,
          extension,
          fileType,
          size: obj.size,
          lastModified: obj.lastModified.toISOString(),
          url: config.getObjectUrl(obj.key),
        }
      })
      .sort((a, b) => a.fileName.localeCompare(b.fileName))

    return NextResponse.json({
      success: true,
      resources,
      count: resources.length,
    })
  } catch (error) {
    console.error('Error fetching resources from R2:', error)

    // Return empty array if R2 is not configured or there's an error
    return NextResponse.json(
      {
        success: false,
        resources: [],
        count: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
