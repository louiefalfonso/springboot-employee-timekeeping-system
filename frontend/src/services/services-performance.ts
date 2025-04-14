import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PerformanceReview {
    id: string;
    employee?: number;
    reviewDate?: Date;
    rating:string;
    comments: string;
    reviewedBy: string;
    reviewStatus: string
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_PERFORMANCE;

const performanceReviewServices = {

    addNewPerformanceReview: async (newPerformanceReview: PerformanceReview) => {
        const response = await axios.post(API_BASE_URL, newPerformanceReview);
        return response.data;
    },

    getAllPerformanceReviews : async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getPerformanceReviewById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentPerformanceReview: async (currentPerformanceReview: PerformanceReview, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentPerformanceReview);
        return response.data;
    },

    deletePerformanceReview: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewPerformanceReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newPerformanceReview: PerformanceReview) => performanceReviewServices.addNewPerformanceReview(newPerformanceReview),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['performanceReview'] });
      },
    });
};

export const useGetAllPerformanceReviews = () => {
    return useQuery( 
      { queryKey: ['performanceReview'], queryFn: performanceReviewServices.getAllPerformanceReviews });
};

export const useGetPerformanceReviewById = (id: string) => {
    return useQuery(
      { queryKey: ['performanceReview', id], queryFn: () => performanceReviewServices.getPerformanceReviewById(id) });
}

export const useUpdatePerformanceReview = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentPerformanceReview: PerformanceReview) => performanceReviewServices.updateCurrentPerformanceReview(currentPerformanceReview, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['performanceReview', id] });
      },
    });
};

export const useDeletePerformanceReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => performanceReviewServices.deletePerformanceReview(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['performanceReviews'] });
      },
    });
}

export default performanceReviewServices