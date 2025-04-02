package eth.system.springboot.service;

import eth.system.springboot.dto.PayrollDto;

public interface PayrollService {

    PayrollDto createNewPayroll (PayrollDto payrollDto);
}
