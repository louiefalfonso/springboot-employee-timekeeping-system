package eth.system.springboot.controller;
import eth.system.springboot.dto.EmployeeDto;
import eth.system.springboot.entity.Employee;
import eth.system.springboot.repository.EmployeeRepository;
import eth.system.springboot.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    private EmployeeRepository employeeRepository;
    private EmployeeService employeeService;

    //POST - Create New Employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createNewEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee = employeeService.createNewEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //GET - Get Employee By ID REST API
    @GetMapping("{id}")
    public  ResponseEntity<Employee> getEmployeeById(@PathVariable ("id")  Long id){
        Employee employee = employeeRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Employee does not exist with Id:" + id));
        return ResponseEntity.ok(employee);
    }

    //GET - Get All Employees REST API
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    //UPDATE - Update Employee REST API
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long id,
                                                   @RequestBody Employee employeeDetails){
        Employee updateEmployee = employeeRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Employee does not exist with id: " + id));

        updateEmployee.setFirstName(employeeDetails.getFirstName());
        updateEmployee.setLastName(employeeDetails.getLastName());
        updateEmployee.setEmployeeNumber(employeeDetails.getEmployeeNumber());
        updateEmployee.setPosition(employeeDetails.getPosition());
        updateEmployee.setEmailAddress(employeeDetails.getEmailAddress());
        updateEmployee.setPhoneNumber(employeeDetails.getPhoneNumber());
        updateEmployee.setEmployeeStatus(employeeDetails.getEmployeeStatus());
        updateEmployee.setDateOfBirth(employeeDetails.getDateOfBirth());
        updateEmployee.setDepartment(employeeDetails.getDepartment());

        employeeRepository.save(updateEmployee);
        return ResponseEntity.ok(updateEmployee);
    }

    //DELETE - Delete Employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable ("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee Deleted Successfully");
    }
}

