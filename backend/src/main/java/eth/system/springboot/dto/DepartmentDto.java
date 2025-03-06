package eth.system.springboot.dto;

import eth.system.springboot.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DepartmentDto {

    private Long id;

    private String departmentName;

    private String departmentCode;

    private String departmentHead;

    private String departmentAssistant;

    private String location;

    private String contactNumber;

    private List<Employee> employees;
}
