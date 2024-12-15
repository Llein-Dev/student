import { NextResponse } from 'next/server';

const JSONBIN_API_URL = 'https://api.jsonbin.io/v3/b';
const JSONBIN_API_KEY = '$2a$10$Uy6dT.JQCIUuxZdO2O6FR.IgrMiTrOVf2Jmfd5e9aaFlEbEbjpTWe'; // Đặt API Key của bạn vào đây
const BIN_ID = '675f10adad19ca34f8db8f69'; // Thay 'YOUR_BIN_ID' bằng ID của bin

export async function GET() {
  try {
    const response = await fetch(`${JSONBIN_API_URL}/${BIN_ID}`, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY,
      },
    });
    if (!response.ok) throw new Error('Không thể đọc dữ liệu');
    const data = await response.json();
    return NextResponse.json(data.record);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể đọc dữ liệu' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const events = await request.json();
    const response = await fetch(`${JSONBIN_API_URL}/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY,
      },
      body: JSON.stringify(events),
    });
    if (!response.ok) throw new Error('Không thể lưu dữ liệu');
    return NextResponse.json({ message: 'Dữ liệu đã được lưu' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
