package eth.system.springboot.service;

import eth.system.springboot.dto.EmployeeDto;

public interface EmployeeService {

    EmployeeDto createNewEmployee(EmployeeDto employeeDto);
}
