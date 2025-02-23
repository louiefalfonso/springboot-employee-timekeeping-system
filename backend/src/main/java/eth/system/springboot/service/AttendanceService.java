package eth.system.springboot.service;

import eth.system.springboot.dto.AttendanceDto;

public interface AttendanceService {

    AttendanceDto createNewAttendance(AttendanceDto attendanceDto);

    AttendanceDto gerAttendanceById(Long attendanceId);
}
