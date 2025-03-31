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

export default performanceReviewServices