package eth.system.springboot.controller;

import eth.system.springboot.dto.PayrollDto;
import eth.system.springboot.entity.Payroll;
import eth.system.springboot.repository.PayrollRepository;
import eth.system.springboot.service.PayrollService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    //GET - Get Payroll By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Payroll> getPayrollById(@PathVariable ("id") Long id){
        Payroll payroll = payrollRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Payroll does not exist with Id:" + id));
        return ResponseEntity.ok(payroll);
    }

    //GET - Get All Payrolls REST API
    @GetMapping
    public ResponseEntity<List<PayrollDto>> getAllPayrolls(){
        List<PayrollDto> payrolls = payrollService.getAllPayrolls();
        return ResponseEntity.ok(payrolls);
    }

    //UPDATE - Update Payroll REST API
    @PutMapping("{id}")
    public ResponseEntity<Payroll> updatePayroll(@PathVariable ("id")long id,
                                                 @RequestBody Payroll payrollDetails){
        Payroll updatePayroll = payrollRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Payroll does not exist with Id:" + id));
        updatePayroll.setEmployee(payrollDetails.getEmployee());
        updatePayroll.setPayPeriodStartDate(payrollDetails.getPayPeriodStartDate());
        updatePayroll.setPayPeriodEndDate(payrollDetails.getPayPeriodEndDate());
        updatePayroll.setGrossPay(payrollDetails.getGrossPay());
        updatePayroll.setDeductions(payrollDetails.getDeductions());
        updatePayroll.setNetPay(payrollDetails.getNetPay());
        updatePayroll.setPaymentDate(payrollDetails.getPaymentDate());
        updatePayroll.setRemarks(payrollDetails.getRemarks());

        payrollRepository.save(updatePayroll);
        return ResponseEntity.ok(updatePayroll);
    }

    //DELETE - Delete Payroll REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePayroll(@PathVariable ("id") Long payrollId){
        payrollService.deletePayroll(payrollId);
        return ResponseEntity.ok("Payroll Deleted Successfully");
    }
}
