package eth.system.springboot.service;

import eth.system.springboot.dto.ProjectDto;

public interface ProjectService {

    ProjectDto createNewProject (ProjectDto projectDto);

    ProjectDto getProjectById(Long projectId);

}
