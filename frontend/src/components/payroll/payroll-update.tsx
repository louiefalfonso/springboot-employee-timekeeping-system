import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useDeletePayroll, useGetPayrollById, useUpdatePayroll } from "@/services/services-payrolls";
import { useGetAllEmployees } from "@/services/services-employee";
import DeletePayrollDialog from "./payroll-delete";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;
}

type Payroll ={
  id:string;
  payPeriodStartDate: Date | undefined;
  payPeriodEndDate: Date | undefined;
  grossPay: string;
  deductions?: string;
  netPay?: string;
  paymentDate?: Date | undefined;
  remarks?: string;
  employee: { id: number; };
}

const UpdatePayroll = () => {

  // get payroll ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetPayrollById(id || "");
  const { mutate } = useUpdatePayroll(id || "");
  const { mutate: deletePayroll } = useDeletePayroll();
  const { data: employees } = useGetAllEmployees();

  const [payPeriodStartDate, setPayPeriodStartDate] = useState<Date | undefined>();
  const [payPeriodEndDate, setPayPeriodEndDate] = useState<Date | undefined>();
  const [grossPay, setGrossPay] = useState("");
  const [deductions, setDeductions] = useState("");
  const [netPay, setNetPay] = useState("");
  const [paymentDate, setPaymentDate] = useState<Date | undefined>();
  const [remarks, setRemarks] = useState("")
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  useEffect(()=>{
    if(data){
      setPayPeriodStartDate(data.payPeriodStartDate);
      setPayPeriodEndDate(data.payPeriodEndDate);
      setGrossPay(data.grossPay);
      setDeductions(data.deductions);
      setNetPay(data.netPay);
      setPaymentDate(data.paymentDate);
      setRemarks(data.remarks);
      setEmployeeId(data.employee.id);
    }
  }, [data]);

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();

    if (employeeId === null) {
      toast.error("Please select an employee");
      return;
    }
    const currentPayroll : Payroll = {
      id: id || "",
      payPeriodStartDate: payPeriodStartDate || new Date(),
      payPeriodEndDate: payPeriodEndDate || new Date(),
      grossPay,
      deductions,
      netPay,
      paymentDate: paymentDate || new Date(),
      remarks,
      employee : { id : employeeId }
    }

    try {
      mutate(currentPayroll, {
        onSuccess: () => {
          toast.success("Payroll Updated Successfully");
          navigate("/payrolls");
        },
        onError: (error) => {
          console.error("Error Updating Payroll:", error);
          toast.error("Failed to Update Payroll. Please try again.");
        },
      })
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  // delete payroll
  const handleDelete = () =>{
    try {
      deletePayroll(id || "", {
        onSuccess: () => {
          toast.success("Payroll Deleted Successfully");
          navigate("/payrolls");
        },
        onError: (error) => {
          console.error("Error Deleting Payroll:", error);
          toast.error("Failed to Delete Payroll. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <MainLayout>
      <Headers Title="Update Leave / Absence" />
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
                  value={grossPay}
                  onChange={(e) => setGrossPay(e.target.value)}
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
          <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="bg-violet-500 hover:bg-violet-600" aria-label="Update Payroll">Update</Button>
            <DeletePayrollDialog payrollId={id || ""} onDelete={handleDelete} aria-label="Delete Payroll"/>
            <Link to={`/payrolls`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Payrol</Button>  
            </Link>
          </div>
        </form>
    </MainLayout>  
  )
}

export default UpdatePayroll