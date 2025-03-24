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
    }
    
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

export default attendanceServices