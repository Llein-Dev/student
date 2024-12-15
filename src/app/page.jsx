"use client";
import { useState, useEffect } from 'react';
import { Login } from '@/components/login';
import { Scheduler } from '@/components/scheduler';
import moment from 'moment';

export default function Home() {
  const [role, setRole] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Không thể tải dữ liệu sự kiện');
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu sự kiện:', error);
    }
  };

  const saveEvents = async (updatedEvents) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvents),
      });
      if (!response.ok) {
        console.error('Không thể lưu dữ liệu sự kiện');
      }
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu sự kiện:', error);
    }
  };

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSelectSlot = (slotInfo) => {
    let updatedEvents;

    if (slotInfo.action === 'delete') {
      updatedEvents = events.filter(event => event !== slotInfo.eventToDelete);
    } else {
      const newEvent = {
        start: moment(slotInfo.start).toDate(),
        end: moment(slotInfo.end).toDate(),
        title: role === 'teacher' 
          ? 'Giáo viên bận' 
          : `${role === 'studentA' ? 'Môn Excel' : 'Nhập môn lập trình'} đã đặt lịch`,
      };
      updatedEvents = [...events, newEvent];
    }

    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  if (!role) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl  font-bold text-blue-900 mb-6">Lịch học Giáo viên - Học viên</h1>
        <p className="mb-4 text-gray-600">Vui lòng đăng nhập để quản lý lịch học</p>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-100">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Lịch học Giáo viên - Học viên</h1>
        <p className="text-gray-700">Vai trò của bạn: <span className="font-semibold">{role === 'teacher' ? 'Giáo viên' : role === 'studentA' ? 'Học viên (Excel)' : 'Học viên (Lập trình)'}</span></p>
      </header>

      <main className="bg-white shadow-md rounded-lg p-4">
        <Scheduler role={role} events={events} onSelectSlot={handleSelectSlot} />
      </main>

      <footer className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} Lein TSI - Bản quyền thuộc về Lein
      </footer>
    </div>
  );
}