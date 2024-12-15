"use client";
import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/vi'
import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('vi')
const localizer = momentLocalizer(moment)

const messages = {
  allDay: 'Cả ngày',
  previous: 'Trước',
  next: 'Sau',
  today: 'Hôm nay',
  month: 'Tháng',
  week: 'Tuần',
  day: 'Ngày',
  agenda: 'Lịch trình',
  date: 'Ngày',
  time: 'Thời gian',
  event: 'Sự kiện',
}

export function Scheduler({
  role,
  events,
  onSelectSlot
}) {
  const [view, setView] = useState('month')

  const handleSelectSlot = (slotInfo) => {
    const existingEvent = events.find(event => 
      moment(event.start).isSame(slotInfo.start, 'day') && 
      event.title === (role === 'teacher' ? 'Giáo viên bận' : `${role === 'studentA' ? 'Học viên A' : 'Học viên B'} đã đặt lịch`))

    if (existingEvent) {
      // Nếu sự kiện đã tồn tại, xóa nó
      onSelectSlot({ ...slotInfo, action: 'delete', eventToDelete: existingEvent })
    } else if (role === 'teacher' || !events.some(event => 
      moment(event.start).isSame(slotInfo.start, 'day') && 
      (event.title === 'Giáo viên bận' || (event.title !== `${role === 'studentA' ? 'Học viên A' : 'Học viên B'} đã đặt lịch`)))) {
      // Nếu là giáo viên hoặc ngày chưa được đặt, thêm sự kiện mới
      onSelectSlot({ ...slotInfo, action: 'add' })
    }
  }

  const formattedEvents = events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }))

  return (
    (<div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        view={view}
        onView={(newView) => setView(newView)}
        messages={messages} />
    </div>)
  );
}

