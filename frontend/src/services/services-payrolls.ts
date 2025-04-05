import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Payroll {
    id: string;
    employee?: number;
    payPeriodStartDate?: Date;
    payPeriodEndDate?: Date;
    grossPay: string;
    deductions: string;
    netPay: string;
    paymentDate: Date;
    remarks: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_PAYROLL

const payrollServices ={

    addNewPayroll: async (newPayroll: Payroll) => {
        const response = await axios.post(API_BASE_URL, newPayroll);
        return response.data;
    },

    getAllPayrolls : async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },
}

// React Query Hooks
export const useAddNewPayroll = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newPayroll: Payroll) => payrollServices.addNewPayroll(newPayroll),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payroll'] });
      },
    });
}

export const useGetAllPayrolls = () => {
    return useQuery( 
      { queryKey: ['payroll'], queryFn: payrollServices.getAllPayrolls });
};

export default payrollServices;