const employeeAttendanceSearchFields = [
  'employeeId',
  'status',
  'device',
  'browser',
  'ip',
];

const employeeAttendanceFilterableFields = [
  'searchTerm',
  'status',
  'employeeId',
  'checkInLocation',
  'checkOutLocation',
  'checkInTime',
  'checkOutTime',
  'device',
  'browser',
];

export const EmployeeAttendanceConstant = {
  employeeAttendanceFilterableFields,
  employeeAttendanceSearchFields,
};
