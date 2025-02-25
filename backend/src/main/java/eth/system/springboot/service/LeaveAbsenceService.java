package eth.system.springboot.service;

import eth.system.springboot.dto.LeaveAbsenceDto;

import java.util.List;

public interface LeaveAbsenceService {

    LeaveAbsenceDto createNewLeaveAbsence(LeaveAbsenceDto leaveAbsenceDto);

    LeaveAbsenceDto getLeaveAbsenceById(Long leaveAbsenceId);

    List<LeaveAbsenceDto> getAllLeaveAbsences();

    LeaveAbsenceDto updateLeaveAbsence(Long leaveAbsenceId, LeaveAbsenceDto updateLeaveAbsence);

    void deleteLeaveAbsence(Long leaveAbsenceId);
}
