import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'events.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Không thể đọc dữ liệu' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const events = await request.json()
    await fs.writeFile(dataFilePath, JSON.stringify(events, null, 2))
    return NextResponse.json({ message: 'Dữ liệu đã được lưu' });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lưu dữ liệu' }, { status: 500 });
  }
}

