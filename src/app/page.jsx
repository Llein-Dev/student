"use client";
import { useState, useEffect } from 'react'
import { Login } from '@/components/login'
import { Scheduler } from '@/components/scheduler'
import moment from 'moment'

export default function Home() {
  const [role, setRole] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      } else {
        console.error('Không thể tải dữ liệu sự kiện')
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu sự kiện:', error)
    }
  }

  const saveEvents = async (updatedEvents) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvents),
      })
      if (!response.ok) {
        console.error('Không thể lưu dữ liệu sự kiện')
      }
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu sự kiện:', error)
    }
  }

  const handleLogin = (selectedRole) => {
    setRole(selectedRole)
  }

  const handleSelectSlot = (slotInfo) => {
    let updatedEvents

    if (slotInfo.action === 'delete') {
      updatedEvents = events.filter(event => event !== slotInfo.eventToDelete)
    } else {
      const newEvent = {
        start: moment(slotInfo.start).toDate(),
        end: moment(slotInfo.end).toDate(),
        title: role === 'teacher' ? 'Giáo viên bận' : `${role === 'studentA' ? 'Môn Excel' : 'Nhập môn lập trình'} đã đặt lịch`,
      }
      updatedEvents = [...events, newEvent]
    }

    setEvents(updatedEvents)
    saveEvents(updatedEvents)
  }

  if (!role) {
    return (
      (<div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lịch học Giáo viên - Học viên</h1>
        <Login onLogin={handleLogin} />
      </div>)
    );
  }

  return (
    (<div className="container mx-auto border  p-4">
      <h1 className="text-2xl font-bold mb-4">Lịch học Giáo viên - Học viên</h1>
      <p className="mb-4">Đăng nhập với vai trò: {role === 'teacher' ? 'Giáo viên' : role === 'studentA' ? 'Môn Excel' : 'Nhập môn lập trình'}</p>
      <Scheduler role={role} events={events} onSelectSlot={handleSelectSlot} />
    </div>)
  );
}

