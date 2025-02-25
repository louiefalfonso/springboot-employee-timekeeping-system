package eth.system.springboot.controller;

import eth.system.springboot.dto.LeaveAbsenceDto;
import eth.system.springboot.entity.LeaveAbsence;
import eth.system.springboot.repository.LeaveAbsenceRepository;
import eth.system.springboot.service.LeaveAbsenceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/leave-absences")
public class LeaveAbsenceController {

    private LeaveAbsenceService leaveAbsenceService;
    private LeaveAbsenceRepository leaveAbsenceRepository;

    //POST - Create New Leave / Absence REST API
    @PostMapping
    public ResponseEntity<LeaveAbsenceDto> createNewLeaveAbsence(@RequestBody LeaveAbsenceDto leaveAbsenceDto){
        LeaveAbsenceDto savedLeaveAbsence = leaveAbsenceService.createNewLeaveAbsence(leaveAbsenceDto);
        return new ResponseEntity<>(savedLeaveAbsence, HttpStatus.CREATED);
    }

    //GET - Get Leave / Absence By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<LeaveAbsence> getLeaveAbsenceById(@PathVariable ("id") Long id){
        LeaveAbsence leaveAbsence = leaveAbsenceRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Leave / Absence doesn't exist with a given Id:" + id));
        return ResponseEntity.ok(leaveAbsence);
    }

    //GET - Get All Leave / Absence REST API
    @GetMapping
    public  ResponseEntity<List<LeaveAbsenceDto>> getAllLeaveAbsences(){
        List<LeaveAbsenceDto> leaveAbsences = leaveAbsenceService.getAllLeaveAbsences();
        return ResponseEntity.ok(leaveAbsences);
    }

    //UPDATE - Update Leave / Absence REST API
    @PutMapping("{id}")
    public ResponseEntity<LeaveAbsence> updateLeaveAbsence(@PathVariable("id") Long id,
                                                           @RequestBody LeaveAbsence leaveAbsenceDetails){
        LeaveAbsence updateLeaveAbsence = leaveAbsenceRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Leave / Absence does not exist with id: " + id));

        updateLeaveAbsence.setStartDate(leaveAbsenceDetails.getStartDate());
        updateLeaveAbsence.setEndDate(leaveAbsenceDetails.getEndDate());
        updateLeaveAbsence.setLeaveType(leaveAbsenceDetails.getLeaveType());
        updateLeaveAbsence.setStatus(leaveAbsenceDetails.getStatus());
        updateLeaveAbsence.setReasonForLeave(leaveAbsenceDetails.getReasonForLeave());
        updateLeaveAbsence.setEmployee(leaveAbsenceDetails.getEmployee());

        leaveAbsenceRepository.save(updateLeaveAbsence);
        return ResponseEntity.ok(updateLeaveAbsence);
    }

    //DELETE - Delete Leave / Absence REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLeaveAbsence(@PathVariable ("id") Long leaveAbsenceId){
       leaveAbsenceService.deleteLeaveAbsence(leaveAbsenceId);
       return ResponseEntity.ok("Leave / Absence Deleted Successfully");
    }

}
