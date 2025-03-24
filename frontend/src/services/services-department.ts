import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Department { 
  id: string; 
  departmentName?: string;
  departmentCode?: string;
  departmentHead?: string;
  departmentAssistant?: string;
  location?:string;
  contactNumber?:string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_DEPARTMENTS;

const departmentServices = {

     addNewDepartment: async (newDepartment: Department) => {
        const response = await axios.post(API_BASE_URL, newDepartment);
        return response.data;
    },

    getAllDepartments: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

      getDepartmentById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentDepartment: async (currentDepartment: Department, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentDepartment);
        return response.data;
    },

    deleteDepartment: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newDepartment: Department) => departmentServices.addNewDepartment(newDepartment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};

export const useGetAllDepartments = () => {
  return useQuery( 
    { queryKey: ['departments'], queryFn: departmentServices.getAllDepartments });
};

export const useGetDepartmentById = (id: string) => {
  return useQuery(
    { queryKey: ['department', id], queryFn: () => departmentServices.getDepartmentById(id) });
}

export const useUpdateDepertment = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (currentDepartment: Department) => departmentServices.updateCurrentDepartment(currentDepartment, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department', id] });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => departmentServices.deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};


export default departmentServices