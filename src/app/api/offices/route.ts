import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const officesDir = path.join(process.cwd(), 'public', 'offices')
    let files: string[] = []
    try {
      files = fs.readdirSync(officesDir)
    } catch {
      files = []
    }

    const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
    const images = files
      .filter(name => allowed.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map(name => `/offices/${name}`)

    return NextResponse.json({ success: true, images })
  } catch (err) {
    return NextResponse.json({ success: false, images: [] }, { status: 500 })
  }
}


