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
public class PerformanceReviewDto {

    private Long id;

    private Employee employee;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date reviewDate;

    private String rating;

    private String comments;
}
