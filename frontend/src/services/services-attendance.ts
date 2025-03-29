import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Attendance {
  id: string;
  employee?: number;
  date?: Date;
  reasonForAbsence?: string
  status?: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_ATTENDANCES;

const attendanceServices  = {
 
    addNewAttendance: async (newAttendance: Attendance) => {
        const response = await axios.post(API_BASE_URL, newAttendance);
        return response.data;
    },

    getAllAttendances : async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getAttendanceById: async (id: string) => {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    },

    updateCurrentAttendance: async (currentAttendance: Attendance, id: string) => {
      const response = await axios.put(`${API_BASE_URL}/${id}`, currentAttendance);
      return response.data;
    },

    deleteAttendance: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
    
}

// React Query Hooks
export const useAddNewAttendance = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newAttendance: Attendance) => attendanceServices.addNewAttendance(newAttendance),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendances'] });
      },
    });
};

export const useGetAllAttendances = () => {
    return useQuery( 
      { queryKey: ['attendances'], queryFn: attendanceServices.getAllAttendances });
  };

  export const useGetAttendancetById = (id: string) => {
    return useQuery(
      { queryKey: ['attendance', id], queryFn: () => attendanceServices.getAttendanceById(id) });
  }

  export const useUpdateAttendance = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentAttendance: Attendance) => attendanceServices.updateCurrentAttendance(currentAttendance, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance', id] });
      },
    });
  };

  export const useDeleteAttendance = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => attendanceServices.deleteAttendance(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendances'] });
      },
    });
  };

export default attendanceServices