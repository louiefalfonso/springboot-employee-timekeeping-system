package eth.system.springboot.repository;

import eth.system.springboot.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findAllById(Long DepartmentId);



}
