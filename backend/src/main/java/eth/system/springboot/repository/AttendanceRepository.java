package eth.system.springboot.repository;

import eth.system.springboot.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findAllById(Long AttendanceId);
}
