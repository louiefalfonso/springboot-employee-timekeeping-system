package eth.system.springboot.controller;

import eth.system.springboot.dto.PayrollDto;
import eth.system.springboot.repository.PayrollRepository;
import eth.system.springboot.service.PayrollService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/payrolls")
public class PayrollController {

    private PayrollService payrollService;
    private PayrollRepository payrollRepository;

    //POST - Create New Payroll REST API
    @PostMapping
    public ResponseEntity<PayrollDto> createNewPayroll (@RequestBody PayrollDto payrollDto){
        PayrollDto savedPayroll = payrollService.createNewPayroll(payrollDto);
        return new ResponseEntity<>(savedPayroll, HttpStatus.CREATED);
    }
}
