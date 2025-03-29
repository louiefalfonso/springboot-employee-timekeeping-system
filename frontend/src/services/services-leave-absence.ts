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

    addNewLeaveAttendance: async (newLeaveAttendance: LeaveAbsence) => {
        const response = await axios.post(API_BASE_URL, newLeaveAttendance);
        return response.data;
    },

    getAllLeaveAttendances : async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getLeaveAttendanceById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentLeaveAttendance: async (currentLeaveAttendance: LeaveAbsence, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentLeaveAttendance);
        return response.data;
    },

    deleteLeaveAttendance: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddLeaveAttendance = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newLeaveAttendance: LeaveAbsence) => leaveAbsenceServices.addNewLeaveAttendance(newLeaveAttendance),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['leaveAbsences'] });
      },
    });
};

export const useGetAllLeaveAttendances = () => {
    return useQuery( 
      { queryKey: ['leaveAbsences'], queryFn: leaveAbsenceServices.getAllLeaveAttendances });
};

export const useGetLeaveAttendanceById = (id: string) => {
    return useQuery(
      { queryKey: ['leaveAbsence', id], queryFn: () => leaveAbsenceServices.getLeaveAttendanceById(id) });
}

export const useUpdateLeaveAttendance = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentLeaveAttendance: LeaveAbsence) => leaveAbsenceServices.updateCurrentLeaveAttendance(currentLeaveAttendance, id),
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