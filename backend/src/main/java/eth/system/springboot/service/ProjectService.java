package eth.system.springboot.service;

import eth.system.springboot.dto.ProjectDto;

import java.util.List;

public interface ProjectService {

    ProjectDto createNewProject (ProjectDto projectDto);

    ProjectDto getProjectById(Long projectId);

    List<ProjectDto> getAllProjects();

    ProjectDto updateProject(Long projectId, ProjectDto updateProject);

    void deleteProject(Long projectId);

}
