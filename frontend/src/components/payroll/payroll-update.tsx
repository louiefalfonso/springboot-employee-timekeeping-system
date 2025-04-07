import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useGetPayrollById, useUpdatePayroll } from "@/services/services-payrolls";
import { useGetAllEmployees } from "@/services/services-employee";

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


  return (
    <div>UpdatePayroll</div>
  )
}

export default UpdatePayroll