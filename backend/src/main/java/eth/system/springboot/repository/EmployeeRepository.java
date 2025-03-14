package eth.system.springboot.repository;

import eth.system.springboot.entity.Department;
import eth.system.springboot.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findAllById(Long employeeId);

    //  List<Post> findByCategoryId(Long categoryId);

     List<Department> findByDepartmentId(Long departmentId);
}
