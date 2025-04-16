import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    employeeNumber: string;
};

type Payroll = {
    id?: string;
    payPeriodStartDate?: string;
    payPeriodEndDate?: string
    paymentDate?: string;
    grossPay: string;
    deductions: string;
    netPay: string;
    remarks: string;
    employee: Employee | null; 
}

interface PayrollProps {
    employees : Employee[];
    onSubmit: (payroll:Payroll) => void;
}

const AddNewPayrollForm: React.FC<PayrollProps> = ({ employees, onSubmit }) => {

    const [payPeriodStartDate, setPayPeriodStartDate] = useState<Date | null>(null);
    const [payPeriodEndDate, setPayPeriodEndDate] = useState<Date | null>(null);
    const [paymentDate, setPaymentDate] = useState<Date | null>(null);
    const [grossPay, setGrossPay] = useState("");
    const [deductions, setDeductions] = useState("");
    const [netPay, setNetPay] = useState("");
    const [remarks, setRemarks] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

    const handleEmployeeSelect = useCallback((employeeId: number) => {
        const employee = employees.find((employee) => employee.id === employeeId) || null;
        setSelectedEmployee(employee);
      }, [employees]); 

    const newPayroll = useMemo<Payroll>(
        ()=>({
            payPeriodStartDate: payPeriodStartDate ? format(payPeriodStartDate,"MM-dd-yyyy") : undefined,
            payPeriodEndDate: payPeriodEndDate ? format(payPeriodEndDate,"MM-dd-yyyy") : undefined,
            paymentDate: paymentDate ? format(paymentDate,"MM-dd-yyyy") : undefined,
            grossPay, deductions, netPay, remarks,
            employee: selectedEmployee
        }),
        [payPeriodStartDate, payPeriodEndDate, paymentDate, grossPay, deductions, netPay, remarks, selectedEmployee]
    );

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();

        if (!selectedEmployee) {
            toast.error("Please select an employee");
            return;
        }

        onSubmit(newPayroll)
    }

  return (
    <form onSubmit={handleSubmit}>
          <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="employee">Employee:</Label>
                  <Select onValueChange={(value) => handleEmployeeSelect(parseInt(value))}>
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
          <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="payPeriodStartDate">Period Start Date :</Label>
                <Input type="date" id="payPeriodStartDate" value={payPeriodStartDate ? format(payPeriodStartDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : null;
                  setPayPeriodStartDate(selectedDate);
                }}
              /> 
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="grossPay">Gross Pay:</Label>
                  <Input
                    type="text"
                    id="grossPay"
                    placeholder="Gross Pay"
                    onChange={(e) => setGrossPay(e.target.value)}
                  />
              </div>
          </div>
          <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="payPeriodEndDate">Period End Date :</Label>
                <Input type="date" id="payPeriodEndDate" value={payPeriodEndDate ? format(payPeriodEndDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : null;
                  setPayPeriodEndDate(selectedDate);
                }}
              />  
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="deductions">Deductions:</Label>
                  <Input
                    type="text"
                    id="deductions"
                    placeholder="Deductions"
                    onChange={(e) => setDeductions(e.target.value)}
                  />
            </div>
          </div>
          <div className="grid auto-rows-min md:grid-cols-2">
              <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="paymentDate">Payment Date :</Label>
                <Input type="date" id="paymentDate" value={paymentDate ? format(paymentDate, "yyyy-MM-dd") : ""}
                        onChange={(e) => {
                        const selectedDate = e.target.value ? new Date(e.target.value) : null;
                        setPaymentDate(selectedDate);
                        }}
                    /> 
              </div>
              <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="netPay">Net Pay:</Label>
                  <Input
                    type="text"
                    id="netPay"
                    placeholder="Net Pay"
                    onChange={(e) => setNetPay(e.target.value)}
                  />
              </div>
              
          </div>
          <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="remarks">Remarks:</Label>
                <Textarea id="remarks" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)}/>
            </div>
          </div>
          <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
                Add Payroll
            </Button>
            <Link to={`/payrolls`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Payroll</Button>  
            </Link>
          </div>
    </form>
  )
}

export default AddNewPayrollForm