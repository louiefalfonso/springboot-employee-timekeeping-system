package eth.system.springboot.service.impl;

import eth.system.springboot.dto.EmployeeDto;
import eth.system.springboot.entity.Employee;
import eth.system.springboot.repository.EmployeeRepository;
import eth.system.springboot.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Employee
    @Override
    public EmployeeDto createNewEmployee(EmployeeDto employeeDto) {
        Employee employee = modelMapper.map(employeeDto, Employee.class);
        Employee savedEmployee = employeeRepository.save(employee);
        return modelMapper.map(savedEmployee, EmployeeDto.class);
    }

    // REST API - Get Employee By ID
    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
       Employee employee = employeeRepository.findAllById(employeeId)
               .orElseThrow(()-> new RuntimeException("Employee doesn't exist with a given Id:" + employeeId));
       return modelMapper.map(employeeId, EmployeeDto.class);
    }

    // REST API - Get All Employees
    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee -> modelMapper.map(employee, EmployeeDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Employee
    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee employee = employeeRepository.findAllById(employeeId)
                .orElseThrow(()-> new RuntimeException("Employee doesn't exist with a given Id:" + employeeId));

        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmployeeNumber(updateEmployee.getEmployeeNumber());
        employee.setPosition(updateEmployee.getPosition());
        employee.setDepartment(updateEmployee.getDepartment());

        Employee updateEmployeeObj = employeeRepository.save(employee);
        return modelMapper.map(updateEmployeeObj, EmployeeDto.class);
    }

    // REST API - Delete Employee
    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new RuntimeException("Employee doesn't exist with given id:" + employeeId));
        employee.setDeleted(true);
        employeeRepository.save(employee);
    }

    // REST API - Get All Deleted Employees
    @Override
    public List<EmployeeDto> getAllDeletedEmployees() {
        List<Employee> deletedEmployees = employeeRepository.findByDeletedId(true);
        return deletedEmployees.stream().map(employee -> modelMapper
                .map(employee, EmployeeDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Get Deleted Employee By ID
    @Override
    public EmployeeDto getDeletedEmployeedById(Long id) {
        Employee employee = employeeRepository.findByIdAndDeleted(id, true)
                .orElseThrow(()-> new RuntimeException("Deleted Employee doesn't exist with a given Id:" + id));
        return modelMapper.map(employee, EmployeeDto.class);
    }
}
