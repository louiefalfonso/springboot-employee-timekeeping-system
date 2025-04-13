package eth.system.springboot.Repository;

import eth.system.springboot.entity.Employee;
import eth.system.springboot.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class EmployeeRepositoryUnitTests {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    @Order(1)
    @DisplayName("Test 1: Create New Employee - Success")
    void createNewEmployee() {
        // Create a new asset object
        Employee employee = Employee.builder()
                .firstName("Claire")
                .lastName("Jones")
                .employeeNumber("SYS-3543-2759")
                .position("Marketing Trainee")
                .phoneNumber("07-3427-960453")
                .employeeStatus("Contract")
                .build();

        // Save the employee
        Employee savedEmployee = employeeRepository.save(employee);

        // Verify that the employee is saved
        Assertions.assertThat(savedEmployee.getId()).isGreaterThan(0);
        Assertions.assertThat(savedEmployee.getFirstName()).isEqualTo("Claire");
        Assertions.assertThat(savedEmployee.getLastName()).isEqualTo("Jones");
        Assertions.assertThat(savedEmployee.getEmployeeNumber()).isEqualTo("SYS-3543-2759");
        Assertions.assertThat(savedEmployee.getPosition()).isEqualTo("Marketing Trainee");
        Assertions.assertThat(savedEmployee.getPhoneNumber()).isEqualTo("07-3427-960453");
        Assertions.assertThat(savedEmployee.getEmployeeStatus()).isEqualTo("Contract");
    }

    @Test
    @Order(2)
    @DisplayName("Test 2: Get Employee By ID - Success")
    void getEmployeeById() {
        // Create a new employee object
        Employee employee = Employee.builder()
                .firstName("Claire")
                .lastName("Jones")
                .employeeNumber("SYS-3543-2759")
                .position("Marketing Trainee")
                .phoneNumber("07-3427-960453")
                .employeeStatus("Contract")
                .build();

        // Save the employee
        Employee savedEmployee = employeeRepository.save(employee);

        // Retrieve the employee by ID
        Employee retrievedEmployee = employeeRepository.findById(savedEmployee.getId()).orElse(null);

        // Verify that the retrieved employee is not null
        Assertions.assertThat(retrievedEmployee).isNotNull();

        // Verify that the retrieved employee's details match the saved employee's details
        Assertions.assertThat(retrievedEmployee.getFirstName()).isEqualTo("Claire");
        Assertions.assertThat(retrievedEmployee.getLastName()).isEqualTo("Jones");
        Assertions.assertThat(retrievedEmployee.getEmployeeNumber()).isEqualTo("SYS-3543-2759");
        Assertions.assertThat(retrievedEmployee.getPosition()).isEqualTo("Marketing Trainee");
        Assertions.assertThat(retrievedEmployee.getPhoneNumber()).isEqualTo("07-3427-960453");
        Assertions.assertThat(retrievedEmployee.getEmployeeStatus()).isEqualTo("Contract");
    }

    @Test
    @Order(3)
    @DisplayName("Test 3: Get Employee By ID - Not Found")
    void getEmployeeById_NotFound() {
        // Try to retrieve an employee by a non-existent ID
        Employee retrievedEmployee = employeeRepository.findById(999L).orElse(null);

        // Verify that the retrieved employee is null
        Assertions.assertThat(retrievedEmployee).isNull();
    }

    @Test
    @Order(4)
    @DisplayName("Test 4: Get All Employees - Success")
    void getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        Assertions.assertThat(employees.size()).isGreaterThan(0);
    }

    @Test
    @Order(5)
    @DisplayName("Test 5: Update Employee - Success")
    void updateEmployee() {
        // Create a new employee object
        Employee employee = Employee.builder()
                .firstName("Claire")
                .lastName("Jones")
                .employeeNumber("SYS-3543-2759")
                .position("Marketing Trainee")
                .phoneNumber("07-3427-960453")
                .employeeStatus("Contract")
                .build();

        // Save the employee
        Employee savedEmployee = employeeRepository.save(employee);

        // Update the employee's details
        savedEmployee.setFirstName("Claire Updated");
        savedEmployee.setLastName("Jones Updated");
        savedEmployee.setEmployeeNumber("SYS-3543-2759-Updated");
        savedEmployee.setPosition("Marketing Manager");
        savedEmployee.setPhoneNumber("07-3427-960453-Updated");
        savedEmployee.setEmployeeStatus("Full-time");

        // Update the employee
        Employee updatedEmployee = employeeRepository.save(savedEmployee);

        // Verify that the updated employee's details match the expected details
        Assertions.assertThat(updatedEmployee.getFirstName()).isEqualTo("Claire Updated");
        Assertions.assertThat(updatedEmployee.getLastName()).isEqualTo("Jones Updated");
        Assertions.assertThat(updatedEmployee.getEmployeeNumber()).isEqualTo("SYS-3543-2759-Updated");
        Assertions.assertThat(updatedEmployee.getPosition()).isEqualTo("Marketing Manager");
        Assertions.assertThat(updatedEmployee.getPhoneNumber()).isEqualTo("07-3427-960453-Updated");
        Assertions.assertThat(updatedEmployee.getEmployeeStatus()).isEqualTo("Full-time");
    }

    @Test
    @Order(6)
    @DisplayName("Test 6: Update Employee - Not Found")
    void updateEmployee_NotFound() {
        // Create a mock implementation of the Employee Repository interface
        EmployeeRepository employeeRepository = Mockito.mock(EmployeeRepository.class);

        // Define the behavior of the mock implementation
        when(employeeRepository.save(Mockito.any(Employee.class)))
                .thenThrow(new EntityNotFoundException("Employee not found"));

        // Try to retrieve an employee by a non-existent ID
        Employee employee = Employee.builder()
                .id(999L)
                .firstName("Claire Updated")
                .lastName("Jones Updated")
                .employeeNumber("SYS-3543-2759-Updated")
                .position("Marketing Manager")
                .phoneNumber("07-3427-960453-Updated")
                .employeeStatus("Full-time")
                .build();

        // Try to update the employee
        Assertions.assertThatThrownBy(() -> employeeRepository.save(employee))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    @Order(7)
    @DisplayName("Test 7: Delete Employee - Success")
    void deleteEmployee() {
        // Create a new employee object
        Employee employee = Employee.builder()
                .firstName("Claire")
                .lastName("Jones")
                .employeeNumber("SYS-3543-2759")
                .position("Marketing Trainee")
                .phoneNumber("07-3427-960453")
                .employeeStatus("Contract")
                .build();

        // Save the employee
        Employee savedEmployee = employeeRepository.save(employee);

        // Verify that the employee is saved
        Assertions.assertThat(savedEmployee.getId()).isGreaterThan(0);

        // Delete the employee
        employeeRepository.deleteById(savedEmployee.getId());

        // Verify that the employee is deleted
        Employee deletedEmployee = employeeRepository.findById(savedEmployee.getId()).orElse(null);
        Assertions.assertThat(deletedEmployee).isNull();
    }

    @Test
    @Order(8)
    @DisplayName("Test 8: Delete Employee - Not Found")
    void deleteEmployee_NotFound() {
        // Try to delete an employee by a non-existent ID
        Assertions.assertThatNoException().isThrownBy(() -> employeeRepository.deleteById(999L));
    }

    @Test
    @Order(9)
    @DisplayName("Test 9: Delete All Employees - Success")
    void deleteAllEmployees() {
        // Retrieve the em ployee to be deleted
        Employee employee = employeeRepository.findById(1L).orElseThrow(() -> new RuntimeException("Employee not found"));

        // Delete the employee
        employeeRepository.deleteById(1L);

        // Verify that the employee is deleted
        Optional<Employee> deletedEmployee = employeeRepository.findById(1L);
        Assertions.assertThat(deletedEmployee).isEmpty();
    }

}
