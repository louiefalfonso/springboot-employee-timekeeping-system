package eth.system.springboot.service.impl;

import eth.system.springboot.dto.ProjectDto;
import eth.system.springboot.entity.Project;
import eth.system.springboot.repository.ProjectRepository;
import eth.system.springboot.service.ProjectService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private ProjectRepository projectRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Project
    @Override
    public ProjectDto createNewProject(ProjectDto projectDto) {
        Project project = modelMapper.map(projectDto, Project.class);
        Project savedProject = projectRepository.save(project);
        return modelMapper.map(savedProject, ProjectDto.class);
    }

    // REST API - Get Project By ID
    @Override
    public ProjectDto getProjectById(Long projectId) {
        Project project = projectRepository.findAllById(projectId)
                .orElseThrow(()-> new RuntimeException("Project doesn't exist with a given Id:" + projectId));
        return modelMapper.map(projectId, ProjectDto.class);
    }

    // REST API - Get All Projects
    @Override
    public List<ProjectDto> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map((project -> modelMapper.map(project, ProjectDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Project
    @Override
    public ProjectDto updateProject(Long projectId, ProjectDto updateProject) {
        Project project = projectRepository.findAllById(projectId)
                .orElseThrow(()->new RuntimeException("Project doesn't exist with a given Id:" + projectId));

        project.setProjectName(updateProject.getProjectName());
        project.setDescription(updateProject.getDescription());
        project.setStatus(updateProject.getStatus());
        project.setRemarks(updateProject.getRemarks());
        project.setProjectManager(updateProject.getProjectManager());
        project.setStartDate(updateProject.getStartDate());
        project.setDueDate(updateProject.getDueDate());
        project.setEmployee(updateProject.getEmployee());

        Project updateProjectObj = projectRepository.save(project);
        return modelMapper.map(updateProjectObj, ProjectDto.class);
    }

    // REST API - Delete Project
    @Override
    public void deleteProject(Long projectId) {
        Project project = projectRepository.findAllById(projectId)
                .orElseThrow(()->new RuntimeException("Project doesn't exist with given id:" + projectId));
        projectRepository.deleteById(projectId);
    }
}
