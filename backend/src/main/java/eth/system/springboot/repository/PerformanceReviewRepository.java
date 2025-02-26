package eth.system.springboot.repository;

import eth.system.springboot.entity.PerformanceReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PerformanceReviewRepository extends JpaRepository<PerformanceReview, Long> {

    Optional<PerformanceReview> findAllById (Long pReviewId);
}
