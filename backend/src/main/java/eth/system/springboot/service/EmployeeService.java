package eth.system.springboot.service;

import eth.system.springboot.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createNewEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee);

    void deleteEmployee(Long employeeId);

}
