package eth.system.springboot.dto;

import eth.system.springboot.entity.Attendance;
import eth.system.springboot.entity.Department;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String employeeNumber;

    private String position;

    private Department department;

    private List<Attendance> attendances;
}
