import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Employee {
  id: string;
  firstName?: string;
  lastName?: string;
  employeeNumber?: string;
  emailAddress?: string;
  position?: string;
  phoneNumber?: string;
  department?: number; 
  dateOfBirth?: Date;
  employeeStatus?: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_EMPLOYEES;

const employeeServices = {

    addNewEmployee: async (newEmployee: Employee) => {
        const response = await axios.post(API_BASE_URL, newEmployee);
        return response.data;
    },

    getAllEmployees: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getEmployeeById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentEmployee: async (currentEmployee: Employee, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentEmployee);
        return response.data;
    },

     deleteEmployee: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },

}


// React Query Hooks
export const useAddNewEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEmployee: Employee) => employeeServices.addNewEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useGetAllEmployees = () => {
  return useQuery( 
    { queryKey: ['employees'], queryFn: employeeServices.getAllEmployees });
};

export const useGetEmployeeById = (id: string) => {
  return useQuery(
    { queryKey: ['employee', id], queryFn: () => employeeServices.getEmployeeById(id) });
};

export const useUpdateEmployee = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (currentEmployee: Employee) => employeeServices.updateCurrentEmployee(currentEmployee, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee', id] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employeeServices.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export default employeeServices


