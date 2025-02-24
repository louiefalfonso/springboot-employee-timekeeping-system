package eth.system.springboot.repository;

import eth.system.springboot.entity.LeaveAbsence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LeaveAbsenceRepository extends JpaRepository<LeaveAbsence, Long> {

    Optional<LeaveAbsence> findAllById(Long LeaveAbsenceId);
}
