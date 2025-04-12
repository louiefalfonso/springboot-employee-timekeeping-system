package eth.system.springboot.controller;

import eth.system.springboot.dto.ProjectDto;
import eth.system.springboot.entity.Project;
import eth.system.springboot.repository.ProjectRepository;
import eth.system.springboot.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private ProjectRepository projectRepository;
    private ProjectService projectService;

    //POST - Create New Project REST API
    @PostMapping
    public ResponseEntity<ProjectDto> createNewProject(@RequestBody ProjectDto projectDto){
        ProjectDto savedProject = projectService.createNewProject(projectDto);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    //GET - Get Project By ID REST API
    @GetMapping("{id}")
    public  ResponseEntity<Project> getProjectById(@PathVariable ("id") Long id){
        Project project = projectRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Project does not exist with Id:" + id));
        return ResponseEntity.ok(project);
    }
}
