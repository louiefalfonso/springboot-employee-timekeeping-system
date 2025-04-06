import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Payroll {
    id: string;
    employee?: number;
    payPeriodStartDate?: Date;
    payPeriodEndDate?: Date;
    grossPay?: string;
    deductions?: string;
    netPay?: string;
    paymentDate?: Date;
    remarks?: string;
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

    getPayrollById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentPayroll: async (currentPayroll: Payroll, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentPayroll);
        return response.data;
    },

    deletePayroll: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewPayroll = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newPayroll: Payroll) => payrollServices.addNewPayroll(newPayroll),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      },
    });
}

export const useGetAllPayrolls = () => {
    return useQuery( 
      { queryKey: ['payrolls'], queryFn: payrollServices.getAllPayrolls });
};

export const useGetPayrollById = (id: string) => {
    return useQuery(
      { queryKey: ['payroll', id], queryFn: () => payrollServices.getPayrollById(id) });
}

export const useUpdatePayroll = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentPayroll: Payroll) => payrollServices.updateCurrentPayroll(currentPayroll, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payroll', id] });
      },
    });
};

export const useDeletePayroll = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => payrollServices.deletePayroll(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      },
    });
};

export default payrollServices;