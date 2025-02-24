package eth.system.springboot.service.impl;

import eth.system.springboot.dto.LeaveAbsenceDto;
import eth.system.springboot.entity.LeaveAbsence;
import eth.system.springboot.repository.LeaveAbsenceRepository;
import eth.system.springboot.service.LeaveAbsenceService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
}
