package eth.system.springboot.service.impl;

import eth.system.springboot.dto.LeaveAbsenceDto;
import eth.system.springboot.entity.LeaveAbsence;
import eth.system.springboot.repository.LeaveAbsenceRepository;
import eth.system.springboot.service.LeaveAbsenceService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LeaveAbsenceServiceImpl implements LeaveAbsenceService {

    private LeaveAbsenceRepository leaveAbsenceRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Leave / Absence
    @Override
    public LeaveAbsenceDto createNewLeaveAbsence(LeaveAbsenceDto leaveAbsenceDto) {
        LeaveAbsence leaveAbsence = modelMapper.map(leaveAbsenceDto, LeaveAbsence.class);
        LeaveAbsence savedLeaveAbsence = leaveAbsenceRepository.save(leaveAbsence);
        return modelMapper.map(savedLeaveAbsence, LeaveAbsenceDto.class);
    }

    // REST API - Get Leave / Absence By ID
    @Override
    public LeaveAbsenceDto getLeaveAbsenceById(Long leaveAbsenceId) {
       LeaveAbsence leaveAbsence = leaveAbsenceRepository.findAllById(leaveAbsenceId)
               .orElseThrow(()-> new RuntimeException("Leave / Absence doesn't exist with a given Id:" + leaveAbsenceId));
       return modelMapper.map(leaveAbsenceId, LeaveAbsenceDto.class);
    }

    // REST API - Get All Leave / Absence
    @Override
    public List<LeaveAbsenceDto> getAllLeaveAbsences() {
        List<LeaveAbsence> leaveAbsences = leaveAbsenceRepository.findAll();
        return leaveAbsences.stream().map((leaveAbsence -> modelMapper.map(leaveAbsence, LeaveAbsenceDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Leave / Absence
    @Override
    public LeaveAbsenceDto updateLeaveAbsence(Long leaveAbsenceId, LeaveAbsenceDto updateLeaveAbsence) {
        LeaveAbsence leaveAbsence = leaveAbsenceRepository.findAllById(leaveAbsenceId)
                .orElseThrow(()-> new RuntimeException("Leave / Absence doesn't exist with a given Id:" + leaveAbsenceId));

        leaveAbsence.setStartDate(updateLeaveAbsence.getStartDate());
        leaveAbsence.setEndDate(updateLeaveAbsence.getEndDate());
        leaveAbsence.setLeaveType(updateLeaveAbsence.getLeaveType());
        leaveAbsence.setStatus(updateLeaveAbsence.getStatus());
        leaveAbsence.setReasonForLeave(updateLeaveAbsence.getReasonForLeave());
        leaveAbsence.setEmployee(updateLeaveAbsence.getEmployee());

        LeaveAbsence updateLeaveAbsenceObj = leaveAbsenceRepository.save(leaveAbsence);
        return modelMapper.map(updateLeaveAbsenceObj, LeaveAbsenceDto.class);
    }

    // REST API - Delete Leave / Absence
    @Override
    public void deleteLeaveAbsence(Long leaveAbsenceId) {
        LeaveAbsence leaveAbsence = leaveAbsenceRepository.findAllById(leaveAbsenceId)
                .orElseThrow(()-> new RuntimeException("Leave / Absence doesn't exist with given id:" + leaveAbsenceId));
        leaveAbsenceRepository.deleteById(leaveAbsenceId);
    }

}
