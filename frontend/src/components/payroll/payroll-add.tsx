import { useMemo, useState, useCallback } from "react";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

import { useAddNewPayroll } from "@/services/services-payrolls";
import { useGetAllEmployees } from "@/services/services-employee";

// define a type for employee
type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;

}

type Payroll ={
  id?:string;
  payPeriodStartDate?: string;
  payPeriodEndDate?: string;
  grossPay: string;
  deductions: string;
  netPay: string;
  paymentDate?: string;
  remarks: string;
  employee: Employee | null;
}


const AddNewPayroll = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewPayroll();
  const { data: employees } = useGetAllEmployees();
  
  const [payPeriodStartDate, setPayPeriodStartDate] = useState<Date | undefined>();
  const [payPeriodEndDate, setPayPeriodEndDate] = useState<Date | undefined>();
  const [grossPay, setGrossPay] = useState("");
  const [deductions, setDeductions] = useState("");
  const [netPay, setNetPay] = useState("");
  const [paymentDate, setPaymentDate] = useState<Date | undefined>();
  const [remarks, setRemarks] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEmployeeSelect = useCallback((employeeId: number) => {
    const employee = employees?.find((employee: { id: number; }) => employee.id === employeeId) || null;
    setSelectedEmployee(employee);
  }, [employees]);

  // Memoize the newPayroll object
  const newPayroll = useMemo<Payroll>(
    () => ({
      payPeriodStartDate: payPeriodStartDate ? format(payPeriodStartDate, "MM-dd-yyyy") : undefined,
      payPeriodEndDate: payPeriodEndDate ? format(payPeriodEndDate, "MM-dd-yyyy") : undefined,
      grossPay,
      deductions,
      netPay,
      paymentDate: paymentDate ? format(paymentDate, "MM-dd-yyyy") : undefined,
      remarks,
      employee: selectedEmployee,
    }),
    [payPeriodStartDate, payPeriodEndDate, grossPay, deductions, netPay, paymentDate, remarks, selectedEmployee]
  );

  // Inside the handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!selectedEmployee){
      toast.error("Please select an employee")
      return;
    }

    try {
      mutate(newPayroll, {
        onSuccess: () => {
          toast.success("Payroll added successfully");
          navigate("/payrolls");
        },
        onError: (error) => {
          console.error("Error adding Payroll:", error);
          toast.error("Failed to add Payroll.");
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  
  }

  return (
    <MainLayout>
      <Headers Title="Add New Employee Payroll" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <form onSubmit={handleSubmit}>
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
              <Label htmlFor="payPeriodEndDate">Period End Date :</Label>
                <Input type="date" id="payPeriodEndDate" value={payPeriodEndDate ? format(payPeriodEndDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                    setPayPeriodEndDate(selectedDate);
                  }}
                />  
            </div>
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
          </div>
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="grossPay">Gross Pay:</Label>
                <Input
                  type="text"
                  id="grossPay"
                  placeholder="Gross Pay"
                  onChange={(e) => setGrossPay(e.target.value)}
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
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="remarks">Remarks:</Label>
                <Textarea id="remarks"  placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)}/>
            </div>
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
          <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
                Add Payroll
            </Button>
            <Link to={`/payrolls`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Payrol</Button>  
            </Link>
          </div>
        </form>
      </div>  
    </MainLayout>  
  )
}

export default AddNewPayroll