import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lịch học Giáo viên - Học viên',
  description: 'Đặt lịch học và xem lịch bận của giáo viên',
}

export default function RootLayout({
  children
}) {
  return (
    (<html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>)
  );
}

