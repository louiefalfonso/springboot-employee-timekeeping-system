package eth.system.springboot.Repository;

import eth.system.springboot.entity.Employee;
import eth.system.springboot.repository.EmployeeRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

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
    void getEmployeeById_NotFound() {
        // Try to retrieve an employee by a non-existent ID
        Employee retrievedEmployee = employeeRepository.findById(999L).orElse(null);

        // Verify that the retrieved employee is null
        Assertions.assertThat(retrievedEmployee).isNull();
    }
}
