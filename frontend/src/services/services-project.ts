import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Project{
    id: string;
    employee?: number;
    startDate?: Date; 
    dueDate?: Date;
    projectName: string;
    status: string;
    description: string;
    remarks: string;
    projectManager: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_PROJECTS

const projectServices ={

    addNewProject: async (newProject: Project) => {
        const response = await axios.post(API_BASE_URL, newProject);
        return response.data;
    },

    getAllProjects : async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getProjectById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentProject: async (currentProject: Project, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentProject);
        return response.data;
    },

    deleteProject: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newProject: Project) => projectServices.addNewProject(newProject),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['project'] });
      },
    });
};

export const useGetAllProjects = () => {
    return useQuery( 
      { queryKey: ['project'], queryFn: projectServices.getAllProjects });
};

export const useGetProjectById = (id: string) => {
    return useQuery(
      { queryKey: ['project', id], queryFn: () => projectServices.getProjectById(id) });
}

export const useUpdateProject = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentProject: Project) => projectServices.updateCurrentProject(currentProject, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['project', id] });
      },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => projectServices.deleteProject(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
      },
    });
}

export default projectServices