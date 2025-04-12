package eth.system.springboot.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import eth.system.springboot.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectDto {

    private Long id;

    private String projectName;

    private String status;

    private String description;

    private String remarks;

    private String projectManager;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date dueDate;

    private Employee employee;
}
