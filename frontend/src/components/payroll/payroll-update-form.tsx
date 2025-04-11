import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeletePayrollDialog from "./payroll-delete";

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    employeeNumber: string;
};

type PayrollFormProps = {
    payPeriodStartDate: Date | undefined;
    setPayPeriodStartDate: (value: Date | undefined) => void;
    payPeriodEndDate:  Date | undefined;
    setPayPeriodEndDate: (value: Date | undefined) => void;
    paymentDate: Date | undefined;
    setPaymentDate: (value: Date | undefined) => void;
    grossPay: string;
    setGrossPay: (value: string) => void;
    deductions: string;
    setDeductions: (value: string) => void;
    netPay: string;
    setNetPay: (value: string) => void;
    remarks: string;
    setRemarks: (value: string) => void;
    employeeId: number | null;
    setEmployeeId: (value: number | null) => void;
    employees: Employee[] | undefined;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    payrollId: string;
}

const UpdatePayrollForm: React.FC<PayrollFormProps> = ({
    payPeriodStartDate,
    setPayPeriodStartDate,
    payPeriodEndDate,
    setPayPeriodEndDate,
    paymentDate,
    setPaymentDate,
    grossPay,
    setGrossPay,
    deductions,
    setDeductions,
    netPay,
    setNetPay,
    remarks,
    setRemarks,
    employeeId,setEmployeeId,employees,
    handleSubmit,handleDelete,payrollId,
}) => {
  return (
    <form onSubmit={handleSubmit}>
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                  <Label htmlFor="employee">Employee:</Label>
                  <Select
                    value={employeeId ? employeeId.toString() : undefined}
                    onValueChange={(value) => {
                      const parsedValue = parseInt(value);
                      if (!isNaN(parsedValue)) {
                        setEmployeeId(parsedValue);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees?.map((employee: Employee) => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          {employee.firstName} {employee.lastName} - {employee.employeeNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
            </div>
          </div>
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="payPeriodStartDate">Period Start Date :</Label>
                <Input type="date" id="payPeriodStartDate" value={payPeriodStartDate ? format(payPeriodStartDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                        setPayPeriodStartDate(selectedDate);
                    }}
                />    
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                  <Label htmlFor="grossPay">Gross Pay:</Label>
                    <Input
                      type="text"
                      id="grossPay"
                      value={grossPay}
                      onChange={(e) => setGrossPay(e.target.value)}
                    />
            </div>
          </div> 
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="payPeriodEndDate">Period End Date :</Label>
                <Input type="date" id="payPeriodEndDate" value={payPeriodEndDate ? format(payPeriodEndDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                    setPayPeriodEndDate(selectedDate);
                  }}
                />  
            </div>
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="deductions">Deductions:</Label>
                <Input
                  type="text"
                  id="deductions"
                  value={deductions}
                  onChange={(e) => setDeductions(e.target.value)}
                />
            </div>
          </div>
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="paymentDate">Payment Date :</Label>
                <Input
                  type="date"
                  id="paymentDate"
                  value={paymentDate ? format(paymentDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                    setPaymentDate(selectedDate);
                  }}
                />   
            </div>
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="netPay">Net Pay:</Label>
                <Input
                  type="text"
                  id="netPay"
                  value={netPay}
                  onChange={(e) => setNetPay(e.target.value)}
                />
            </div>
          </div>
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="remarks">Remarks:</Label>
                <Textarea id="remarks"  value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
            </div>
          </div>
          <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="bg-violet-500 hover:bg-violet-600" aria-label="Update Payroll">Update</Button>
            <DeletePayrollDialog payrollId={payrollId} onDelete={handleDelete} aria-label="Delete Payroll"/>
            <Link to={`/payrolls`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Payrol</Button>  
            </Link>
          </div>
      </form>
  )
}

export default UpdatePayrollForm