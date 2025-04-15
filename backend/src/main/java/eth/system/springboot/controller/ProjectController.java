package eth.system.springboot.controller;

import eth.system.springboot.dto.ProjectDto;
import eth.system.springboot.entity.Project;
import eth.system.springboot.repository.ProjectRepository;
import eth.system.springboot.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    //GET - Get All Projects REST API
    @GetMapping
    public ResponseEntity<List<ProjectDto>> getAllProjects(){
        List<ProjectDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    //UPDATE - Update Project REST API
    @PutMapping("{id}")
    public ResponseEntity<Project> updateProject(@PathVariable ("id")long id,
                                                 @RequestBody Project projectDetails){
        Project updateProject = projectRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Project does not exist with id: " + id));

        updateProject.setProjectName(projectDetails.getProjectName());
        updateProject.setStatus(projectDetails.getStatus());
        updateProject.setRemarks(projectDetails.getRemarks());
        updateProject.setDescription(projectDetails.getDescription());
        updateProject.setStartDate(projectDetails.getStartDate());
        updateProject.setDueDate(projectDetails.getDueDate());
        updateProject.setEmployee(projectDetails.getEmployee());

        projectRepository.save(updateProject);
        return ResponseEntity.ok(updateProject);
    }

    //DELETE - Delete Project REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProject(@PathVariable ("id")Long projectId){
        projectService.deleteProject(projectId);
        return ResponseEntity.ok("Project Deleted Successfully");
    }
}
