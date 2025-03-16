package eth.system.springboot.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import eth.system.springboot.entity.Attendance;
import eth.system.springboot.entity.Department;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
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

    private String emailAddress;

    private String phoneNumber;

    private String employeeStatus;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date dateOfBirth;

    private Department department;

    /*

    public void setDateOfBirth(String s) {
    }

    public void setDepartment(long l) {
    }

     */
}
