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

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
    void createNewEmployee_Successfully() {
        // Arrange

        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setId(1L);

        Employee employee = new Employee();
        Employee savedEmployee = new Employee();

        when(modelMapper.map(employeeDto, Employee.class)).thenReturn(employee);
        when(employeeRepository.save(employee)).thenReturn(savedEmployee);
        when(modelMapper.map(savedEmployee, EmployeeDto.class)).thenReturn(employeeDto);

        // Act
        EmployeeDto createdEmployee = employeeService.createNewEmployee(employeeDto);

        // Assert
        assertEquals(employeeDto, createdEmployee);
    }

    @Test
    @Order(2)
    @DisplayName("Test 2: Get Employee By ID - Successfully")
    void getEmployeeById_Success(){
        // Arrange
        Long employeeId = 1L;
        Employee employee = new Employee();
        employee.setId(employeeId);
        when(employeeRepository.findAllById(employeeId)).thenReturn(Optional.of(employee));

        EmployeeDto expectedEmployeeDto = new EmployeeDto();
        expectedEmployeeDto.setId(employeeId);
        when(modelMapper.map(employee, EmployeeDto.class)).thenReturn(expectedEmployeeDto);

        // Act
        EmployeeDto actualEmployeeDto = employeeService.getEmployeeById(employeeId);

        // Assert
        assertEquals(expectedEmployeeDto, actualEmployeeDto);


    }

    @Test
    @Order(3)
    @DisplayName("Test 3: Get Employee By ID - Not Found")
    void getEmployeeById_NotFound() {
        // Arrange
        Long employeeId = 1L;
        when(employeeRepository.findAllById(employeeId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> employeeService.getEmployeeById(employeeId));

        assertEquals("Employee doesn't exist with a given Id:1", exception.getMessage());

        verify(employeeRepository, times(1)).findAllById(employeeId);
        verify(modelMapper, never()).map(any(), eq(EmployeeDto.class));
    }

    @Test
    @Order(4)
    @DisplayName("Test 4: Get All Employees - Successfully")
    void getAllEmployee_Success(){

        // Arrange
        Employee employee1 = new Employee();
        employee1.setId(1L);

        Employee employee2 = new Employee();
        employee2.setId(2L);

        List<Employee> employees = Arrays.asList(employee1, employee2);

        EmployeeDto employeeDto1 = new EmployeeDto();
        employeeDto1.setId(1L);

        EmployeeDto employeeDto2 = new EmployeeDto();
        employeeDto2.setId(2L);

        when(employeeRepository.findAll()).thenReturn(employees);
        when(modelMapper.map(employee1, EmployeeDto.class)).thenReturn(employeeDto1);
        when(modelMapper.map(employee2, EmployeeDto.class)).thenReturn(employeeDto2);

        // Act
        List<EmployeeDto> result = employeeService.getAllEmployees();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getId());
        assertEquals(2L, result.get(1).getId());
        verify(employeeRepository, times(1)).findAll();
        verify(modelMapper, times(1)).map(employee1, EmployeeDto.class);
        verify(modelMapper, times(1)).map(employee2, EmployeeDto.class);




    }

    @Test
    @Order(5)
    @DisplayName("Test 5: Get All Employees - No Employees")
    void getAllEmployees_NoEmployees() {
        // Arrange
        when(employeeRepository.findAll()).thenReturn(List.of());

        // Act
        List<EmployeeDto> result = employeeService.getAllEmployees();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(employeeRepository, times(1)).findAll();
        verify(modelMapper, never()).map(any(Employee.class), eq(EmployeeDto.class));
    }

    @Test
    @Order(6)
    @DisplayName("Test 6: Update Employee - Successfully")
    void updateEmployee_Success() {
        // Arrange
        Long employeeId = 1L;
        EmployeeDto updateEmployeeDto = new EmployeeDto();
        updateEmployeeDto.setId(employeeId);
        updateEmployeeDto.setFirstName("Claire Anne");
        updateEmployeeDto.setLastName("Jones-Smith");
        updateEmployeeDto.setEmployeeNumber("SYS-3543-2759");
        updateEmployeeDto.setPosition("Marketing Associate II");
        updateEmployeeDto.setEmailAddress("clairejones@gmail.com");
        updateEmployeeDto.setPhoneNumber("07-3427-960453");
        updateEmployeeDto.setEmployeeStatus("Full Time");

        Employee existingEmployee = new Employee();
        existingEmployee.setId(employeeId);
        existingEmployee.setFirstName("Claire");
        existingEmployee.setLastName("Jones-Smith");
        existingEmployee.setEmployeeNumber("SYS-3543-2759");
        existingEmployee.setPosition("Marketing Trainee");
        existingEmployee.setEmailAddress("clairejones@gmail.com");
        existingEmployee.setPhoneNumber("07-3427-960453");
        existingEmployee.setEmployeeStatus("Contract");

        Employee updatedEmployee = new Employee();
        updatedEmployee.setId(employeeId);
        updatedEmployee.setFirstName("Claire Anne");
        updatedEmployee.setLastName("Jones-Smith");
        updatedEmployee.setEmployeeNumber("SYS-3543-2759");
        updatedEmployee.setPosition("Marketing Associate II");
        updatedEmployee.setEmailAddress("clairejones@gmail.com");
        updatedEmployee.setPhoneNumber("07-3427-960453");
        updatedEmployee.setEmployeeStatus("Full Time");

        EmployeeDto expectedEmployeeDto = new EmployeeDto();
        expectedEmployeeDto.setId(employeeId);
        expectedEmployeeDto.setFirstName("Claire Anne");
        expectedEmployeeDto.setLastName("Jones-Smith");
        expectedEmployeeDto.setEmployeeNumber("SYS-3543-2759");
        expectedEmployeeDto.setPosition("Marketing Associate II");
        expectedEmployeeDto.setEmailAddress("clairejones@gmail.com");
        expectedEmployeeDto.setPhoneNumber("07-3427-960453");
        expectedEmployeeDto.setEmployeeStatus("Full Time");


        when(employeeRepository.findAllById(employeeId)).thenReturn(Optional.of(existingEmployee));
        when(employeeRepository.save(existingEmployee)).thenReturn(updatedEmployee);
        when(modelMapper.map(updatedEmployee, EmployeeDto.class)).thenReturn(expectedEmployeeDto);

        // Act
        EmployeeDto result = employeeService.updateEmployee(employeeId, updateEmployeeDto);

        // Assert
        assertNotNull(result);
        assertEquals(employeeId, result.getId());
        assertEquals("Claire Anne", result.getFirstName());
        assertEquals("Jones-Smith", result.getLastName());
        assertEquals("SYS-3543-2759", result.getEmployeeNumber());
        assertEquals("Marketing Associate II", result.getPosition());
        assertEquals("clairejones@gmail.com", result.getEmailAddress());
        assertEquals("07-3427-960453", result.getPhoneNumber());
        assertEquals("Full Time", result.getEmployeeStatus());

        verify(employeeRepository, times(1)).findAllById(employeeId);
        verify(employeeRepository, times(1)).save(existingEmployee);
        verify(modelMapper, times(1)).map(updatedEmployee, EmployeeDto.class);
    }

    @Test
    @Order(7)
    @DisplayName("Test 7: Update Employee - Not Found")
    void updateEmployee_NotFound() {
        // Arrange
        Long employeeId = 999L;
        EmployeeDto updateEmployeeDto = new EmployeeDto();
        when(employeeRepository.findAllById(employeeId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> employeeService.updateEmployee(employeeId, updateEmployeeDto));

        assertEquals("Employee doesn't exist with a given Id:" + employeeId, exception.getMessage());

        verify(employeeRepository, times(1)).findAllById(employeeId);
        verify(employeeRepository, never()).save(any());
        verify(modelMapper, never()).map(any(), eq (EmployeeDto.class));
    }

    @Test
    @Order(8)
    @DisplayName("Test 8: Delete Employee - Successfully")
    void deleteEmployee_Success() {
        // Arrange
        Long employeeId = 1L;
        Employee employee = new Employee();
        when(employeeRepository.findAllById(employeeId)).thenReturn(Optional.of(employee));

        // Act
        employeeService.deleteEmployee(employeeId);

        // Assert
        verify(employeeRepository, times(1)).deleteById(employeeId);
    }

    @Test
    @Order(9)
    @DisplayName("Test 8: Delete Employee - Not Found")
    void deleteEmployee_NotFound() {
        // Arrange
        Long employeeId = 1L;
        when(employeeRepository.findAllById(employeeId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> employeeService.deleteEmployee(employeeId));

        // Assert
        verify(employeeRepository, never()).deleteById(employeeId);
        assert(exception.getMessage().contains("Employee doesn't exist with given id:" + employeeId));
    }

}


