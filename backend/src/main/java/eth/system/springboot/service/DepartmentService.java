package eth.system.springboot.service;

import eth.system.springboot.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {

    DepartmentDto createNewDepartment(DepartmentDto departmentDto);

    DepartmentDto getDepartmentById(Long departmentId);

    List<DepartmentDto> getAllDepartments();

    DepartmentDto updateDepartment(Long departmentId, DepartmentDto updateDepartment);

    void deleteDepartment(Long departmentId);
}
