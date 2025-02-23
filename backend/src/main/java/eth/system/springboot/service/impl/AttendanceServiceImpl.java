package eth.system.springboot.service.impl;

import eth.system.springboot.dto.AttendanceDto;
import eth.system.springboot.entity.Attendance;
import eth.system.springboot.repository.AttendanceRepository;
import eth.system.springboot.service.AttendanceService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private AttendanceRepository attendanceRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Attendance
    @Override
    public AttendanceDto createNewAttendance(AttendanceDto attendanceDto) {
        Attendance attendance = modelMapper.map(attendanceDto, Attendance.class);
        Attendance savedAttendance = attendanceRepository.save(attendance);
        return modelMapper.map(savedAttendance, AttendanceDto.class);
    }

    // REST API - Get Attendance By ID
    @Override
    public AttendanceDto gerAttendanceById(Long attendanceId) {
        Attendance attendance = attendanceRepository.findAllById(attendanceId)
                .orElseThrow(()-> new RuntimeException("Attendance doesn't exist with a given Id:" + attendanceId));
        return modelMapper.map(attendanceId, AttendanceDto.class);
    }
}
