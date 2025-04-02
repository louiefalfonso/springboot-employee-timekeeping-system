package eth.system.springboot.repository;

import eth.system.springboot.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    Optional<Payroll> findAllById(Long PayrollId);
}
