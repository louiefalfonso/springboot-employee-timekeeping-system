package eth.system.springboot.service.impl;

import eth.system.springboot.dto.PayrollDto;
import eth.system.springboot.entity.Payroll;
import eth.system.springboot.repository.PayrollRepository;
import eth.system.springboot.service.PayrollService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
}
