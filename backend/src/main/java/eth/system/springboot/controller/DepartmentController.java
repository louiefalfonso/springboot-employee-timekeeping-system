package eth.system.springboot.controller;

import eth.system.springboot.dto.DepartmentDto;
import eth.system.springboot.entity.Department;
import eth.system.springboot.repository.DepartmentRepository;
import eth.system.springboot.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/departments")
public class DepartmentController {

    private DepartmentService departmentService;
    private DepartmentRepository departmentRepository;

    //POST - Create New Department REST API
    @PostMapping
    public ResponseEntity<DepartmentDto> createNewDepartment(@RequestBody DepartmentDto departmentDto){
        DepartmentDto savedDepartment = departmentService.createNewDepartment(departmentDto);
        return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED);
    }

    //GET - Get Department By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable ("id") Long id){
        Department department = departmentRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Department does not exist with Id:" + id));
        return ResponseEntity.ok(department);
    }

    //GET - Get All Departments REST API
    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartments(){
        List<DepartmentDto> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    //UPDATE - Update Department REST API
    @PutMapping("{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable("id") long id,
                                                       @RequestBody Department departmentDetails){
        Department updateDepartment = departmentRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Department does not exist with id: " + id));

        updateDepartment.setDepartmentName(departmentDetails.getDepartmentName());
        updateDepartment.setManagerName(departmentDetails.getManagerName());
        updateDepartment.setLocation(departmentDetails.getLocation());

        departmentRepository.save(updateDepartment);
        return ResponseEntity.ok(updateDepartment);
    }

    //DELETE - Delete Department REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable ("id") Long departmentId){
        departmentService.deleteDepartment(departmentId);
        return ResponseEntity.ok("Department Deleted Successfully");
    }
}
