package eth.system.springboot.service.impl;

import eth.system.springboot.dto.ProjectDto;
import eth.system.springboot.entity.Project;
import eth.system.springboot.repository.ProjectRepository;
import eth.system.springboot.service.ProjectService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
}
