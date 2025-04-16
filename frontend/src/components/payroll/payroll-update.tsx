import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { toast } from "sonner"
import { format } from "date-fns";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useDeletePayroll, useGetPayrollById, useUpdatePayroll } from "@/services/services-payrolls";
import { useGetAllEmployees } from "@/services/services-employee";
import UpdatePayrollForm from "./payroll-update-form";

const UpdatePayroll = () => {

  // get payroll ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch payroll  & employee data
  const { data, isLoading } = useGetPayrollById(id || "");
  const { mutate } = useUpdatePayroll(id || "");
  const { mutate: deletePayroll } = useDeletePayroll();
  const { data: employees } = useGetAllEmployees();

  // payroll data
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

  // update payroll
  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();

    if (employeeId === null) {
      toast.error("Please select an employee");
      return;
    }
    const currentPayroll = {
      id: id || "",
      payPeriodStartDate: payPeriodStartDate ? format(payPeriodStartDate, "MM-dd-yyyy") : undefined,
      payPeriodEndDate: payPeriodEndDate ? format(payPeriodEndDate, "MM-dd-yyyy") : undefined,
      paymentDate: paymentDate ? format(paymentDate, "MM-dd-yyyy") : undefined,
      grossPay,
      deductions,
      netPay,
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
      <UpdatePayrollForm
      payPeriodStartDate={payPeriodStartDate}
      setPayPeriodStartDate={setPayPeriodStartDate}
      payPeriodEndDate={payPeriodEndDate}
      setPayPeriodEndDate={setPayPeriodEndDate}
      paymentDate={paymentDate}
      setPaymentDate={setPaymentDate}
      grossPay={grossPay}
      setGrossPay={setGrossPay}
      deductions={deductions}
      setDeductions={setDeductions}
      netPay={netPay}
      setNetPay={setNetPay}
      remarks={remarks}
      setRemarks={setRemarks}
      employeeId={employeeId}
      setEmployeeId={setEmployeeId}
      employees={employees}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      payrollId={id || ""}
      />
    </MainLayout>  
  )
}

export default UpdatePayroll