package eth.system.springboot.service;

import eth.system.springboot.dto.LeaveAbsenceDto;

public interface LeaveAbsenceService {

    LeaveAbsenceDto createNewLeaveAbsence(LeaveAbsenceDto leaveAbsenceDto);

    LeaveAbsenceDto getLeaveAbsenceById(Long leaveAbsenceId);
}
