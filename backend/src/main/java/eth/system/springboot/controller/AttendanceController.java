package eth.system.springboot.controller;

import eth.system.springboot.dto.AttendanceDto;
import eth.system.springboot.entity.Attendance;
import eth.system.springboot.repository.AttendanceRepository;
import eth.system.springboot.service.AttendanceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/attendances")
public class AttendanceController {

    private AttendanceService attendanceService;
    private AttendanceRepository attendanceRepository;

    //POST - Create New Attendance REST API
    @PostMapping
    public ResponseEntity<AttendanceDto> createNewAttendance(@RequestBody AttendanceDto attendanceDto){
        AttendanceDto savedAttendance = attendanceService.createNewAttendance(attendanceDto);
        return new ResponseEntity<>(savedAttendance, HttpStatus.CREATED);
    }

    //GET - Get Attendance By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Attendance> gerAttendanceById(@PathVariable ("id") Long id){
        Attendance attendance = attendanceRepository.findAllById(id).orElseThrow(()-> new RuntimeException("Attendance does not exist with Id:" + id));
        return ResponseEntity.ok(attendance);
    }
}
