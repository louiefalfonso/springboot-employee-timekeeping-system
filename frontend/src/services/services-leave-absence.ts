import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface LeaveAbsence {
    id:string;
    startDate?: Date;
    endDate?: Date;
    leaveType?: string;
    status?: string;
    reasonForLeave?: string;
    remarks?:string;
    employee?: number;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_LEAVEABSENCE;

const leaveAbsenceServices  = {

    addNewLeaveAbsence: async (newLeaveAttendance: LeaveAbsence) => {
        const response = await axios.post(API_BASE_URL, newLeaveAttendance);
        return response.data;
    },

    getAllLeaveAbsence : async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getLeaveAbsenceById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentLeaveAbsence: async (currentLeaveAbsence: LeaveAbsence, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentLeaveAbsence);
        return response.data;
    },

    deleteLeaveAbsence: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddLeaveAbsence = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newLeaveAbsence: LeaveAbsence) => leaveAbsenceServices.addNewLeaveAbsence(newLeaveAbsence),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['leaveAbsences'] });
      },
    });
};

export const useGetAllLeaveAbsence = () => {
    return useQuery( 
      { queryKey: ['leaveAbsences'], queryFn: leaveAbsenceServices.getAllLeaveAbsence });
};

export const useGetLeaveAbsenceById = (id: string) => {
    return useQuery(
      { queryKey: ['leaveAbsence', id], queryFn: () => leaveAbsenceServices.getLeaveAbsenceById(id) });
}

export const useUpdateLeaveAbsence = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentLeaveAttendance: LeaveAbsence) => leaveAbsenceServices.updateCurrentLeaveAbsence(currentLeaveAttendance, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['leaveAbsence', id] });
      },
    });
};

export const useDeleteLeaveAttendance = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => leaveAbsenceServices.deleteLeaveAttendance(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['leaveAbsences'] });
      },
    });
  };

export default leaveAbsenceServices