package eth.system.springboot.Controller;

import eth.system.springboot.controller.EmployeeController;
import eth.system.springboot.dto.EmployeeDto;
import eth.system.springboot.entity.Employee;
import eth.system.springboot.repository.EmployeeRepository;
import eth.system.springboot.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class EmployeeControllerUnitTests {

    @Mock
    private EmployeeService employeeService;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeController employeeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Order(1)
    @DisplayName("Test 1: Create New Employee - Success")
    void createNewEmployee_Success() {

        // Arrange
        EmployeeDto inputEmployeeDto = new EmployeeDto();
        inputEmployeeDto.setFirstName("Claire");
        inputEmployeeDto.setLastName("Jones");
        inputEmployeeDto.setEmployeeNumber("SYS-3543-2759");
        inputEmployeeDto.setPosition("Marketing Trainee");
        inputEmployeeDto.setEmailAddress("clairejones@gmail.com");
        inputEmployeeDto.setPhoneNumber("07-3427-960453");
        inputEmployeeDto.setEmployeeStatus("Contract");
        inputEmployeeDto.setDateOfBirth("02-24-2025");
        inputEmployeeDto.setDepartment(1L);


        EmployeeDto savedEmployeeDto = new EmployeeDto();
        savedEmployeeDto.setFirstName("Claire");
        savedEmployeeDto.setLastName("Jones");
        savedEmployeeDto.setEmployeeNumber("SYS-3543-2759");
        savedEmployeeDto.setPosition("Marketing Trainee");
        savedEmployeeDto.setEmailAddress("clairejones@gmail.com");
        savedEmployeeDto.setPhoneNumber("07-3427-960453");
        savedEmployeeDto.setEmployeeStatus("Contract");
        savedEmployeeDto.setDateOfBirth("02-24-2025");
        savedEmployeeDto.setDepartment(1L);

        when(employeeService.createNewEmployee(inputEmployeeDto)).thenReturn(savedEmployeeDto);

        // Act
        ResponseEntity<EmployeeDto> response = employeeController.createNewEmployee(inputEmployeeDto);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedEmployeeDto, response.getBody());

        // Verify
        verify(employeeService, times(1)).createNewEmployee(inputEmployeeDto);
    }

    @Test
    @Order(2)
    @DisplayName("Test 2: Create New Employee - Null Input")
    void createNewEmployee_NullInput(){
        // Arrange
        when(employeeService.createNewEmployee(null)).thenReturn(null);

        // Act
        ResponseEntity<EmployeeDto> response = employeeController.createNewEmployee(null);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNull(response.getBody());

        // verify
        verify(employeeService, times(1)).createNewEmployee(null);


    }

    @Test
    @Order(3)
    @DisplayName("Test 3: Create New Employee - Service Throws Exception")
    void createNewEmployee_ServiceThrowsException(){
        // Arrange
        EmployeeDto inputEmployeeDto = new EmployeeDto();
        inputEmployeeDto.setEmployeeNumber("SYS-3543-2759");
        when(employeeService.createNewEmployee(inputEmployeeDto)).thenThrow(new RuntimeException("Service Error"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> employeeController.createNewEmployee(inputEmployeeDto));
        assertEquals("Service Error", exception.getMessage());

        // Verify
        verify(employeeService, times(1)).createNewEmployee(inputEmployeeDto);

    }

    @Test
    @Order(4)
    @DisplayName("Test 4: Get All Employees - Success")
    void getAllEmployees_Success() {

        // Arrange
        EmployeeDto employeeDto1 = new EmployeeDto();
        employeeDto1.setFirstName("John");
        employeeDto1.setLastName("Doe");
        employeeDto1.setEmployeeNumber("SYS-1234-5678");
        employeeDto1.setPosition("Software Engineer");
        employeeDto1.setEmailAddress("johndoe@gmail.com");
        employeeDto1.setPhoneNumber("07-1234-567890");
        employeeDto1.setEmployeeStatus("Full-time");

        EmployeeDto employeeDto2 = new EmployeeDto();
        employeeDto2.setFirstName("Jane");
        employeeDto2.setLastName("Doe");
        employeeDto2.setEmployeeNumber("SYS-9012-3456");
        employeeDto2.setPosition("Marketing Manager");
        employeeDto2.setEmailAddress("janedoe@gmail.com");
        employeeDto2.setPhoneNumber("07-9012-345678");
        employeeDto2.setEmployeeStatus("Contract");

        List<EmployeeDto> employeeLists = Arrays.asList(employeeDto1, employeeDto2);

        when(employeeService.getAllEmployees()).thenReturn(employeeLists);

        // Act
        ResponseEntity<List<EmployeeDto>> response = employeeController.getAllEmployees();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertTrue(response.getBody().contains(employeeDto1));
        assertTrue(response.getBody().contains(employeeDto2));

        // Verify
        verify(employeeService, times(1)).getAllEmployees();
    }


    @Test
    @Order(5)
    @DisplayName("Test 5: Get Asset By Id - When Employee Exists")
    void getEmployeeById(){
        // Arrange
        Long employeeId = 1L;
        Employee mockEmployee = new Employee();
        mockEmployee.setId(employeeId);
        mockEmployee.setEmployeeNumber("SYS-3543-2759");

        // Mock the behavior of employeeRepository.findAllById()
        when(employeeRepository.findAllById(employeeId)).thenReturn(Optional.of(mockEmployee));

        // Act
        ResponseEntity<Employee> response = employeeController.getEmployeeById(employeeId);

        // Assert
        assertEquals(200, response.getStatusCodeValue()); // Verify status code is 200 OK
        assertNotNull(response.getBody()); // Verify response body is not null
        assertEquals(mockEmployee, response.getBody()); // Verify the response body matches the mock employee
    }
}
