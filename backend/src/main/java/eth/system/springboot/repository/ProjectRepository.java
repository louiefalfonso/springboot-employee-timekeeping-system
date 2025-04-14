package eth.system.springboot.repository;

import eth.system.springboot.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findAllById(Long projectId);

    List<Project> findByDeleted(boolean deleted);

    Optional<Project> findByIdAndDeleted(Long id, boolean deleted);


}
