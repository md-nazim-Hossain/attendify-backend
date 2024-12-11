const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return currentTime;
};

const getTodayRange = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  return { startOfDay, endOfDay };
};

const getAttendanceStatus = (
  officeStartTime: string,
  officeEndTime: string
) => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [hour, minute] = officeStartTime.split(':');
  const [endHour, endMinute] = officeEndTime.split(':');
  const startTime = parseInt(hour) * 60 + parseInt(minute);
  const gracePeriod = startTime + 16;
  const halfDayPeriod = gracePeriod + 45 + 179;
  const timeStatus = [
    { status: 'delay', start: startTime, end: gracePeriod }, // 9:00 AM - 9:16 AM
    { status: 'late', start: gracePeriod, end: gracePeriod + 45 }, // 9:16 AM - 10:01 AM
    { status: 'half_day', start: gracePeriod + 45, end: halfDayPeriod }, // 10:01 AM - 1:00 PM
    {
      status: 'absent',
      start: halfDayPeriod,
      end: parseInt(endHour) * 60 + parseInt(endMinute),
    },
  ];

  const status =
    timeStatus.find(
      (entry) => currentTime >= entry.start && currentTime < entry.end
    )?.status || 'present';

  return status;
};

export const DateTimeHelpers = {
  getCurrentTime,
  getTodayRange,
  getAttendanceStatus,
};
