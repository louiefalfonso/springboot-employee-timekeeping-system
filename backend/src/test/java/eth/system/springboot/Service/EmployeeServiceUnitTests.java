package eth.system.springboot.Service;

import eth.system.springboot.dto.EmployeeDto;
import eth.system.springboot.entity.Employee;
import eth.system.springboot.repository.EmployeeRepository;
import eth.system.springboot.service.impl.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceUnitTests {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Order(1)
    @DisplayName("Test 1: Create New Employee - Successfully")
    void createNewEmployee_Successfully(){

        // Arrange
        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setFirstName("Claire");
        employeeDto.setLastName("Jones");
        employeeDto.setEmployeeNumber("SYS-3543-2759");
        employeeDto.setPosition("Marketing Trainee");
        employeeDto.setEmailAddress("clairejones@gmail.com");
        employeeDto.setPhoneNumber("07-3427-960453");
        employeeDto.setEmployeeStatus("Contract");
        employeeDto.setDateOfBirth("02-24-2025");
        employeeDto.setDepartment(1L);

        Employee employee = new Employee();
        Employee savedEmployee = new Employee();

        when(modelMapper.map(employeeDto, Employee.class)).thenReturn(employee);
        when(employeeRepository.save(employee)).thenReturn(savedEmployee);
        when(modelMapper.map(savedEmployee, EmployeeDto.class)).thenReturn(employeeDto);

        // Act
        EmployeeDto createEmployee = employeeService.createNewEmployee(employeeDto);

        // Assert
        assertEquals(employeeDto, createEmployee);
    }

}
