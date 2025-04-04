package eth.system.springboot.service.impl;

import eth.system.springboot.dto.PayrollDto;
import eth.system.springboot.entity.Payroll;
import eth.system.springboot.repository.PayrollRepository;
import eth.system.springboot.service.PayrollService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PayrollServiceImpl implements PayrollService {

    private PayrollRepository payrollRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Payroll
    @Override
    public PayrollDto createNewPayroll(PayrollDto payrollDto) {
        Payroll payroll = modelMapper.map(payrollDto, Payroll.class);
        Payroll savedPayroll = payrollRepository.save(payroll);
        return modelMapper.map(savedPayroll, PayrollDto.class);
    }

    // REST API - Get Payroll By ID
    @Override
    public PayrollDto getPayrollById(Long payrollId) {
        Payroll payroll = payrollRepository.findAllById(payrollId)
                .orElseThrow(()-> new RuntimeException("Payroll doesn't exist with a given Id:" + payrollId));
        return modelMapper.map(payrollId, PayrollDto.class);
    }

    // REST API - Get All Payrolls
    @Override
    public List<PayrollDto> getAllPayrolls() {
        List<Payroll> payrolls = payrollRepository.findAll();
        return payrolls.stream().map((payroll -> modelMapper.map(payroll, PayrollDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Payroll
    @Override
    public PayrollDto updatePayroll(Long payrollId, PayrollDto updatePayroll) {
        Payroll payroll = payrollRepository.findAllById(payrollId)
                .orElseThrow(()-> new RuntimeException("Payroll doesn't exist with a given Id:" + payrollId));
        payroll.setEmployee(updatePayroll.getEmployee());
        payroll.setPayPeriodStartDate(updatePayroll.getPayPeriodStartDate());
        payroll.setPayPeriodEndDate(updatePayroll.getPayPeriodEndDate());
        payroll.setGrossPay(updatePayroll.getGrossPay());
        payroll.setDeductions(updatePayroll.getDeductions());
        payroll.setNetPay(updatePayroll.getNetPay());
        payroll.setPaymentDate(updatePayroll.getPaymentDate());
        payroll.setRemarks(updatePayroll.getRemarks());

        Payroll updatePayrollObj = payrollRepository.save(payroll);
        return modelMapper.map(updatePayrollObj,PayrollDto.class);

    }

    // REST API - Delete Payroll
    @Override
    public void deletePayroll(Long payrollId) {
        Payroll payroll = payrollRepository.findAllById(payrollId)
                .orElseThrow(()-> new RuntimeException("Payroll doesn't exist with a given Id:" + payrollId));
        payrollRepository.deleteById(payrollId);
    }
}

