package eth.system.springboot.controller;

import eth.system.springboot.dto.AttendanceDto;
import eth.system.springboot.entity.Attendance;
import eth.system.springboot.repository.AttendanceRepository;
import eth.system.springboot.service.AttendanceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable ("id") Long id){
        Attendance attendance = attendanceRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Attendance does not exist with Id:" + id));
        return ResponseEntity.ok(attendance);
    }

    //GET - Get All Attendances REST API
    @GetMapping
    public ResponseEntity<List<AttendanceDto>> getAllAttendances(){
        List<AttendanceDto> attendances = attendanceService.getAllAttendances();
        return ResponseEntity.ok(attendances);
    }


    //UPDATE - Update Attendance REST API
    @PutMapping("{id}")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable ("id") long id,
                                                       @RequestBody Attendance attendanceDetails){
        Attendance updateAttendance = attendanceRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Department does not exist with id: " + id));

        updateAttendance.setDate(attendanceDetails.getDate());
        updateAttendance.setStatus(attendanceDetails.getStatus());
        updateAttendance.setReasonForAbsence(attendanceDetails.getReasonForAbsence());
        updateAttendance.setRemarks(attendanceDetails.getRemarks());
        updateAttendance.setEmployee(attendanceDetails.getEmployee());

        attendanceRepository.save(updateAttendance);
        return ResponseEntity.ok(updateAttendance);
    }

    //DELETE - Delete Attendance REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAttendance(@PathVariable ("id") Long attendanceId){
        attendanceService.deleteAttendance(attendanceId);
        return ResponseEntity.ok("Attendance Deleted Successfully");
    }
}
