import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('vi');
const localizer = momentLocalizer(moment);

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
};

export function Scheduler({ role, events, onSelectSlot }) {
  const [view, setView] = useState('month');

  const handleSelectSlot = (slotInfo) => {
    console.log('Slot info:', slotInfo);
    console.log('Existing events:', events);
  
    const existingEvent = events.find(
      (event) =>
        moment(event.start).isSame(slotInfo.start, 'day') &&
        event.title ===
          (role === 'teacher'
            ? 'Giáo viên bận'
            : `${role === 'studentA' ? 'Môn Excel' : 'Nhập môn lập trình'} đã đặt lịch`)
    );
  
    if (existingEvent) {
      console.log('Event exists, deleting:', existingEvent);
      onSelectSlot({ ...slotInfo, action: 'delete', eventToDelete: existingEvent });
    } else {
      console.log('Adding new event');
      onSelectSlot({ ...slotInfo, action: 'add' });
    }
  };
  
  const formattedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <div className="scheduler-container">
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        view={view}
        onView={(newView) => setView(newView)}
        messages={messages}
        className="rounded-lg shadow-md bg-white p-4"
        style={{ height: '100%', minHeight: '500px' }}
      />
    </div>
  );
}