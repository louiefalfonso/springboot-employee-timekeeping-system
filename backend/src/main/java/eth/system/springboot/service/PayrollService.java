package eth.system.springboot.service;

import eth.system.springboot.dto.PayrollDto;

import java.util.List;

public interface PayrollService {

    PayrollDto createNewPayroll (PayrollDto payrollDto);

    PayrollDto getPayrollById (Long payrollId);

    List<PayrollDto> getAllPayrolls();

    PayrollDto updatePayroll (Long payrollId, PayrollDto updatePayroll);

    void deletePayroll(Long payrollId);
}
