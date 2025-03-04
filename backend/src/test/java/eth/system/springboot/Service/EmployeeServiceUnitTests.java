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
import static org.mockito.ArgumentMatchers.anyLong;
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


}


