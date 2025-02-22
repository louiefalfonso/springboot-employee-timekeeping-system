package eth.system.springboot.dto;

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
public class AttendanceDto {

    private Long id;

    private String status;

    private String reasonForAbsence;

    private Date date;

    private Employee employee;
}
