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
public class PayrollDto {

    private Long id;

    private String grossPay;

    private String deductions;

    private String netPay;

    private String remarks;

    private Employee employee;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date payPeriodStartDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date payPeriodEndDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date paymentDate;



}
