package eth.system.springboot.service.impl;

import eth.system.springboot.dto.DepartmentDto;
import eth.system.springboot.entity.Department;
import eth.system.springboot.repository.DepartmentRepository;
import eth.system.springboot.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Department
    @Override
    public DepartmentDto createNewDepartment(DepartmentDto departmentDto) {
        Department department = modelMapper.map(departmentDto, Department.class);
        Department savedDepartment = departmentRepository.save(department);
        return modelMapper.map(savedDepartment, DepartmentDto.class);
    }

    // REST API - Get Department By ID
    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findAllById(departmentId)
                .orElseThrow(()-> new RuntimeException("Department doesn't exist with a given Id:" + departmentId));
        return modelMapper.map(departmentId, DepartmentDto.class);
    }

    // REST API - Get All Departments
    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map((department -> modelMapper.map(department, DepartmentDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Department
    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updateDepartment) {
        Department department = departmentRepository.findAllById(departmentId)
                .orElseThrow(()-> new RuntimeException("Deparment doesn't exist with a given Id:" + departmentId));

        department.setDepartmentName(updateDepartment.getDepartmentName());
        department.setManagerName(updateDepartment.getManagerName());
        department.setLocation(updateDepartment.getLocation());

        Department updateDepartmenrObj = departmentRepository.save(department);
        return modelMapper.map(updateDepartmenrObj, DepartmentDto.class);
    }

    // REST API - Delete Department
    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findAllById(departmentId)
                .orElseThrow(()-> new RuntimeException("Department doesn't exist with given id:" + departmentId));
        departmentRepository.deleteById(departmentId);
    }
}
