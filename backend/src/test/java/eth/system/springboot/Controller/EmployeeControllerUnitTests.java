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

    @Test
    @Order(6)
    @DisplayName("Test 6: Get Employee By Id - When Employee Does Not Exist")
    void getEmployeeById_WhenEmployeeDoesNotExist(){
        // Arrange
        Long employeeId = 999L;

        // Mock the behavior of employeeRepository.findAllById() to return an empty Optional
        when(employeeRepository.findAllById(employeeId)).thenReturn(Optional.empty());

        // Act and Assert
        RuntimeException exception = assertThrows(RuntimeException.class, ()-> employeeController.getEmployeeById(employeeId));

        // Verify the exception message
        assertEquals("Employee does not exist with Id:999", exception.getMessage());


    }

    @Test
    @Order(7)
    @DisplayName("Test 7: Update Employee - Success")
    void updateEmployee_Success(){

        // Arrange
        long employeeId = 1L;
        Employee existingEmployee = new Employee();
        existingEmployee.setFirstName("Claire");
        existingEmployee.setLastName("Jones");
        existingEmployee.setEmployeeNumber("SYS-3543-2759");
        existingEmployee.setPosition("Marketing Trainee");
        existingEmployee.setEmailAddress("clairejones@gmail.com");
        existingEmployee.setPhoneNumber("07-3427-960453");
        existingEmployee.setEmployeeStatus("Contract");

        Employee updateEmployeeDetails = new Employee();
        updateEmployeeDetails.setFirstName("Claire Anne");
        updateEmployeeDetails.setLastName("Jones");
        updateEmployeeDetails.setEmployeeNumber("SYS-3543-2799");
        updateEmployeeDetails.setPosition("Marketing Trainee 1");
        updateEmployeeDetails.setEmailAddress("clairejones@gmail.com");
        updateEmployeeDetails.setPhoneNumber("07-3427-960453");
        updateEmployeeDetails.setEmployeeStatus("Full Time");

        when(employeeRepository.findById(employeeId)).thenReturn(Optional.of(existingEmployee));
        when(employeeRepository.save(existingEmployee)).thenReturn(existingEmployee);

        // Act
        ResponseEntity<Employee> response = employeeController.updateEmployee(employeeId, updateEmployeeDetails);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Claire Anne", response.getBody().getFirstName());
        assertEquals("Jones", response.getBody().getLastName());
        assertEquals("SYS-3543-2799", response.getBody().getEmployeeNumber());
        assertEquals("Marketing Trainee 1", response.getBody().getPosition());
        assertEquals("clairejones@gmail.com", response.getBody().getEmailAddress());
        assertEquals("07-3427-960453", response.getBody().getPhoneNumber());
        assertEquals("Full Time", response.getBody().getEmployeeStatus());

        // Verify
        verify(employeeRepository, times(1)).findById(employeeId);
        verify(employeeRepository, times(1)).save(existingEmployee);
    }

    @Test
    @Order(8)
    @DisplayName("Test 8: Update Employee - Not Found")
    void updateEmployee_NotFound(){
        // Arrange
        long employeeId = 1L;
        Employee updateEmployeeDetails = new Employee();
        when(employeeRepository.findById(employeeId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, ()-> employeeController.updateEmployee(employeeId, updateEmployeeDetails));

        // Assert
        assertEquals("Employee does not exist with id: " + employeeId, exception.getMessage());

        // Verify
        verify(employeeRepository, times(1)).findById(employeeId);
        verify(employeeRepository, never()).save(any());

    }

    @Test
    @Order(9)
    @DisplayName("Test 9: Delete Employee - Success")
    void deleteEmployee_Success(){

        // Arange
        Long employeeId = 1L;

        // Mock the service method to do nothing (since it's a void method)
        doNothing().when(employeeService).deleteEmployee(employeeId);

        // Act
        ResponseEntity<String> response = employeeController.deleteEmployee(employeeId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Employee Deleted Successfully", response.getBody());

        // Verify that the service method was called once
        verify(employeeService, times(1)).deleteEmployee(employeeId);

    }

    @Test
    @Order(10)
    @DisplayName("Test 10: Delete Employee - Exception Thrown")
    void deleteEmployee_ExceptionThrown(){

        // Arrange
        Long employeeId = 1L;

        // Mock the service method to throw an exception
        doThrow(new RuntimeException("Employee not found")).when(employeeService).deleteEmployee(employeeId);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> employeeController.deleteEmployee(employeeId));

        assertEquals("Employee not found", exception.getMessage());

        // Verify that the service method was called once
        verify(employeeService, times(1)).deleteEmployee(employeeId);
    }
}
