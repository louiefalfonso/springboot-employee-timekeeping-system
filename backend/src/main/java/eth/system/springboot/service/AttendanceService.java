package eth.system.springboot.service;

import eth.system.springboot.dto.AttendanceDto;

import java.util.List;

public interface AttendanceService {

    AttendanceDto createNewAttendance(AttendanceDto attendanceDto);

    AttendanceDto gerAttendanceById(Long attendanceId);

    List<AttendanceDto> getAllAttendances();

    AttendanceDto updateAttendance(Long attendanceId, AttendanceDto updateAttendance);

    void deleteAttendance(Long attendanceId);
}
