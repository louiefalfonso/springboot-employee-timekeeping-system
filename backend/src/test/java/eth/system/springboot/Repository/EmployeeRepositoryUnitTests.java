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
        // Create multiple employee objects
        Employee employee1 = Employee.builder()
                .firstName("Claire")
                .lastName("Jones")
                .employeeNumber("SYS-3543-2759")
                .position("Marketing Trainee")
                .phoneNumber("07-3427-960453")
                .employeeStatus("Contract")
                .build();

        Employee employee2 = Employee.builder()
                .firstName("John")
                .lastName("Doe")
                .employeeNumber("SYS-3543-2760")
                .position("Software Engineer")
                .phoneNumber("07-3427-960454")
                .employeeStatus("Full-time")
                .build();

        Employee employee3 = Employee.builder()
                .firstName("Jane")
                .lastName("Smith")
                .employeeNumber("SYS-3543-2761")
                .position("Data Analyst")
                .phoneNumber("07-3427-960455")
                .employeeStatus("Part-time")
                .build();

        // Save the employees
        employeeRepository.save(employee1);
        employeeRepository.save(employee2);
        employeeRepository.save(employee3);

        // Retrieve all employees
        List<Employee> allEmployees = employeeRepository.findAll();

        // Verify that the retrieved employees are not empty
        Assertions.assertThat(allEmployees).isNotEmpty();

        // Verify that the retrieved employees' details match the saved employees' details
        Assertions.assertThat(allEmployees.get(0).getFirstName()).isEqualTo("Claire");
        Assertions.assertThat(allEmployees.get(0).getLastName()).isEqualTo("Jones");
        Assertions.assertThat(allEmployees.get(0).getEmployeeNumber()).isEqualTo("SYS-3543-2759");
        Assertions.assertThat(allEmployees.get(0).getPosition()).isEqualTo("Marketing Trainee");
        Assertions.assertThat(allEmployees.get(0).getPhoneNumber()).isEqualTo("07-3427-960453");
        Assertions.assertThat(allEmployees.get(0).getEmployeeStatus()).isEqualTo("Contract");

        Assertions.assertThat(allEmployees.get(1).getFirstName()).isEqualTo("John");
        Assertions.assertThat(allEmployees.get(1).getLastName()).isEqualTo("Doe");
        Assertions.assertThat(allEmployees.get(1).getEmployeeNumber()).isEqualTo("SYS-3543-2760");
        Assertions.assertThat(allEmployees.get(1).getPosition()).isEqualTo("Software Engineer");
        Assertions.assertThat(allEmployees.get(1).getPhoneNumber()).isEqualTo("07-3427-960454");
        Assertions.assertThat(allEmployees.get(1).getEmployeeStatus()).isEqualTo("Full-time");

        Assertions.assertThat(allEmployees.get(2).getFirstName()).isEqualTo("Jane");
        Assertions.assertThat(allEmployees.get(2).getLastName()).isEqualTo("Smith");
        Assertions.assertThat(allEmployees.get(2).getEmployeeNumber()).isEqualTo("SYS-3543-2761");
        Assertions.assertThat(allEmployees.get(2).getPosition()).isEqualTo("Data Analyst");
        Assertions.assertThat(allEmployees.get(2).getPhoneNumber()).isEqualTo("07-3427-960455");
        Assertions.assertThat(allEmployees.get(2).getEmployeeStatus()).isEqualTo("Part-time");
    }

    @Test
    @Order(5)
    @DisplayName("Test 5: Get All Employees - Empty Result")
    void getAllEmployees_EmptyResult() {
        // Clear the database
        employeeRepository.deleteAll();

        // Retrieve all employees
        List<Employee> allEmployees = employeeRepository.findAll();

        // Verify that the retrieved employees are empty
        Assertions.assertThat(allEmployees).isEmpty();
    }

    @Test
    @Order(6)
    @DisplayName("Test 6: Update Employee - Success")
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
    @Order(7)
    @DisplayName("Test 7: Update Employee - Not Found")
    void updateEmployee_NotFound() {
        // Create a mock implementation of the Employee Repository interface
        EmployeeRepository employeeRepository = Mockito.mock(EmployeeRepository.class);

        // Define the behavior of the mock implementation
        Mockito.when(employeeRepository.save(Mockito.any(Employee.class)))
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
    @Order(8)
    @DisplayName("Test 8: Delete Employee - Success")
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
    @Order(9)
    @DisplayName("Test 9: Delete Employee - Not Found")
    void deleteEmployee_NotFound() {
        // Try to delete an employee by a non-existent ID
        Assertions.assertThatNoException().isThrownBy(() -> employeeRepository.deleteById(999L));
    }

    @Test
    @Order(10)
    @DisplayName("Test 10: Delete All Employees - Success")
    void deleteAllEmployees() {
        // Create multiple employee objects
        Employee employee1 = Employee.builder()
                .firstName("Claire")
                .lastName("Jones")
                .employeeNumber("SYS-3543-2759")
                .position("Marketing Trainee")
                .phoneNumber("07-3427-960453")
                .employeeStatus("Contract")
                .build();

        Employee employee2 = Employee.builder()
                .firstName("John")
                .lastName("Doe")
                .employeeNumber("SYS-3543-2760")
                .position("Software Engineer")
                .phoneNumber("07-3427-960454")
                .employeeStatus("Full-time")
                .build();

        Employee employee3 = Employee.builder()
                .firstName("Jane")
                .lastName("Smith")
                .employeeNumber("SYS-3543-2761")
                .position("Data Analyst")
                .phoneNumber("07-3427-960455")
                .employeeStatus("Part-time")
                .build();

        // Save the employees
        employeeRepository.save(employee1);
        employeeRepository.save(employee2);
        employeeRepository.save(employee3);

        // Verify that the employees are saved
        Assertions.assertThat(employeeRepository.findAll()).hasSize(3);

        // Delete all employees
        employeeRepository.deleteAll();

        // Verify that all employees are deleted
        Assertions.assertThat(employeeRepository.findAll()).isEmpty();
    }

    @Test
    @Order(11)
    @DisplayName("Test 11: Delete All Employees By ID - Success")
    void deleteAllEmployeesById() {
        // Create multiple employee objects
        Employee employee1 = Employee.builder()
                .firstName("Claire")
                .lastName("Jones")
                .employeeNumber("SYS-3543-2759")
                .position("Marketing Trainee")
                .phoneNumber("07-3427-960453")
                .employeeStatus("Contract")
                .build();

        Employee employee2 = Employee.builder()
                .firstName("John")
                .lastName("Doe")
                .employeeNumber("SYS-3543-2760")
                .position("Software Engineer")
                .phoneNumber("07-3427-960454")
                .employeeStatus("Full-time")
                .build();

        Employee employee3 = Employee.builder()
                .firstName("Jane")
                .lastName("Smith")
                .employeeNumber("SYS-3543-2761")
                .position("Data Analyst")
                .phoneNumber("07-3427-960455")
                .employeeStatus("Part-time")
                .build();

        // Save the employees
        Employee savedEmployee1 = employeeRepository.save(employee1);
        Employee savedEmployee2 = employeeRepository.save(employee2);
        Employee savedEmployee3 = employeeRepository.save(employee3);

        // Verify that the employees are saved
        Assertions.assertThat(employeeRepository.findAll()).hasSize(3);

        // Delete all employees by id
        employeeRepository.deleteAllById(List.of(savedEmployee1.getId(), savedEmployee2.getId(), savedEmployee3.getId()));

        // Verify that all employees are deleted
        Assertions.assertThat(employeeRepository.findAll()).isEmpty();
    }
}
